/**
 * Advisory scan for Knowledge Base articles. NOT a blocking check: it is not in CI, never fails the build,
 * and always exits 0. It lists lines a reviewer should look at twice. The blocking rules stay in
 * scripts/content-rules.mjs (competitor names, internal figures).
 *
 * Usage:  node scripts/kb-advisory-scan.mjs [file-or-folder ...] [--json]
 * Default: every .md file in content/knowledge-base (README excluded).
 *
 * Approved public facts (APPROVED below) are skipped so they never show up as findings. Add a fact there only
 * once it is approved and already public on the site.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { normalize } from './content-rules.mjs';

/** Public facts already on the live site. A finding is skipped when its match overlaps one of these. */
export const APPROVED = [
  /\b50\+ brands\b/i,
  /\bfounded in 2014\b/i,
  /\bselling on Amazon since 2015\b|\bsince 2015\b/i,
  /\bwholesale trade partner\b/i,
  /\bBuy[- ]Sell[- ]Advertise[- ]Protect\b/i,
  /Where applicable, Epic prices its own offers at or above (?:the brand's|your) MAP/i,
  /\bSutera case study\b/i,
];

/** [id, label, pattern]. Patterns run per line on normalized text. */
export const RULES = [
  ['confidential', 'Possible confidential client or internal-only wording',
    /\b(?:confidential|internal[- ]only|do not share|client list|our clients? (?:include|are))\b/i],
  ['internal-figure', 'Possible internal figure (accounts, SKUs, revenue, wholesale terms, opening order)',
    /\b\d[\d,]*\+?\s*(?:seller accounts|SKUs|storefronts)\b|\b(?:revenue|GMV|run[- ]rate)\b[^.\n]{0,30}\$\s?\d|\b\d{2,3}\s*(?:to|-)\s*\d{2,3}\s+days of (?:stock|inventory)\b|\bopening order\b/i],
  ['unsupported-claim', 'Absolute or superlative claim: needs a source or softer wording',
    /\b(?:guarantee[sd]?|always|never fails|100% (?:safe|compliant|protected)|the best|#1|number one|industry[- ]leading|world[- ]class|leading (?:provider|partner))\b/i],
  ['outdated-metric', 'Dated statistic or benchmark: check it is still current',
    /\b(?:in|as of|since|from)\s+20(?:1\d|2[0-4])\b[^.\n]{0,60}\d|\b20(?:1\d|2[0-4])\s+(?:study|survey|report|data)\b|~\s?\d+(?:\.\d+)?\s?%/i],
  ['unverified-coverage', 'Coverage number (countries, marketplaces, regions, brands): confirm it matches the approved figure',
    /\b\d[\d,]*\+?\s*(?:countries|marketplaces|regions|languages|brands|warehouses|offices)\b/i],
  ['trademark-name', 'Trademarked program name (™/®): only approved names may appear',
    /™|®|\(TM\)/],
  ['specific-workflow', 'Overly specific timing or workflow promise: check it holds for every brand',
    /\bwithin (?:about |roughly )?\d+ (?:hours?|days?|weeks?|months?)\b|\bevery (?:Monday|Tuesday|Wednesday|Thursday|Friday)\b|\bin (?:about )?\d+ weeks of kickoff\b/i],
  ['removal-guarantee', 'Implies sellers or offers will be removed: removal depends on evidence and marketplace rules',
    /\b(?:we|Epic|our team)\b[^.\n]{0,40}\b(?:remove[sd]?|take[sn]? down|get (?:them|sellers?) (?:removed|kicked off)|eliminate[sd]?)\b|\b(?:found and removed|all removed)\b/i],
  ['map-accuracy', 'MAP wording: marketplaces do not enforce MAP and Epic cannot compel other sellers',
    /(?<!\b(?:[Dd]oes|[Dd]o|not|n't)\s)\b(?:Amazon|Walmart|the marketplace)\s+(?:will\s+)?enforces?\s+MAP\b|\b(?:we|Epic)\s+(?:enforce|enforces|force|forces|make|makes)\b[^.\n]{0,30}\bMAP\b|\breport (?:a )?MAP violations? to (?:Amazon|Walmart)\b|\bsell(?:s)? at or above (?:your |the brand's )?MAP\b/i],
  ['policy-accuracy', 'Brand Registry or IP wording: check authorization is stated and resale is not called infringement',
    /\b(?:unauthorized|gray[- ]market)\s+(?:sellers?|resale|reselling)\s+(?:is|are|counts as)\s+(?:an?\s+)?(?:infring|illegal|a violation)|\b(?:we|Epic)\b[^.\n]{0,60}\bthrough (?:your|the brand's) Brand Registry\b(?![^.\n]*authori[sz])/i],
  ['placeholder', 'Placeholder or unfinished text',
    /\b(?:TODO|TBD|TK|lorem ipsum|coming soon|\[CONFIRM[^\]]*\]|XX+)\b|\[\s*(?:insert|add|link)[^\]]*\]/i],
];

function files(args) {
  const targets = args.length ? args : ['content/knowledge-base'];
  const out = [];
  for (const t of targets) {
    if (statSync(t).isDirectory()) {
      for (const f of readdirSync(t)) if (f.endsWith('.md') && f !== 'README.md') out.push(join(t, f));
    } else out.push(t);
  }
  return out.sort();
}

function approvedSpan(line, index, length) {
  return APPROVED.some((re) => {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    for (const m of line.matchAll(g)) if (index < m.index + m[0].length && m.index < index + length) return true;
    return false;
  });
}

export function scan(text) {
  const findings = [];
  const lines = text.split(/\r?\n/);
  let inFront = false;
  lines.forEach((raw, i) => {
    if (i === 0 && raw.trim() === '---') { inFront = true; return; }
    if (inFront) { if (raw.trim() === '---') inFront = false; else if (!/^(title|summary|seoDescription):/.test(raw)) return; }
    const line = normalize(raw);
    for (const [id, label, re] of RULES) {
      const m = line.match(re);
      if (m && !approvedSpan(line, m.index, m[0].length)) findings.push({ line: i + 1, rule: id, label, match: m[0], text: line.trim().slice(0, 220) });
    }
  });
  return findings;
}

const argv = process.argv.slice(2);
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || basename(process.argv[1] || '') === 'kb-advisory-scan.mjs') {
  const json = argv.includes('--json');
  const report = files(argv.filter((a) => a !== '--json')).map((f) => {
    const status = (readFileSync(f, 'utf8').match(/^status:\s*(\S+)/m) || [])[1] || '?';
    return { file: f, status, findings: scan(readFileSync(f, 'utf8')) };
  });
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    let total = 0;
    for (const r of report) {
      if (!r.findings.length) continue;
      console.log(`\n${r.file} (${r.status}) - ${r.findings.length} to look at`);
      for (const f of r.findings) { total++; console.log(`  L${f.line} [${f.rule}] "${f.match}" - ${f.label}`); }
    }
    console.log(`\nAdvisory only: ${total} lines across ${report.filter((r) => r.findings.length).length} of ${report.length} files. Nothing here blocks a build.`);
  }
  process.exitCode = 0;
}

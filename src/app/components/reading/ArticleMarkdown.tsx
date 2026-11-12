/**
 * The one shared template for Knowledge Base article text. Turns an article's Markdown into the same markup (and
 * the same class names) the hand-written articles used, so reading.css themes every article the same way in all
 * six themes. Server-only: runs at build/render time, no JavaScript is sent for it.
 *
 * Markdown plus a few blocks (see content/knowledge-base/README.md):
 *   :::card / :::callout / :::warning   boxed panels        ::::grid      two-column grid of panels
 *   :::checks / :::warnings             lists with icons    :::links      link cards to other pages
 *   :::checks{columns=2}                compact two-column checklist
 *   ::::step{number="01" title="Assess" note="Intake + Baseline (1-2 weeks)"}   numbered phase card
 *   ::term[...]  small heading (glossary term)   ::tagline[...]  accent line
 *   :accent[...] accent-colored bold text        :small[...]     small muted text
 */
import type { ReactNode } from 'react';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { getPublishedArticle } from '@/app/data/knowledgeArticles';

const CLASS = {
  card: 'bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 mb-4 [&>*:last-child]:mb-0',
  callout: 'bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 mb-4 [&>*:last-child]:mb-0',
  warning: 'bg-gradient-to-br from-orange-500/5 to-orange-600/5 backdrop-blur-xl rounded-xl p-6 border border-orange-500/20 mb-4 [&>*:last-child]:mb-0',
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 [&>*]:mb-0',
  links: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  linkCard: 'block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors',
  iconList: 'space-y-3 mb-4',
  iconItem: 'flex items-start gap-3 text-gray-300',
  iconListCompact: 'grid sm:grid-cols-2 gap-3 mb-4',
  iconItemCompact: 'flex items-start gap-2',
  step: 'bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-6 last:mb-0',
  stepNumber: 'text-4xl font-bold text-cyan-500/30',
  stepTitle: 'text-2xl font-semibold mb-1 text-white',
  stepNote: 'text-sm text-cyan-400/70 mb-3',
  stepLabel: 'text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide',
  h2: 'text-3xl font-bold mb-4 text-white',
  term: 'text-xl font-semibold mb-3 text-white',
  h3: 'text-xl font-semibold mb-3 text-white',
  h4: 'text-lg font-semibold mb-2 text-cyan-400',
  p: 'text-gray-300 leading-relaxed mb-4',
  tagline: 'text-cyan-400 font-semibold text-lg mb-4',
  ul: 'list-disc pl-6 space-y-2 text-gray-300 mb-4',
  ol: 'list-decimal pl-6 space-y-2 text-gray-300 mb-4',
  link: 'text-cyan-400 underline underline-offset-2 hover:text-cyan-300',
  table: 'bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4',
};

type MdNode = {
  type: string;
  name?: string;
  url?: string;
  value?: string;
  depth?: number;
  attributes?: Record<string, string | null | undefined>;
  children?: MdNode[];
  data?: Record<string, unknown>;
};

/** Whether a Knowledge Base article is published today (written and its publish date has come). */
const isLive = (slug: string) => Boolean(getPublishedArticle(slug));

const textOf = (node: MdNode): string => node.value ?? (node.children ?? []).map(textOf).join('');

/** Gives each block its element and classes before the Markdown becomes HTML. */
function epicBlocks() {
  return (tree: MdNode) => {
    visit(tree as never, (node: MdNode) => {
      if (node.type === 'containerDirective') {
        const name = node.name ?? '';
        if (name === 'checks' || name === 'warnings') {
          const compact = node.attributes?.columns === '2';
          node.data = { hName: 'div' };
          for (const list of node.children ?? []) {
            if (list.type !== 'list') continue;
            list.data = { hName: 'ul', hProperties: { className: compact ? CLASS.iconListCompact : CLASS.iconList } };
            for (const item of list.children ?? []) {
              item.data = {
                hProperties: {
                  className: compact ? CLASS.iconItemCompact : CLASS.iconItem,
                  dataIcon: name === 'checks' ? 'check' : 'warn',
                  ...(compact ? { dataSize: 'sm' } : {}),
                },
              };
            }
          }
        } else if (name === 'step') {
          // Numbered phase card: big faint number on the left; title, note and the step's own text on the right.
          const { number = '', title = '', note = '' } = node.attributes ?? {};
          for (const child of node.children ?? []) {
            if (child.type === 'heading' && child.depth === 4) child.data = { hProperties: { className: CLASS.stepLabel } };
          }
          const el = (hName: string, className: string, children: MdNode[]): MdNode => ({ type: 'stepPart', data: { hName, hProperties: { className } }, children });
          node.data = { hName: 'div', hProperties: { className: CLASS.step } };
          node.children = [
            el('div', 'flex items-start gap-4 mb-4', [
              el('div', CLASS.stepNumber, [{ type: 'text', value: number ?? '' }]),
              {
                type: 'stepPart',
                data: { hName: 'div' },
                children: [
                  el('h3', CLASS.stepTitle, [{ type: 'text', value: title ?? '' }]),
                  ...(note ? [el('p', CLASS.stepNote, [{ type: 'text', value: note }])] : []),
                  ...(node.children ?? []),
                ],
              },
            ]),
          ];
        } else if (name === 'links') {
          node.data = { hName: 'div' };
          for (const list of node.children ?? []) {
            if (list.type !== 'list') continue;
            // Link cards to articles that aren't published yet are left out until their day.
            list.children = (list.children ?? []).filter((item) => {
              const url = item.children?.[0]?.children?.find((c) => c.type === 'link')?.url ?? '';
              const kb = /^\/knowledge-base\/([a-z0-9-]+)/.exec(url);
              return !kb || isLive(kb[1]);
            });
            list.data = { hName: 'ul', hProperties: { className: CLASS.links } };
            for (const item of list.children ?? []) {
              const para = item.children?.[0];
              const link = para?.children?.find((c) => c.type === 'link');
              const desc = textOf({ type: 'x', children: para?.children?.filter((c) => c !== link) }).replace(/^\s*:\s*/, '').trim();
              item.data = {
                hChildren: [
                  {
                    type: 'element',
                    tagName: 'a',
                    properties: { href: link?.url ?? '#', className: CLASS.linkCard, 'data-card': 'true' },
                    children: [
                      { type: 'element', tagName: 'h3', properties: { className: 'font-semibold text-cyan-400 mb-1' }, children: [{ type: 'text', value: link ? textOf(link) : '' }] },
                      ...(desc ? [{ type: 'element', tagName: 'p', properties: { className: 'text-sm text-gray-400' }, children: [{ type: 'text', value: desc }] }] : []),
                    ],
                  },
                ],
              };
            }
          }
        } else {
          node.data = { hName: 'div', hProperties: { className: CLASS[name as 'card' | 'callout' | 'warning' | 'grid'] ?? '' } };
        }
      } else if (node.type === 'leafDirective') {
        if (node.name === 'term') node.data = { hName: 'h2', hProperties: { className: CLASS.term } };
        else if (node.name === 'tagline') node.data = { hName: 'p', hProperties: { className: CLASS.tagline } };
      } else if (node.type === 'textDirective') {
        if (node.name === 'accent') node.data = { hName: 'strong', hProperties: { className: 'text-cyan-400' } };
        else if (node.name === 'small') node.data = { hName: 'span', hProperties: { className: 'text-sm text-gray-400' } };
      }
    });
  };
}

const withDefault = (className: unknown, fallback: string) => (typeof className === 'string' && className ? className : fallback);

const components: Components = {
  h2: ({ className, children }) => <h2 className={withDefault(className, CLASS.h2)}>{children}</h2>,
  h3: ({ className, children }) => <h3 className={withDefault(className, CLASS.h3)}>{children}</h3>,
  h4: ({ className, children }) => <h4 className={withDefault(className, CLASS.h4)}>{children}</h4>,
  p: ({ className, children }) => <p className={withDefault(className, CLASS.p)}>{children}</p>,
  ul: ({ className, children }) => <ul className={withDefault(className, CLASS.ul)}>{children}</ul>,
  ol: ({ children }) => <ol className={CLASS.ol}>{children}</ol>,
  li: ({ node, className, children }) => {
    const icon = node?.properties?.dataIcon;
    if (icon) {
      const Icon = icon === 'check' ? CheckCircle2 : AlertCircle;
      const small = node?.properties?.dataSize === 'sm';
      return (
        <li className={String(className)}>
          <Icon className={`${small ? 'w-4 h-4' : 'w-5 h-5'} ${icon === 'check' ? 'text-cyan-400' : 'text-orange-400'} mt-0.5 flex-shrink-0`} aria-hidden="true" />
          <span className={small ? 'text-sm text-gray-400' : undefined}>{children}</span>
        </li>
      );
    }
    return <li className={typeof className === 'string' && className ? className : undefined}>{children}</li>;
  },
  strong: ({ className, children }) => <strong className={withDefault(className, 'text-white')}>{children}</strong>,
  a: ({ href = '', className, children }) => {
    // A link to an article that isn't published yet stays plain text until that article's day (no link to a
    // "Coming Soon" page); the pages rebuild hourly, so the link appears on its own.
    const kb = /^\/knowledge-base\/([a-z0-9-]+)/.exec(href);
    if (kb && !isLive(kb[1])) return <>{children}</>;
    const cls = withDefault(className, CLASS.link);
    return href.startsWith('/') ? <Link href={href} className={cls}>{children}</Link> : <a href={href} className={cls}>{children}</a>;
  },
  table: ({ children }) => (
    <div className={CLASS.table}>
      <table className="w-full text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody className="text-gray-300">{children}</tbody>,
  tr: ({ node, children }) => {
    const inHead = node?.children?.some((c) => c.type === 'element' && c.tagName === 'th');
    return <tr className={inHead ? 'border-b border-cyan-500/20' : 'border-b border-white/5'}>{children}</tr>;
  },
  th: ({ children }) => <th className="pb-3 pr-4 text-white font-semibold">{children}</th>,
  td: ({ children }) => <td className="py-3 pr-4 align-top">{children}</td>,
};

/** Each "## Heading" starts a new section, the same structure the hand-written articles had. */
function sections(markdown: string): string[] {
  const out: string[] = [];
  let current: string[] = [];
  let depth = 0; // inside a ::: block, a "## " line doesn't start a new section
  for (const line of markdown.split('\n')) {
    if (/^:{3,}\s*$/.test(line)) depth = Math.max(0, depth - 1);
    else if (/^:{3,}[a-z]/.test(line)) depth += 1;
    if (/^## /.test(line) && current.join('').trim() && depth === 0) {
      out.push(current.join('\n'));
      current = [];
    }
    current.push(line);
  }
  if (current.join('').trim()) out.push(current.join('\n'));
  return out;
}

export function ArticleMarkdown({ markdown }: { markdown: string }): ReactNode {
  return (
    <div className="space-y-8">
      {sections(markdown).map((chunk, i) => (
        <section key={i}>
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkDirective, epicBlocks]} components={components}>
            {chunk}
          </ReactMarkdown>
        </section>
      ))}
    </div>
  );
}

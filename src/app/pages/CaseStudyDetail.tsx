'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { StructuredData, getBreadcrumbSchema, getCaseStudySchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { PopLink } from '@/app/components/story/StoryKit';
import { ACCENT, BODY, CARD_HOVER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, RULE } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { ProofMetrics } from '@/app/components/proof/ProofKit';
import { ChartPanel } from '@/app/components/proof/ChartPanel';
import { CARD, CARD_SOFT, TAG } from '@/app/components/proof/proofTokens';
import { BrandMark } from '@/app/pages/CaseStudies';
import { publishedCaseStudies, type CaseStudy } from '@/app/data/caseStudies';
import { siteConfig } from '@/site/site-config';

/*
 * One case study, one page (/case-studies/<slug>). Same order every time: who and where, the answer in three lines,
 * the numbers, the challenge, what Epic did (with the real charts), results, where the data comes from, the brand's
 * words if approved, related pages, next step. Everything renders in the server HTML; only the charts load after.
 */
export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const url = `${siteConfig.url}/case-studies/${study.slug}`;
  const others = publishedCaseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);

  return (
    <div className={PAGE_BG}>
      <StructuredData data={getCaseStudySchema(study.title, study.seoDescription, study.published, url)} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'Case Studies', url: `${siteConfig.url}/case-studies` },
          { name: study.brand, url },
        ])}
      />

      <article>
        {/* Header: breadcrumb, brand, title, the facts a buyer scans first. */}
        <header className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
          <div className={INNER}>
            <nav aria-label="Breadcrumb" className={`mb-8 text-sm ${MUTED}`}>
              <Link href="/case-studies" className="underline-offset-4 hover:underline">Case studies</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{study.brand}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <BrandMark study={study} size="lg" />
              <span className="flex flex-wrap gap-2">
                {study.pillars.map((p) => (
                  <span key={p} className={TAG}>{p}</span>
                ))}
              </span>
            </div>
            <h1 className={`${H1} max-w-4xl mb-5`}>{study.title}</h1>
            <p className={`${LEAD} max-w-3xl`}>{study.dek}</p>
            <dl className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 text-sm sm:grid-cols-4 ${RULE}`}>
              {([
                ['Brand', study.anonymous ? `${study.brand} (name withheld)` : study.brand],
                ['Industry', study.industry],
                ['Marketplace', study.marketplaces.join(', ')],
                ['Region', study.region],
              ] as const).map(([k, v]) => (
                <div key={k}>
                  <dt className={`text-xs font-semibold uppercase tracking-[0.14em] ${MUTED}`}>{k}</dt>
                  <dd className={`mt-1 font-medium ${HEAD}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className={INNER}>
            {/* At a glance: the whole case in three lines, for skimmers and AI answers. */}
            <dl className={`${CARD} grid gap-5 sm:grid-cols-3 p-6 mb-8`}>
              {([['The problem', study.glance.problem], ['What Epic did', study.glance.did], ['The result', study.glance.result]] as const).map(([k, v]) => (
                <div key={k}>
                  <dt className={`text-xs font-semibold uppercase tracking-[0.14em] mb-2 ${MUTED}`}>{k}</dt>
                  <dd className={`leading-relaxed ${k === 'The result' ? `font-semibold ${HEAD}` : BODY}`}>{v}</dd>
                </div>
              ))}
            </dl>
            <ProofMetrics metrics={study.metrics.map((m) => ({ label: m.label, value: m.value, subtext: m.basis === 'estimate' ? `Estimate. ${m.note}` : m.note }))} />

            <Row title="The challenge">
              <ol className="space-y-5 max-w-3xl">
                {study.challenges.map((c) => (
                  <li key={c.title}>
                    <h3 className={`font-semibold mb-1.5 ${HEAD}`}>{c.title}</h3>
                    <p className={`leading-relaxed ${BODY}`}>{c.text}</p>
                  </li>
                ))}
              </ol>
            </Row>

            <Row title="What Epic did">
              <div className="space-y-12">
                {study.workstreams.map((w) => (
                  <section key={w.title} aria-label={w.title}>
                    <h3 className={`text-lg font-semibold mb-3 ${HEAD}`}>{w.title}</h3>
                    {w.actions.length > 0 && (
                      <ul className="space-y-3 max-w-3xl">
                        {w.actions.map((a) => (
                          <li key={a.label} className={`leading-relaxed ${BODY}`}>
                            <span className={`font-semibold ${HEAD}`}>{a.label}:</span> {a.text}
                          </li>
                        ))}
                      </ul>
                    )}
                    {w.result && (
                      <div className={`${CARD_SOFT} mt-5 p-5 max-w-3xl`}>
                        <p className={`leading-relaxed ${HEAD}`}>{w.result}</p>
                        {w.resultBullets && (
                          <ul className="mt-3 space-y-2 list-disc pl-5">
                            {w.resultBullets.map((b) => (
                              <li key={b} className={`leading-relaxed ${BODY}`}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {w.chart && <ChartPanel chart={w.chart} />}
                    {w.table && (
                      <div className={`${CARD} mt-5 p-5 sm:p-6 overflow-x-auto`}>
                        <table className="w-full min-w-[30rem] text-left text-sm sm:text-base">
                          <caption className="sr-only">{w.table.title}</caption>
                          <thead>
                            <tr className={`border-b-2 ${RULE}`}>
                              {w.table.columns.map((col, i) => (
                                <th key={i} scope="col" className={`py-3 pr-4 font-semibold ${HEAD}`}>{col || <span className="sr-only">Metric</span>}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {w.table.rows.map((row) => (
                              <tr key={row[0]} className={`border-b last:border-b-0 ${RULE}`}>
                                <th scope="row" className={`py-3 pr-4 font-medium ${HEAD}`}>{row[0]}</th>
                                <td className={`py-3 pr-4 ${BODY}`}>{row[1]}</td>
                                <td className={`py-3 font-semibold ${HEAD}`}>{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </Row>

            <Row title="Results">
              <ul className={`${CARD} p-6 space-y-3 max-w-3xl`}>
                {study.results.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <ArrowUp aria-hidden="true" className={`w-5 h-5 flex-shrink-0 mt-0.5 ${HEAD}`} />
                    <span className={`font-medium leading-relaxed ${HEAD}`}>{r}</span>
                  </li>
                ))}
              </ul>
            </Row>

            {study.testimonial && (
              <Row title="In their words">
                <figure className="max-w-3xl">
                  <blockquote className={`text-2xl leading-snug font-medium ${HEAD}`}>&ldquo;{study.testimonial.quote}&rdquo;</blockquote>
                  <figcaption className={`mt-4 ${MUTED}`}>
                    {study.testimonial.name}, {study.testimonial.title}, {study.testimonial.company}
                  </figcaption>
                </figure>
              </Row>
            )}

            <Row title="About the data">
              <div className={`max-w-3xl space-y-2 text-sm leading-relaxed ${BODY}`}>
                <p><span className={`font-semibold ${HEAD}`}>Source:</span> {study.evidence.source}</p>
                {study.evidence.period && <p><span className={`font-semibold ${HEAD}`}>Period:</span> {study.evidence.period}</p>}
                {study.evidence.notes?.map((n) => <p key={n}>{n}</p>)}
                <p>Results depend on the brand, product and market; they are not a promise of the same result.</p>
              </div>
            </Row>

            <Row title="Learn more">
              <ul className="space-y-3">
                {study.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className={`inline-flex items-center gap-2 font-semibold ${ACCENT} underline-offset-4 hover:underline`}>
                      {r.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              {others.length > 0 && (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/case-studies/${o.slug}`} className={`${CARD} ${CARD_HOVER} group block h-full p-5`}>
                        <span className={`block text-xs font-semibold uppercase tracking-[0.14em] ${MUTED}`}>Another case study</span>
                        <span className={`mt-2 block font-semibold leading-snug ${HEAD}`}>{o.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Row>
          </div>
        </div>
      </article>

      <section id="next-step" className="pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>See what Epic could do for your brand</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                Tell us about your brand and marketplaces. We&apos;ll show you how buying your inventory and running your Amazon would work.
              </p>
            </div>
            {siteConfig.bookACallEnabled ? (
              <CtaButton variant="primary" size="lg" location={`Case Study ${study.brand} - Final CTA`} className="shrink-0 self-start sm:self-auto" />
            ) : (
              <PopLink href={siteConfig.primaryCtaHref} className="shrink-0 self-start sm:self-auto">
                Request an Assessment
              </PopLink>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/** One labeled row: the H2 sits in a left column on wide screens, the content on the right. */
function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`grid gap-4 py-10 border-t ${RULE} lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10`} aria-label={title}>
      <h2 className={`${H3} lg:pt-0.5`}>{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

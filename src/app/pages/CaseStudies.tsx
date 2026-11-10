'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StructuredData, getWebPageSchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { ChapterMarker, PopLink } from '@/app/components/story/StoryKit';
import { ACCENT, BODY, CARD_HOVER, CHAPTER, H1, H2, HEAD, INNER, LEAD, MUTED, PAGE_BG, RULE } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { CARD, TAG } from '@/app/components/proof/proofTokens';
import { legacyAnchors, publishedCaseStudies, type CaseStudy } from '@/app/data/caseStudies';
import { siteConfig } from '@/site/site-config';

/*
 * Case Studies gallery: a short answer, one featured study, then a card per study, then the next step.
 * Every study comes from src/app/data/caseStudies.ts and has its own page (/case-studies/<slug>).
 * Testimonials show only when a study has an approved quote. No filters until there are enough studies to need them.
 */

const anchorFor = (slug: string) => Object.keys(legacyAnchors).find((key) => legacyAnchors[key] === slug);
const href = (study: CaseStudy) => `/case-studies/${study.slug}`;

/** The brand's logo on a white chip (logos are made for light backgrounds), or its name when there's no approved logo. */
export function BrandMark({ study, size = 'md' }: { study: CaseStudy; size?: 'md' | 'lg' }) {
  if (study.logo?.approved) {
    return (
      <span className={`inline-flex items-center rounded-lg bg-white px-4 ${size === 'lg' ? 'py-3' : 'py-2'}`}>
        <Image src={study.logo.src} alt={`${study.brand} logo`} className={size === 'lg' ? 'h-8 w-auto' : 'h-5 w-auto'} />
      </span>
    );
  }
  return <span className={`text-sm font-semibold uppercase tracking-[0.14em] ${MUTED}`}>{study.brand}</span>;
}

function Meta({ study }: { study: CaseStudy }) {
  return (
    <p className={`text-sm ${MUTED}`}>
      {study.industry} · {study.marketplaces.join(', ')} · {study.region}
    </p>
  );
}

export function CaseStudies() {
  const [featured, ...rest] = publishedCaseStudies;
  const quotes = publishedCaseStudies.filter((study) => study.testimonial);

  return (
    <div className={PAGE_BG}>
      <StructuredData
        data={getWebPageSchema({
          '@type': 'CollectionPage',
          name: 'Case Studies',
          url: `${siteConfig.url}/case-studies`,
          description: 'Results from brands Epic Global Inc. buys from and sells for on Amazon and other marketplaces.',
        })}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: publishedCaseStudies.map((study, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: study.title,
            url: `${siteConfig.url}${href(study)}`,
          })),
        }}
      />

      {/* 01 Answer first: what's here, in one paragraph. */}
      <section id="overview" className="scroll-mt-20 pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          <ChapterMarker n={1} label="Real results" />
          <h1 className={`${H1} mb-6`}>Case studies: real brands, real results</h1>
          <p className={`${LEAD} max-w-3xl`}>
            What happened when Epic took over a brand&apos;s marketplace selling: the starting problem, what we changed and the numbers
            from the brand&apos;s own account data. Epic buys the inventory at wholesale, sells it on Amazon and other marketplaces, and pays
            the advertising, fees and fulfillment.
          </p>
        </div>
      </section>

      {/* 02 Featured study: the one strong, approved story, told in three lines and three numbers. */}
      {featured && (
        <section id={anchorFor(featured.slug)} data-chapter className={CHAPTER}>
          <div className={INNER}>
            <ChapterMarker n={2} label="Featured" />
            <Link href={href(featured)} className={`${CARD} ${CARD_HOVER} group block p-6 sm:p-10`}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <BrandMark study={featured} size="lg" />
                <span className="flex flex-wrap gap-2">
                  {featured.pillars.map((p) => (
                    <span key={p} className={TAG}>{p}</span>
                  ))}
                </span>
              </div>
              <h2 className={`${H2} max-w-3xl mb-3`}>{featured.title}</h2>
              <Meta study={featured} />
              <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                {featured.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className={`flex flex-col border-t pt-4 ${RULE}`}>
                    <dt className={`order-2 mt-1 text-sm font-medium ${HEAD}`}>{m.label}</dt>
                    <dd className={`order-1 text-4xl font-bold tracking-tight tabular-nums ${ACCENT}`}>{m.value}</dd>
                  </div>
                ))}
              </dl>
              {/* Answer first: the result, then how it happened. */}
              <p className={`mt-8 max-w-3xl text-lg font-semibold leading-relaxed ${HEAD}`}>{featured.glance.result}</p>
              <p className={`mt-3 max-w-3xl leading-relaxed ${BODY}`}>
                <span className={`font-semibold ${HEAD}`}>The problem:</span> {featured.glance.problem}{' '}
                <span className={`font-semibold ${HEAD}`}>What Epic did:</span> {featured.glance.did}
              </p>
              <span className={`mt-8 inline-flex items-center gap-2 font-semibold ${ACCENT}`}>
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* 03 Every other study as a card of the same shape. */}
      {rest.length > 0 && (
        <section id="all" data-chapter className={CHAPTER}>
          <div className={INNER}>
            <ChapterMarker n={3} label="More case studies" />
            <ul className="grid gap-6 md:grid-cols-2">
              {rest.map((study) => {
                const lead = study.metrics[0];
                return (
                  <li key={study.slug} id={anchorFor(study.slug)} className="scroll-mt-24">
                    <Link href={href(study)} className={`${CARD} ${CARD_HOVER} group flex h-full flex-col p-6`}>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <BrandMark study={study} />
                        <span className="flex flex-wrap justify-end gap-1.5">
                          {study.pillars.map((p) => (
                            <span key={p} className={TAG}>{p}</span>
                          ))}
                        </span>
                      </div>
                      <p className={`text-4xl font-bold tracking-tight tabular-nums ${ACCENT}`}>{lead.value}</p>
                      <p className={`text-sm mb-5 ${MUTED}`}>{lead.label.toLowerCase()} · {lead.note}</p>
                      <h3 className={`text-lg font-semibold leading-snug mb-2 ${HEAD}`}>{study.title}</h3>
                      <Meta study={study} />
                      <p className={`mt-4 leading-relaxed ${BODY}`}>{study.glance.result}</p>
                      <span className={`mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold ${ACCENT}`}>
                        Read the case study
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className={`mt-8 max-w-3xl text-sm leading-relaxed ${MUTED}`}>
              Numbers come from each brand&apos;s marketplace account data. Results depend on the brand, product and market; they are not a
              promise of the same result.
            </p>
          </div>
        </section>
      )}

      {/* 04 In their words: only approved quotes, exactly as given. Hidden until there is at least one. */}
      {quotes.length > 0 && (
        <section id="in-their-words" data-chapter className={CHAPTER}>
          <div className={INNER}>
            <ChapterMarker n={4} label="In their words" />
            <ul className="grid gap-6 md:grid-cols-2">
              {quotes.map((study) => (
                <li key={study.slug}>
                  <figure className={`${CARD} h-full p-6`}>
                    <blockquote className={`text-lg leading-relaxed ${HEAD}`}>&ldquo;{study.testimonial!.quote}&rdquo;</blockquote>
                    <figcaption className={`mt-4 text-sm ${MUTED}`}>
                      {study.testimonial!.name}, {study.testimonial!.title}, {study.testimonial!.company}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Next step. */}
      <section id="next-step" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>See what Epic could do for your brand</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                Tell us about your brand and marketplaces. We&apos;ll show you how buying your inventory and running your Amazon would work.
              </p>
            </div>
            {siteConfig.bookACallEnabled ? (
              <CtaButton variant="primary" size="lg" location="Case Studies Page - Final CTA" className="shrink-0 self-start sm:self-auto" />
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

'use client';

import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, Download } from 'lucide-react';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';
import { GatedDownloadButton } from '@/app/components/GatedDownloadButton';
import dynamic from 'next/dynamic';
import { ChapterMarker, PopLink } from '@/app/components/story/StoryKit';
import { BODY, CARD_HOVER, CHAPTER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { ProofMetrics } from '@/app/components/proof/ProofKit';
import { CARD, CARD_SOFT, TAG } from '@/app/components/proof/proofTokens';

// Charts load after the page so recharts stays out of the first load (recharts never rendered them server-side).
const CaseStudyChart = dynamic(() => import('@/app/components/proof/CaseStudyChart'), { ssr: false });
const CHART_HEIGHT: Record<string, number> = {
  'Fulfillment Optimization': 300,
  'A/B Testing & Image Optimization': 300,
  '3P Model Implementation': 400,
};
import { siteConfig } from '@/site/site-config';

/*
 * Case Studies (Tier 2 proof page): numbered chapters in the story-kit layout. 01 is the answer and an index,
 * then one chapter per study (headline numbers count up, charts and tables rise into place), then the next step.
 * No pins and no chapter rail; all motion is native CSS (story.css) plus CountUp, so GSAP never loads here.
 */
export function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      anchor: 'sutera',
      pillar: ['Sell', 'Advertise', 'Protect'],
      title: 'Amazon Success Case Study',
      industry: 'Home & Bath',
      client: 'Sutera',
      region: 'United States',
      goals: 'Increase profitability, optimize listings, and improve brand visibility and defense on Amazon',
      challengeDetails: [
        {
          title: 'High FBA Fees Are Eliminating Potential Profitability',
          description: 'Sutera was facing high FBA fees due to inefficient packaging, storage, and fulfillment strategies, which were significantly eroding potential profits'
        },
        {
          title: 'Listings Weren\'t A/B Tested, Lacked Video Assets, Secondary Images, and Were Not Optimized for SEO',
          description: 'The product listings lacked important visual content like videos and secondary images, which are essential for boosting conversion rates and improving organic rankings'
        },
        {
          title: 'Competitor Brands Like Purple and Casper Are Capturing Sutera\'s Branded Search Demand',
          description: 'Major competitors were ranking high on branded search terms, leading to lost sales opportunities and preventing the brand from attracting potential customers'
        }
      ],
      strategyDetails: [
        {
          title: 'Fulfillment Optimization',
          items: [
            { label: 'Packaging Efficiency', text: 'Reduced product dimensions and optimized packaging materials to lower FBA fees. This helped decrease storage and shipping costs while maintaining product integrity.' },
            { label: 'Inventory Management', text: 'Streamlined inventory management processes to prevent overstocking and reduce long-term storage fees.' }
          ],
          results: 'The below chart shows the per-unit change in FBA fulfillment & shipping fees by product upon inheriting Sutera\'s account compared to implementing the above efficiencies to the account. Across the 21 products in the brand\'s catalog on Amazon, the average product fulfillment fee realized a 2.9% decrease, with 18/21 products (86%) seeing lower fulfillment fees.',
          chartData: [
            { product: 'Product 1', before: 5.50, after: 5.20 },
            { product: 'Product 2', before: 4.80, after: 4.60 },
            { product: 'Product 3', before: 6.20, after: 6.00 },
            { product: 'Product 4', before: 5.90, after: 5.70 },
            { product: 'Product 5', before: 7.10, after: 6.85 },
            { product: 'Product 6', before: 5.30, after: 5.15 },
            { product: 'Product 7', before: 6.50, after: 6.30 },
            { product: 'Product 8', before: 4.90, after: 4.75 }
          ]
        },
        {
          title: 'Listing Optimization',
          items: [
            { label: 'SEO Research & Keyword Strategy', text: 'Conducted extensive keyword research to optimize listings and improve search visibility. Focused on high-converting keywords while adjusting titles, bullet points, and descriptions to target relevant search queries.' },
            { label: 'Video Assets Added', text: 'Created product demonstration videos to provide customers with a more engaging and informative experience that better aligns with the demographics of the brand. Sutera\'s customers are male-heavy, highly skewed towards millennials and Gen Z, high-income, and high-education. Assets were created to reflect these demographics rather than the traditional bed and bath marketing typically targeted toward women.' }
          ]
        },
        {
          title: 'A/B Testing & Image Optimization',
          items: [
            { label: 'Implemented A/B testing on images and copy', text: 'Enhanced listings with secondary images to showcase product features and improve engagement.' }
          ],
          results: 'The below chart shows results of A/B testing across the top 10 products by sales.',
          resultBullets: [
            '6/10 products saw successful A/B tests, with successful tests seeing an average increase in their conversion rate of 21% (i.e., the equivalent of increasing to 12.1% from 10.0%)',
            'This is the equivalent of adding +11 weeks of demand over the course of a year',
            'A/B testing is critical to lifting sales and will be an ongoing initiative as we test different optimization strategies through different images, video, A+ content, titles, etc.'
          ],
          chartData: [
            { product: 'Product 1', control: 10.0, variant: 12.5, success: true },
            { product: 'Product 2', control: 8.5, variant: 10.2, success: true },
            { product: 'Product 3', control: 9.2, variant: 8.8, success: false },
            { product: 'Product 4', control: 11.5, variant: 14.0, success: true },
            { product: 'Product 5', control: 7.8, variant: 9.1, success: true },
            { product: 'Product 6', control: 10.5, variant: 10.3, success: false },
            { product: 'Product 7', control: 9.8, variant: 11.9, success: true },
            { product: 'Product 8', control: 8.9, variant: 8.5, success: false },
            { product: 'Product 9', control: 10.2, variant: 12.8, success: true },
            { product: 'Product 10', control: 9.5, variant: 8.9, success: false }
          ]
        },
        {
          title: 'Brand Defense & Competitor Strategy',
          items: [
            { label: 'Defended Sutera\'s Brand Against Competitors', text: 'Employed targeted advertising campaigns to capture branded search traffic that was being dominated by competitors like Purple and Casper. Ensured Sutera\'s brand was visible for key search terms. Upon searching for Sutera on Amazon, the customer now only sees a Sutera sponsored brand ad as well as 6/6 Sutera products on the main search results rather than being riddled with competitor products.' },
            { label: 'Marketing Investment', text: 'Typically, we invest ~10% of total monthly sales into marketing through advertising, promotions, subscribe-and-save discounts, coupons, and deals on Amazon.' }
          ]
        }
      ],
      results: [
        'FBA fees dropped by an average of 2.9% across 21 products (18/21 products saw lower fulfillment fees)',
        'Conversion rates increased by an average of 21% across successful A/B tests',
        'Successful A/B tests equivalent to adding +11 weeks of demand over the course of a year',
        'Branded search traffic recaptured - customers now see only Sutera ads and 6/6 Sutera products in search results',
        'Cost savings reinvested into advertising, increasing sales and profitability'
      ],
      keyMetrics: [
        { label: 'FBA Fee Reduction', value: '-2.9%', subtext: '18/21 products' },
        { label: 'Conversion Rate Lift', value: '+21%', subtext: 'Successful A/B tests' },
        { label: 'Demand Increase', value: '+11 weeks', subtext: 'Annual equivalent' },
        { label: 'Brand Defense', value: '6/6', subtext: 'Sutera products shown' }
      ],
      googleDriveUrl: 'https://drive.google.com/file/d/1D6sgqtF5MAU_n3xIwQ9qCTtLlNe3I7SU/view?usp=sharing'
    },
    {
      id: 2,
      anchor: 'auto-parts-1p-vs-3p',
      pillar: ['Buy', 'Sell'],
      title: '1P vs 3P Financial Breakdown: Auto Parts Brand Case Study',
      industry: 'Automotive Parts',
      client: 'Auto Parts Brand',
      region: 'United States',
      goals: 'Maximize brand profitability and eliminate Amazon fee burden through strategic model transition',
      challengeDetails: [
        {
          title: 'Low Net Profit Margin Under 1P Structure',
          description: 'Under Amazon\'s 1P model, the brand was absorbing nearly all Amazon-imposed fees, resulting in net profit margins ranging from only 15-30% of retail price, significantly eroding profitability.'
        },
        {
          title: 'Unpredictable Fee Structure',
          description: 'Amazon\'s comprehensive fee structure including chargebacks, co-op fees, and other costs created unpredictability in financial planning and made it difficult to forecast true profitability.'
        },
        {
          title: 'High Cost of Goods vs Low Net Revenue',
          description: 'The combination of high manufacturing costs and low net revenue after Amazon fees meant that depending on COGS, the 15-30% margin was quickly eroded, leaving minimal profit for the brand.'
        }
      ],
      strategyDetails: [
        {
          title: 'Model Transition Analysis',
          items: [
            { label: 'Financial Comparison Framework', text: 'Conducted comprehensive analysis comparing 1P vs 3P structures. Under 1P, Amazon purchases inventory and the brand absorbs nearly all fees. Under Epic\'s 3P model, Epic Global purchases inventory at ~40% of MSRP and assumes all Amazon costs.' },
            { label: 'Net PPM Evaluation', text: 'Determined that the brand\'s Net PPM (Net Pure Product Margin) in 1P arrangement ranged from 15-30% of retail, which could be directly compared to Epic\'s 40% purchase price offer under 3P.' }
          ],
          results: 'The fundamental difference lies in fee responsibility. Under 1P, the brand absorbs nearly all Amazon-imposed fees. Under Epic\'s 3P model, Epic Global assumes those costs. Our model typically offers ~40% of MSRP - effectively the same outcome as a 40% Net PPM from Amazon, but with operational simplicity and predictability.',
        },
        {
          title: '3P Model Implementation',
          items: [
            { label: 'Product 1: Brake Kit (Escalade, Silverado, Suburban, Sierra, Yukon 2015-2020)', text: 'MSRP $877.88. Under 1P: Amazon paid $489.85 (56% of MSRP), brand paid $354.13 in fees, netting only $135.72 (15.46% Net PPM). Under Epic 3P: Epic purchases at $351.15 (40% of MSRP), brand pays $0 in fees, netting full $351.15.' },
            { label: 'Product 2: Front and Rear Brake Kit (Honda Civic 2016-2021)', text: 'MSRP $425.10. Under 1P: Amazon paid $230.23 (54% of MSRP), brand paid $118.77 in fees, netting only $111.46 (26.22% Net PPM). Under Epic 3P: Epic purchases at $170.04 (40% of MSRP), brand pays $0 in fees, netting full $170.04.' }
          ],
          chartData: [
            { 
              product: 'Escalade Brake Kit',
              msrp: 877.88,
              model1P_purchase: 489.85,
              model1P_fees: 354.13,
              model1P_net: 135.72,
              model3P_purchase: 351.15,
              model3P_fees: 0,
              model3P_net: 351.15,
              gain_percent: 156,
              gain_dollars: 215.43
            },
            {
              product: 'Civic Brake Kit',
              msrp: 425.10,
              model1P_purchase: 230.23,
              model1P_fees: 118.77,
              model1P_net: 111.46,
              model3P_purchase: 170.04,
              model3P_fees: 0,
              model3P_net: 170.04,
              gain_percent: 53,
              gain_dollars: 58.58
            }
          ]
        }
      ],
      results: [
        'Product 1 (Escalade Brake Kit): Brand net revenue increased 159% from $135.72 to $351.15 per unit (+$215.43)',
        'Product 2 (Civic Brake Kit): Brand net revenue increased 53% from $111.46 to $170.04 per unit (+$58.58)',
        'Brand eliminates 100% of Amazon fees, chargebacks, and co-op costs',
        '40% of MSRP purchase price provides meaningful profitability vs 15-30% net under 1P',
        'Operational simplicity and financial predictability with zero fee burden'
      ],
      keyMetrics: [
        { label: 'Escalade Kit Gain', value: '+159%', subtext: '+$215.43/unit' },
        { label: 'Civic Kit Gain', value: '+53%', subtext: '+$58.58/unit' },
        { label: 'Fee Elimination', value: '100%', subtext: 'Zero brand fees' },
        { label: 'Purchase Price', value: '40%', subtext: 'of MSRP' }
      ],
      comparisonTables: [
        {
          title: 'Brake Kit (2015-2020 Escalade, Silverado, Suburban, Sierra, Yukon)',
          data: [
            { metric: 'MSRP', model1P: '$877.88', model3P: '$877.88' },
            { metric: 'Purchase Price Paid to Brand', model1P: '$489.85 (56% of MSRP)', model3P: '$351.15 (40% of MSRP)' },
            { metric: 'Fees Paid by Brand', model1P: '$354.13 (Amazon fees, chargebacks, etc.)', model3P: '$0 (Epic Global covers all fees)' },
            { metric: 'Brand Net Revenue (Actual)', model1P: '$135.72 (15.46% Net PPM)', model3P: '$351.15' },
            { metric: 'Brand Net Gain in 3P', model1P: 'N/A', model3P: '+159% (+$215.43 per unit)' }
          ]
        },
        {
          title: 'Front and Rear Brake Kit For 2016-2021 Honda Civic',
          data: [
            { metric: 'MSRP', model1P: '$425.10', model3P: '$425.10' },
            { metric: 'Purchase Price Paid to Brand', model1P: '$230.23 (54% of MSRP)', model3P: '$170.04 (40% of MSRP)' },
            { metric: 'Fees Paid by Brand', model1P: '$118.77 (Amazon fees, chargebacks, etc.)', model3P: '$0 (Epic Global covers all fees)' },
            { metric: 'Brand Net Revenue (Actual)', model1P: '$111.46 (26.22% Net PPM)', model3P: '$170.04' },
            { metric: 'Brand Net Gain in 3P', model1P: 'N/A', model3P: '+53% (+$58.58/unit)' }
          ]
        }
      ],
      googleDriveUrl: 'https://drive.google.com/file/d/1-XB77sxeO_5BYNGKf9CwjxXhhYPWjRzH/view?usp=sharing'
    }
  ];

  const chapterLabel = (n: number, label: string) => <ChapterMarker n={n} label={label} />;

  return (
    <div className={PAGE_BG}>
      <SEO
        title="Case Studies - Proven Results from Epic Global Inc."
        description="Real marketplace expansion results: Amazon profitability improvements, multi-marketplace launches, global expansion case studies, and brand protection success stories from Epic Global Inc."
        canonicalUrl={`${siteConfig.url}/case-studies`}
        keywords="marketplace case studies, amazon success stories, ecommerce case studies, marketplace expansion results, brand protection case studies"
      />
      <StructuredData
        data={getWebPageSchema({
          '@type': 'CollectionPage',
          name: 'Case Studies',
          url: `${siteConfig.url}/case-studies`,
          description: 'Real results from Epic Global Inc. client partnerships across marketplace execution, profitability, and operating improvement.',
        })}
      />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'Case Studies', url: `${siteConfig.url}/case-studies` },
        ])}
      />

      {/* 01 Real results: answer first, then an index of the studies on this page. */}
      <section id="overview" className="scroll-mt-20 pt-28 pb-0 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          {chapterLabel(1, 'Real results')}
          <h1 className={`${H1} mb-6`}>Case Studies</h1>
          <p className={`${LEAD} max-w-3xl mb-4`}>
            Two results: Sutera cut FBA fees on 18 of 21 products and lifted conversion 21% on successful A/B tests.
            An auto parts brand moving from Amazon 1P to Epic&apos;s 3P model raised its net revenue per unit 159% on one brake kit and 53% on another.
          </p>
          <p className={`text-xl leading-relaxed ${BODY} max-w-3xl mb-10`}>
            See how Epic Global transforms eCommerce performance through our Buy-Sell-Advertise-Protect model
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <li key={study.id}>
                <a href={`#${study.anchor}`} className={`${CARD} ${CARD_HOVER} group flex h-full items-start justify-between gap-4 p-6`}>
                  <span>
                    <span className={`block text-sm font-semibold ${MUTED}`}>{study.client}</span>
                    <span className={`mt-1 block text-lg font-semibold leading-snug ${HEAD}`}>{study.title}</span>
                    <span className={`mt-2 block text-sm ${MUTED}`}>{study.industry} | {study.region}</span>
                  </span>
                  <ArrowDown aria-hidden="true" className={`mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-y-0.5 ${HEAD}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02-03 One chapter per study: headline numbers count up, then goals, challenges, execution and results. */}
      {caseStudies.map((study, studyIdx) => (
        <section key={study.id} id={study.anchor} data-chapter className={CHAPTER}>
          <div className={INNER}>
            {chapterLabel(studyIdx + 2, study.client)}

            <div className="flex flex-wrap gap-2 mb-5">
              {study.pillar.map((p) => (
                <span key={p} className={TAG}>{p}</span>
              ))}
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-4">
              <h2 className={`${H2} max-w-3xl`}>{study.title}</h2>
              {siteConfig.downloadsEnabled && study.googleDriveUrl && (
                <GatedDownloadButton
                  href={study.googleDriveUrl}
                  fileName={study.title}
                  fileType="case-study"
                  className={`${QUIET_BUTTON} shrink-0 self-start !px-4 !py-2 text-sm`}
                  title="Download Case Study"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Case Study
                </GatedDownloadButton>
              )}
            </div>

            <p className={`flex flex-wrap gap-2 text-sm mb-10 ${MUTED}`}>
              <span>{study.client}</span>
              <span aria-hidden="true">|</span>
              <span>{study.industry}</span>
              <span aria-hidden="true">|</span>
              <span>{study.region}</span>
            </p>

            {study.keyMetrics && (
              <div className="mb-10">
                <ProofMetrics metrics={study.keyMetrics} />
              </div>
            )}

            <div>
              <Row title="Goals">
                <p className={`text-lg leading-relaxed max-w-3xl ${BODY}`}>{study.goals}</p>
              </Row>

              <Row title="Initial Challenges / Pain Points">
                <ol className="space-y-5 max-w-3xl">
                  {study.challengeDetails.map((challenge, idx) => (
                    <li key={idx}>
                      <h4 className={`font-semibold mb-1.5 ${HEAD}`}>
                        Challenge {idx + 1}: {challenge.title}
                      </h4>
                      <p className={`leading-relaxed ${BODY}`}>{challenge.description}</p>
                    </li>
                  ))}
                </ol>
              </Row>

              <Row title="Epic Global's Strategy & Execution">
                <div className="space-y-8">
                  {study.strategyDetails.map((section, idx) => (
                    <div key={idx}>
                      <h4 className={`text-lg font-semibold mb-3 ${HEAD}`}>{section.title}</h4>
                      <ul className="space-y-3 max-w-3xl">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className={`leading-relaxed ${BODY}`}>
                            <span className={`font-semibold ${HEAD}`}>{item.label}:</span> {item.text}
                          </li>
                        ))}
                      </ul>
                      {section.results && (
                        <div className={`${CARD_SOFT} mt-5 p-5 max-w-3xl`}>
                          <p className={`font-semibold mb-2 ${HEAD}`}>Results:</p>
                          <p className={`leading-relaxed ${BODY}`}>{section.results}</p>
                          {'resultBullets' in section && section.resultBullets && (
                            <ul className="mt-3 space-y-2 list-disc pl-5">
                              {section.resultBullets.map((bullet, bulletIdx) => (
                                <li key={bulletIdx} className={`leading-relaxed ${BODY}`}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      {'chartData' in section && section.chartData && (
                        <div data-story="rise" className={`mt-6 rounded-xl border ${RULE} bg-white p-4 sm:p-5`}>
                          <div style={{ minHeight: CHART_HEIGHT[section.title] ?? 300 }}>
                            <CaseStudyChart title={section.title} data={section.chartData} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Row>

              {study.comparisonTables && study.comparisonTables.length > 0 && (
                <Row title="Detailed Financial Comparison">
                  <div className="space-y-6">
                    {study.comparisonTables.map((table, tableIdx) => (
                      <div key={tableIdx} data-story="rise" className={`${CARD} p-5 sm:p-6 overflow-x-auto`}>
                        <h4 className={`font-semibold mb-4 ${HEAD}`}>{table.title}</h4>
                        <table className="w-full min-w-[34rem] text-left text-sm sm:text-base">
                          <thead>
                            <tr className={`border-b-2 ${RULE}`}>
                              <th scope="col" className={`py-3 pr-4 font-semibold ${HEAD}`}>Metric</th>
                              <th scope="col" className={`py-3 px-4 font-semibold ${HEAD}`}>1P Model (Amazon Retailer)</th>
                              <th scope="col" className={`py-3 pl-4 font-semibold ${HEAD}`}>3P Model (Epic Global Seller)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.data.map((row, rowIdx) => (
                              <tr key={rowIdx} className={`border-b last:border-b-0 ${RULE}`}>
                                <th scope="row" className={`py-3 pr-4 font-medium ${HEAD}`}>{row.metric}</th>
                                <td className={`py-3 px-4 ${BODY}`}>{row.model1P}</td>
                                <td className={`py-3 pl-4 font-semibold ${HEAD}`}>{row.model3P}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </Row>
              )}

              <Row title="Results">
                <ul data-story="fade-up" className={`${CARD} p-6 space-y-3 max-w-3xl`}>
                  {study.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowUp aria-hidden="true" className={`w-5 h-5 flex-shrink-0 mt-0.5 ${HEAD}`} />
                      <span className={`font-medium leading-relaxed ${HEAD}`}>{result}</span>
                    </li>
                  ))}
                </ul>
              </Row>
            </div>
          </div>
        </section>
      ))}

      {/* 04 Next step: the closing call to action settles in. */}
      <section id="next-step" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          {chapterLabel(caseStudies.length + 2, 'Next step')}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>Ready to Get Similar Results?</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                Let&apos;s discuss how Epic Global can transform your eCommerce performance
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

/** One labeled row of a case study: the H3 sits in a left column on wide screens, the content on the right. */
function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`grid gap-4 py-8 border-t ${RULE} lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10`}>
      <h3 className={`${H3} lg:pt-0.5`}>{title}</h3>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

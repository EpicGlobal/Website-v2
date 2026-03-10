'use client';

import { ShoppingCart, Globe2, Shield, TrendingUp, ArrowUp, Download } from 'lucide-react';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

export function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
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
            { label: 'Net PPM Evaluation', text: 'Determined that the brand\'s Net PPM (Profit Per Margin) in 1P arrangement ranged from 15-30% of retail, which could be directly compared to Epic\'s 40% purchase price offer under 3P.' }
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
        'Product 1 (Escalade Brake Kit): Brand net revenue increased 156% from $135.72 to $351.15 per unit (+$215.43)',
        'Product 2 (Civic Brake Kit): Brand net revenue increased 53% from $111.46 to $170.04 per unit (+$58.58)',
        'Brand eliminates 100% of Amazon fees, chargebacks, and co-op costs',
        '40% of MSRP purchase price provides meaningful profitability vs 15-30% net under 1P',
        'Operational simplicity and financial predictability with zero fee burden'
      ],
      keyMetrics: [
        { label: 'Escalade Kit Gain', value: '+156%', subtext: '+$215.43/unit' },
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
            { metric: 'Brand Net Gain in 3P', model1P: 'N/A', model3P: '+156% (+$215.43 per unit)' }
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

  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="Case Studies - Proven Results from Epic Global Inc."
        description="Real marketplace expansion results: Amazon profitability improvements, multi-marketplace launches, global expansion case studies, and brand protection success stories from Epic Global Inc."
        canonicalUrl="https://epicglobalinc.com/case-studies"
        keywords="marketplace case studies, amazon success stories, ecommerce case studies, marketplace expansion results, brand protection case studies"
      />
      <StructuredData
        data={getWebPageSchema({
          '@type': 'CollectionPage',
          name: 'Case Studies',
          url: 'https://epicglobalinc.com/case-studies',
          description: 'Real results from Epic Global Inc. client partnerships across marketplace execution, profitability, and operating improvement.',
        })}
      />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: 'https://epicglobalinc.com/' },
          { name: 'Case Studies', url: 'https://epicglobalinc.com/case-studies' },
        ])}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-cyan-500/10 dark:bg-cyan-500/10 soft-dark:bg-lime-600/20 light:bg-cyan-100 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:shadow-lg leaf:bg-cyan-600/20 water:bg-gradient-to-r water:from-emerald-600 water:to-emerald-700 water:shadow-lg water:shadow-emerald-500/20 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-800 light:text-cyan-700 orange:text-white leaf:text-cyan-900 water:text-white rounded-full text-sm font-semibold tracking-wide mb-6">
            REAL RESULTS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-[#101828] water:to-[#101828] bg-clip-text text-transparent leading-tight">
            Case Studies
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-800 water:text-[#101828] leading-relaxed">
            See how Epic Global transforms eCommerce performance through our proven Four Pillar System
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20"
            >
              {/* Pillar Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {study.pillar.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 soft-dark:bg-lime-600/20 light:bg-cyan-100 orange:bg-orange-100 leaf:bg-cyan-600/20 water:bg-emerald-100 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-800 light:text-cyan-700 orange:text-orange-700 leaf:text-cyan-900 water:text-emerald-700"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 flex items-center gap-3">
                {study.title}
                {study.googleDriveUrl && (
                  <a
                    href={study.googleDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex p-2 bg-cyan-500/10 dark:bg-cyan-500/10 soft-dark:bg-lime-600/20 light:bg-cyan-100 orange:bg-orange-100 leaf:bg-cyan-600/20 water:bg-emerald-100 rounded-lg hover:opacity-80 transition-opacity"
                    title="Download Case Study"
                  >
                    <Download className="w-4 h-4 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-700 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  </a>
                )}
              </h2>

              <div className="flex flex-wrap gap-2 text-sm mb-6 text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-gray-700 leaf:text-gray-600 water:text-gray-700">
                <span>{study.client}</span>
                <span>|</span>
                <span>{study.industry}</span>
                <span>|</span>
                <span>{study.region}</span>
              </div>

              {/* Key Metrics */}
              {study.keyMetrics && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {study.keyMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 dark:bg-white/5 soft-dark:bg-white/50 light:bg-gray-100 orange:bg-white/50 leaf:bg-white/50 water:bg-white/50 rounded-lg p-4 border border-white/10 dark:border-white/10 soft-dark:border-white/30 light:border-gray-300 orange:border-gray-300 leaf:border-white/30 water:border-white/30"
                    >
                      <div className="text-xs font-medium mb-1 text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-gray-700 leaf:text-gray-600 water:text-gray-600">
                        {metric.label}
                      </div>
                      <div className="text-2xl font-bold mb-1 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600">
                        {metric.subtext}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-6">
                {/* Goals */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">
                    Goals
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed">
                    {study.goals}
                  </p>
                </div>

                {/* Initial Challenges */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">
                    Initial Challenges / Pain Points
                  </h3>
                  <div className="space-y-4">
                    {study.challengeDetails.map((challenge, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-gray-200 dark:text-gray-200 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-2">
                          Challenge {idx + 1}: {challenge.title}
                        </h4>
                        <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 pl-4">
                          {challenge.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy & Execution */}
                <div className="bg-white/5 dark:bg-white/5 soft-dark:bg-cyan-50 light:bg-cyan-50 orange:bg-orange-50 leaf:bg-cyan-50 water:bg-emerald-50 rounded-lg p-6 border border-white/10 dark:border-white/10 soft-dark:border-cyan-200 light:border-cyan-200 orange:border-orange-200 leaf:border-cyan-200 water:border-emerald-200">
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400 dark:text-cyan-400 soft-dark:text-cyan-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">
                    Epic Global's Strategy & Execution
                  </h3>
                  <div className="space-y-6">
                    {study.strategyDetails.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-gray-200 dark:text-gray-200 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-3">
                          {section.title}
                        </h4>
                        <ul className="space-y-2 pl-4">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-800 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                              <span className="font-semibold">{item.label}:</span> {item.text}
                            </li>
                          ))}
                        </ul>
                        {section.results && (
                          <div className="mt-3 pl-4">
                            <p className="font-semibold text-gray-200 dark:text-gray-200 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-2">
                              Results:
                            </p>
                            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-2">
                              {section.results}
                            </p>
                            {'resultBullets' in section && section.resultBullets && (
                              <ul className="space-y-1">
                                {section.resultBullets.map((bullet, bulletIdx) => (
                                  <li key={bulletIdx} className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                                    - {bullet}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                        {'chartData' in section && section.chartData && (
                          <div className="mt-4 bg-white dark:bg-white soft-dark:bg-white light:bg-white orange:bg-white leaf:bg-white water:bg-white rounded-lg p-4">
                            {section.title === 'Fulfillment Optimization' ? (
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={section.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="product" />
                                  <YAxis label={{ value: 'FBA Fees ($)', angle: -90, position: 'insideLeft' }} />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="before" fill="#94a3b8" name="Before" />
                                  <Bar dataKey="after" fill="#22c55e" name="After" />
                                </BarChart>
                              </ResponsiveContainer>
                            ) : section.title === 'A/B Testing & Image Optimization' ? (
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={section.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="product" />
                                  <YAxis label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }} />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="control" fill="#94a3b8" name="Control" />
                                  <Bar dataKey="variant" name="Variant">
                                    {section.chartData.map((entry: any, index: number) => (
                                      <Cell key={`cell-${index}`} fill={entry.success ? '#22c55e' : '#ef4444'} />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            ) : section.title === '3P Model Implementation' ? (
                              <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={section.chartData} layout="vertical">
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis type="number" label={{ value: 'Amount ($)', position: 'bottom' }} />
                                  <YAxis type="category" dataKey="product" width={150} />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="model1P_net" fill="#ef4444" name="1P Net Revenue" />
                                  <Bar dataKey="model3P_net" fill="#22c55e" name="3P Net Revenue" />
                                </BarChart>
                              </ResponsiveContainer>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Tables (for Auto Parts case study) */}
                {study.comparisonTables && study.comparisonTables.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">
                      Detailed Financial Comparison
                    </h3>
                    {study.comparisonTables.map((table, tableIdx) => (
                      <div key={tableIdx} className="bg-white/5 dark:bg-white/5 soft-dark:bg-white/50 light:bg-white orange:bg-white/50 leaf:bg-white/50 water:bg-white/50 rounded-lg p-6 border border-white/10 dark:border-white/10 soft-dark:border-white/30 light:border-gray-300 orange:border-gray-300 leaf:border-white/30 water:border-white/30 overflow-x-auto">
                        <h4 className="font-bold text-gray-200 dark:text-gray-200 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-4">
                          {table.title}
                        </h4>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b-2 border-gray-700 dark:border-gray-700 soft-dark:border-gray-300 light:border-gray-300 orange:border-gray-300 leaf:border-gray-300 water:border-gray-300">
                              <th className="py-3 px-4 font-semibold text-gray-300 dark:text-gray-300 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Metric</th>
                              <th className="py-3 px-4 font-semibold text-gray-300 dark:text-gray-300 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">1P Model (Amazon Retailer)</th>
                              <th className="py-3 px-4 font-semibold text-gray-300 dark:text-gray-300 soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">3P Model (Epic Global Seller)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.data.map((row, rowIdx) => (
                              <tr key={rowIdx} className="border-b border-gray-800 dark:border-gray-800 soft-dark:border-gray-200 light:border-gray-200 orange:border-gray-200 leaf:border-gray-200 water:border-gray-200">
                                <td className="py-3 px-4 font-medium text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-800 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">{row.metric}</td>
                                <td className="py-3 px-4 text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700">{row.model1P}</td>
                                <td className="py-3 px-4 font-semibold text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">{row.model3P}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}

                {/* Results */}
                <div className="bg-white/5 dark:bg-white/5 soft-dark:bg-lime-50 light:bg-cyan-50 orange:bg-orange-50 leaf:bg-cyan-50 water:bg-emerald-50 rounded-lg p-6 border border-white/10 dark:border-white/10 soft-dark:border-lime-200 light:border-cyan-200 orange:border-orange-200 leaf:border-cyan-200 water:border-emerald-200">
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700">
                    Results
                  </h3>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowUp className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-800 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800 font-medium">
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
              Ready to Get Similar Results?
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-8">
              Let's discuss how Epic Global can transform your eCommerce performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton variant="primary" size="lg" location="Case Studies Page - Final CTA" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

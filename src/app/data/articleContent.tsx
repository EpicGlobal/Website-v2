import Link from 'next/link';
import { CheckCircle2, AlertCircle } from 'lucide-react';

// This file contains the actual content for each knowledge base article
// Each article is a React component that can be imported and rendered

export const articleContent: Record<string, () => JSX.Element> = {
  'what-is-epic-global-inc': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Definition</h2>
        <p className="text-gray-300 leading-relaxed">
          Epic Global Inc. is a wholesale trade partner and global marketplace operator: we buy a brand's inventory upfront at wholesale and sell it on Amazon, Walmart and other marketplaces, paying for the advertising, marketplace fees and fulfillment ourselves. We cover operating costs like advertising, marketplace fees, and fulfillment, so incentives stay aligned.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Why It Matters</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Most brands work with agencies that advise but don't execute, or distributors that buy inventory but don't operate with systems and accountability. Epic Global combines inventory ownership with operational execution—we're accountable for outcomes because we fund the work and own the inventory risk.
        </p>
        <p className="text-gray-300 leading-relaxed">
          This model eliminates the misalignment that happens when agencies charge fees regardless of performance, or when internal teams lack the bandwidth or expertise to scale globally.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">How Epic Approaches It: Buy, Sell, Advertise, Protect</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">1. Buy</h3>
            <p className="text-gray-300">
              We buy your inventory upfront at an agreed wholesale price and take ownership. This means we have real skin in the game: our success is tied to retail performance, not billable hours.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">2. Sell</h3>
            <p className="text-gray-300">
              We run the storefronts day to day across approved marketplaces: listings, pricing, inventory allocation and compliance.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">3. Advertise</h3>
            <p className="text-gray-300">
              We fund and manage the advertising, and pay the marketplace fees and fulfillment. You get predictable wholesale revenue; we take on the retail execution risk.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">4. Protect</h3>
            <p className="text-gray-300">
              We protect the brand on every marketplace we operate: Brand Registry authorization, unauthorized-seller removal, MAP enforcement, and Buy Box and catalog monitoring.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Common Pitfalls (What We're Not)</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-gray-300">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <span>We're not a marketing agency that bills hourly and advises from the sidelines</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <span>We're not a distributor that buys once and then operates with minimal accountability</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <span>We don't sell à la carte services or consulting packages</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <span>We don't work on revenue share without inventory ownership</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/knowledge-base/how-our-model-works" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">How Our Model Works</h3>
            <p className="text-sm text-gray-400">Deep dive into Buy–Sell–Advertise–Protect</p>
          </a>
          <a href="/knowledge-base/who-we-are-fit-for" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">Who We're a Fit For</h3>
            <p className="text-sm text-gray-400">Brand criteria and requirements</p>
          </a>
        </div>
      </section>
    </div>
  ),

  'how-our-model-works': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">How the Zero-Risk Global Commerce Operator Model Actually Works</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Profitable marketplace growth has become a high-stakes game for brands. The channels look familiar — Amazon, Walmart, eBay, international marketplaces — but the underlying economics and operational demands have changed. Fees rise quietly. Advertising costs climb. Competition intensifies. Inventory decisions turn into expensive bets. And when something breaks — a listing issue, a sudden fee spike, a competitor hijacking branded search — brands often discover the uncomfortable truth: they carry the downside whether performance improves or not.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic Global Inc. exists because that structure is backward. Marketplace growth should not require brands to gamble capital, build internal teams around volatile platforms, or coordinate a patchwork of agencies and vendors who each optimize only their slice of the problem. The work is interconnected. The risk is interconnected. The incentives need to be interconnected too.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic is a wholesale trade partner. Our Zero-Risk model works because we take on the costs ourselves: we buy the inventory, so the retail execution risk sits with us, not the brand. We purchase inventory upfront, operate marketplace storefronts end-to-end, fund advertising and logistics, and protect brand equity — while the brand keeps its brand and Brand Registry and does not get trapped in a model where they pay retainers, fund spend, and hope the numbers work out.
        </p>
        <p className="text-gray-300 leading-relaxed">
          This isn't a U.S. strategy with international "add-ons." It's one operating system applied everywhere. Whether a brand is underperforming in the United States, losing margin to fees, or preparing to expand globally, Epic functions as a commerce operator built to deliver predictable outcomes.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The Problem: Brands Carry All the Downside</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Many brands assume their hardest problems begin internationally. In reality, the same structural issues are already punishing them at home.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          In the U.S., brands face rising fulfillment fees, advertising inefficiencies, pricing erosion, and intense competition for branded search demand. It's common to see revenue grow while profitability shrinks, because costs scale faster than performance. Even brands with strong products and loyal customers can find themselves trapped: they can't stop spending, but they also can't confidently predict what growth will cost next quarter.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          International expansion compounds the same problems. Inventory risk increases. Operational complexity multiplies. Marketplaces operate differently. Timelines stretch. The brand is asked to front even more capital, manage even more moving parts, and accept even more uncertainty.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Across both domestic and international environments, the traditional expectation is the same: the brand funds the bet and absorbs the loss if it doesn't work.
        </p>
        <p className="text-gray-300 leading-relaxed">
          That structure creates a second problem: fragmented accountability. One partner touches listings. Another touches ads. Another touches fulfillment. Another handles "brand protection" — sometimes only when something goes wrong. Each vendor can report success within their scope while overall profitability stalls. Growth can look positive on the surface and still be fragile underneath.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">What Epic Global Is</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic Global is not an advisory firm. We are not a retainer-based agency. We are not a reseller operating at arm's length. We do not shift downside back to the brand through fees, "required ad budgets," or operational responsibilities disguised as partnership.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic is a wholesale trade partner: we own the inventory, and you keep the brand.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          That means we apply one integrated model across the U.S. and global marketplaces:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>We assume inventory ownership through upfront purchases.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>We operate marketplace storefronts directly.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>We fund advertising and manage it for efficiency and profitability.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>We manage logistics and marketplace execution end-to-end.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>We protect brand equity with integrated enforcement and defense mechanisms.</span>
          </li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          Epic becomes the brand's marketplace operating system. That structure allows us to drive performance in the U.S. while building the foundation for controlled expansion beyond it.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The Operating Model: Buy – Sell – Advertise – Protect</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Epic operates through a unified framework: Buy – Sell – Advertise – Protect. This governs both U.S. execution and international expansion. It is the reason the model works — not as theory, but as a system.
        </p>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Buy: Upfront inventory purchase</h3>
            <p className="text-gray-300">
              Epic purchases inventory upfront at wholesale pricing. For the brand, this immediately converts inventory into cash and removes inventory risk. Instead of tying up capital in uncertain outcomes, the brand gets predictable economics at the start of the cycle.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Sell: End-to-end marketplace operation</h3>
            <p className="text-gray-300">
              Epic operates listings and storefronts across marketplaces using a unified operational framework. Pricing, listing performance, fulfillment configuration, and day-to-day catalog control are managed centrally. Because we own execution, decisions aren't delayed across vendors and departments — they're run through one operating cadence.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Advertise: Epic funds the spend, then optimizes for profitability</h3>
            <p className="text-gray-300">
              Epic funds and manages advertising across marketplaces. That matters because it changes the incentive structure. When a brand funds ad spend, the system often defaults to "spend to grow," even when efficiency deteriorates. When Epic carries the spend, campaigns must earn their keep. Optimization is tied to profit outcomes, not budget utilization.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Protect: Brand equity is defended while growth is built</h3>
            <p className="text-gray-300">
              Marketplace growth creates exposure: unauthorized sellers, price erosion, listing instability, branded search hijacking, and counterfeit risk. Epic's model integrates brand protection into the operating system rather than treating it as an afterthought. Through the Brand Protection Command Center™, we enforce pricing integrity, remove unauthorized sellers, and defend branded search demand — in the U.S. and globally.
            </p>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed mt-6 italic">
          This is the core difference between "growth services" and a true commerce operator. Services improve parts of the machine. Operators control the machine.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The Financial Reality: 1P vs Epic's 3P Structure</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          For many brands, the U.S. marketplace problem isn't demand. It's economics.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          The 1P vs 3P Financial Breakdown case study highlights why. Under Amazon's 1P structure, brands receive a nominal purchase price — but absorb a stack of Amazon-imposed fees that materially reduce actual net revenue. These costs can be underestimated, difficult to forecast, and hard to control.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          In the Auto Parts Brand example, Epic's 3P structure provided a predictable purchase price while Epic absorbed the marketplace fees. The result was materially higher net revenue per unit to the brand compared to Amazon 1P.
        </p>
        <p className="text-gray-300 leading-relaxed">
          That distinction matters most in the U.S., where fulfillment fees, advertising costs, chargebacks, and operational penalties can quietly erode profitability. Epic's model converts variable outcomes into known economics, enabling brands to scale domestically without margin volatility.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">What Execution Looks Like When One Operator Controls the System</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          The Sutera Amazon Case Study demonstrates what happens when one operator controls inventory, listings, advertising, and enforcement under a unified cadence.
        </p>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold mb-3 text-white">Fee reduction through operational control</h3>
            <p className="text-gray-300">
              Epic optimized packaging and inventory management, reducing average FBA fulfillment fees by 2.9% across the catalog.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold mb-3 text-white">Conversion improvements through disciplined testing</h3>
            <p className="text-gray-300">
              Through structured A/B testing, imagery upgrades, video assets, and SEO optimization, Epic increased conversion rates by an average of 21% on successful tests.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold mb-3 text-white">Listing optimization driven by data, not opinion</h3>
            <p className="text-gray-300">
              Epic rebuilt and improved listings to raise visibility and engagement, applying changes only when results justified the update.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold mb-3 text-white">Brand defense that protects demand</h3>
            <p className="text-gray-300">
              Epic reclaimed branded search demand, ensuring customers searching for the brand encountered the brand — not competitors.
            </p>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed mt-6">
          Those outcomes were possible because the system was unified. When different teams control different levers, improvements collide. When one operator controls the full system, improvements compound.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Global Expansion Without Rebuilding the Wheel</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic's global network exists for one reason: to extend the same operating discipline beyond the U.S. without forcing brands to rebuild everything from scratch.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Programs such as Korea Express™, Asia Express™, and UK & Europe Express™ provide structured pathways into international markets using Epic's existing infrastructure and operational playbooks. Expansion is executed as an extension of the same operating system that drives U.S. performance.
        </p>
        <p className="text-gray-300 leading-relaxed">
          The value isn't simply "international availability." It's the ability to scale without chaos — using one model, one cadence, and one accountability structure.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Brand Protection and Control Are Not Optional</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Growth that destroys pricing integrity is not growth. It's a slow leak.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          The Brand Protection Command Center™ operates continuously across U.S. and international marketplaces. Epic removes unauthorized sellers, enforces MAP compliance, and defends branded search visibility. The result is durable growth that protects the customer experience and preserves brand equity as volume increases.
        </p>
        <p className="text-gray-300 leading-relaxed">
          In most models, brand protection is reactive and fragmented. In Epic's model, it's proactive, integrated, and aligned with revenue generation.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Who This Model Is Built For</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic Global is best suited for brands that:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Have established demand in the United States</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Want to improve domestic profitability and control</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Are preparing for or already pursuing international expansion</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Value predictable economics and brand protection</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Want a single accountable operator — not a network of vendors</span>
          </li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          Epic is designed for durable growth, not short-term experimentation. The goal is not to run more activity. The goal is to run a more controlled system.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The Bottom Line</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic Global applies a single operating model to grow brands in the United States and across global marketplaces. By assuming risk and aligning incentives, we enable brands to scale with confidence, clarity, and control.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Marketplace growth should not require brands to gamble. It should require a system.
        </p>
        <p className="text-cyan-400 font-semibold text-lg">
          We buy it. You profit.™
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/knowledge-base/what-is-epic-global-inc" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">What is Epic Global Inc</h3>
            <p className="text-sm text-gray-400">Foundational explanation for brand partners</p>
          </a>
          <a href="/case-studies" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">Case Studies</h3>
            <p className="text-sm text-gray-400">Real outcomes from real operations</p>
          </a>
        </div>
      </section>
    </div>
  ),

  'catalog-hygiene-what-it-is-why-it-matters': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">The Silent Growth Killer: Mastering Catalog Hygiene in 2026</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Catalog hygiene is the disciplined habit of keeping product data clean, consistent, and current across every SKU and marketplace. When it's done well, listings stay stable, ads behave predictably, and growth becomes repeatable instead of a never-ending cycle of reactive fixes.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Think of catalog hygiene like routine maintenance on an engine. You can skip it for a while, but the cost shows up later — usually at the worst possible time: during a launch, a promotion, or a period of scaling.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">What is catalog hygiene</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          In 2026, the bar is higher. Marketplaces and shopping assistants increasingly rely on structured product data to interpret what you sell and who it's for. If your data is inconsistent, incomplete, or drifting, performance doesn't just plateau — it becomes unstable.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The core components of catalog hygiene</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Structural integrity</h3>
            <p className="text-gray-300">
              Titles, bullets, descriptions, and enhanced content follow a consistent structure and brand hierarchy. The goal is clarity — for customers and for marketplace indexing.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Attribute accuracy</h3>
            <p className="text-gray-300">
              Backend fields (size, material, color, pack count, compatibility, etc.) are complete and standardized. These fields power filters, relevance, and how marketplaces categorize your product.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Media compliance</h3>
            <p className="text-gray-300">
              Images and videos meet current marketplace requirements and render correctly across devices. On Amazon, image specs allow 500–10,000 pixels on the longest side, but 1,000+ pixels is recommended for zoom-quality experiences.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Relationship mapping</h3>
            <p className="text-gray-300">
              Variation structures are correct and resilient — no orphaned children, broken parents, or themes that no longer work. Amazon announced removal of "irrelevant or redundant" variation themes from templates between September 2 and November 30, 2025, and marked impacted themes as "Deprecated: Do Not Use."
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">Change control</h3>
            <p className="text-gray-300">
              Edits are documented, versioned, and reversible. Catalogs don't fail because someone made one bad change — they fail because nobody can track what changed, why it changed, and how to roll it back.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Why hygiene is a high-leverage task in 2026</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          The "boring stuff" drives outsized results because everything else depends on it.
        </p>
        
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="pb-3 text-white font-semibold">Area</th>
                <th className="pb-3 text-white font-semibold">What hygiene improves</th>
                <th className="pb-3 text-white font-semibold">What happens when hygiene is weak</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/5">
                <td className="py-3 font-semibold text-cyan-400">Search visibility</td>
                <td className="py-3">Clean titles + accurate attributes support stronger indexing and relevance</td>
                <td className="py-3">You rank for the wrong queries or disappear in filters</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 font-semibold text-cyan-400">Conversion</td>
                <td className="py-3">Clear variations, strong imagery, fewer buyer questions</td>
                <td className="py-3">Shoppers hesitate, choose competitors, or bounce</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 font-semibold text-cyan-400">Ad efficiency</td>
                <td className="py-3">Stable listing signals help campaigns scale more predictably</td>
                <td className="py-3">Volatile performance, wasted spend, messy targeting</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-cyan-400">Account health</td>
                <td className="py-3">Fewer suppressions and avoidable policy issues</td>
                <td className="py-3">Fire drills, downtime, and constant rework</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-300 leading-relaxed mt-6 italic">
          Reality check: data hygiene problems quietly drain time across organizations; one cited estimate is teams can lose up to ~32% of their time fixing data issues.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The Epic methodology: a simple operating loop</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Catalog hygiene isn't a quarterly cleanup. It's a weekly operating discipline.
        </p>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">1) Baseline audit</h3>
            <p className="text-gray-300">
              Find the structural issues that create recurring breakage: attribute gaps, variation conflicts, title drift, and media failures.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">2) Versioning + change control</h3>
            <p className="text-gray-300 mb-3">
              Every meaningful change gets:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>a reason</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>an owner</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>before/after snapshots</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>and a rollback path</span>
              </li>
            </ul>
            <p className="text-gray-300 mt-3">
              Treat marketplaces as volatile environments — because they are.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">3) Weekly QA cadence</h3>
            <p className="text-gray-300 mb-3">
              Proactive checks beat reactive alerts:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>variation integrity (parents/children intact, themes valid)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>media health (resolution, rendering, swatches)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>attribute drift (fields wiped, overwritten, or conflicting)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>suppression and policy-related flags</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">4) Systematic scaling</h3>
            <p className="text-gray-300">
              Fix patterns category-wide using bulk operations and repeatable rules, not one-off portal edits. The goal is fewer regressions and less "randomness" in performance.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Operator-grade checklist (aim for 95%+)</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-3 text-white">Content</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Consistent structure and tone across the catalog</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>No keyword stuffing — readable first, indexable second</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Titles render cleanly on mobile</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-3 text-white">Attributes</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Required + recommended fields complete</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>No placeholders like "N/A" unless explicitly allowed</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Units and terminology standardized across SKUs</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-3 text-white">Variations</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Themes match real differences (size, color, style, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>No orphaned SKUs, duplicates, or broken relationships</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Each child has correct imagery where it matters</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-3 text-white">Media</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Main images render cleanly and meet marketplace specs (Amazon allows 500–10,000 px; 1,000+ for zoom-quality)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Secondary images answer buyer questions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Video used when it improves understanding and conversion</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-3 text-white">Systems</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>A "single source of truth" outside the seller portal</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Change logs and rollback procedures maintained weekly</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Common pitfalls to avoid in 2026</h2>
        <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 backdrop-blur-xl rounded-xl p-6 border border-orange-500/20">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-300">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Treating hygiene like a one-time project (catalogs drift constantly)</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Ignoring metadata because "it's just backend" (it drives filters, relevance, and structure)</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Making quick portal edits with no documentation (you won't remember what caused the dip)</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Letting variation structure decay (Amazon's variation theme changes have real consequences)</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Bottom line</h2>
        <p className="text-gray-300 leading-relaxed">
          Catalog hygiene is not glamorous, but it's one of the few levers that improves search, conversion, advertising efficiency, and account stability at the same time. In 2026, the brands that scale cleanly aren't doing "more hacks" — they're running tighter systems.
        </p>
      </section>
    </div>
  ),

  'kpi-glossary': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">The Marketplace KPI Glossary</h2>
        <p className="text-xl text-cyan-400 mb-6">Definitions, calculations, and tactical interpretation</p>
        <p className="text-gray-300 leading-relaxed mb-4">
          KPIs are only useful if the whole team is using the same math to make decisions. This glossary covers the core metrics of marketplace operations, how to calculate them, and—more importantly—what they're trying to tell you.
        </p>
      </section>

      {/* Section 1: Traffic & Advertising Efficiency */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">1) Traffic & advertising efficiency</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          These metrics tell you how well you're "buying" attention and whether that attention is relevant.
        </p>

        <div className="space-y-6">
          {/* CTR */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">CTR (Click-Through Rate)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Clicks ÷ Impressions × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Are you winning the click on the search shelf?
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Operator note:</strong> CTR is usually driven by your main image, price, reviews, title, and query relevance. Low CTR typically means you're showing up for the wrong searches—or your shelf presentation isn't competitive.
            </p>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Common benchmark (varies by category):</strong><br/>
                Sponsored Products: ~0.3–0.5%<br/>
                Sponsored Brands: ~0.4–0.8%
              </p>
            </div>
          </div>

          {/* CPC */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">CPC (Cost Per Click)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Ad Spend ÷ Clicks
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> The cost of a "shop visit."
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> High CPC is only "bad" if your conversion and margin can't support it. Premium categories often have high CPC and still print money if CVR and contribution margin are strong.
            </p>
          </div>

          {/* ACoS */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">ACoS (Advertising Cost of Sale)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Ad Spend ÷ Ad-attributed Sales × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> How efficient the ad is on the sales it gets credit for.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> ACoS is great for keyword-level bid decisions, but it's not the full truth of the business because attribution is imperfect and organic halo exists.
            </p>
          </div>

          {/* ROAS */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">ROAS (Return on Ad Spend)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Ad-attributed Sales ÷ Ad Spend
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> The inverse of ACoS; "How many dollars came back per dollar spent."
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> ROAS is easier for exec teams to read quickly. Just don't let it become the only metric—ROAS can look "great" while total sales stagnate.
            </p>
          </div>

          {/* TACoS */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">TACoS (Total Advertising Cost of Sales)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Ad Spend ÷ Total Sales × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Whether advertising is helping the entire business grow—or just replacing organic sales you used to get for free.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Operator note:</strong> If TACoS rises while total sales stay flat, you're often buying back demand (organic rank slipped, competition increased, or branded defense is failing).
            </p>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Typical ranges:</strong><br/>
                Mature listings: ~8–12%<br/>
                Launch/expansion: ~15–20%
              </p>
            </div>
          </div>

          {/* Impression Share */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Impression Share (where available)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Your share of eligible impressions for a keyword or target.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Are you actually showing up enough to win?
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> If you're losing impression share due to budget, you may be "efficient" and still missing the entire opportunity.
            </p>
          </div>

          {/* Branded vs Non-Branded */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Branded vs Non-Branded Traffic Share</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> How much traffic comes from brand-name searches vs generic category searches.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Why it matters:</strong>
            </p>
            <ul className="space-y-2 mb-3">
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Branded traffic is usually cheaper and converts higher.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Non-branded traffic is how you grow beyond existing demand.</span>
              </li>
            </ul>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> If non-branded is weak, you're dependent on your current audience. If branded is weak, you're losing your own demand to competitors.
            </p>
          </div>

          {/* Organic Sales % */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Organic Sales %</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Organic Sales ÷ Total Sales × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> How much of your revenue comes without paid support.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> A healthy business usually increases organic share over time as listings stabilize and rank improves.
            </p>
          </div>

          {/* New-to-Brand */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">New-to-Brand % (Amazon, Sponsored Brands / DSP contexts)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> The percentage of ad-attributed customers who are new to your brand.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">What it tells you:</strong> Whether ads are acquiring new customers or recycling existing demand.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Conversion & Listing Performance */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">2) Conversion & listing performance</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Once a shopper lands on the page, these metrics track your ability to close the deal.
        </p>

        <div className="space-y-6">
          {/* Sessions / Visits */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Sessions / Visits</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Visits to the product detail page.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Sessions are the denominator for conversion. Low sessions = noisy CVR. If you don't have enough traffic, don't overreact to week-to-week conversion swings.
            </p>
          </div>

          {/* CVR */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">CVR (Conversion Rate)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Orders ÷ Sessions × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Does the listing close?
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Tactical interpretation:</strong>
            </p>
            <ul className="space-y-2 mb-3">
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>10–15%+ often indicates strong product-market fit and a solid listing</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>5–10% can be workable but usually has obvious upside</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>&lt;5% usually indicates a leak: price, reviews, images, variation confusion, trust issues, or mobile rendering problems</span>
              </li>
            </ul>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Segment CVR where possible (branded vs non-branded, mobile vs desktop, top keywords). Blended CVR hides the real failure point.
            </p>
          </div>

          {/* Unit Session Percentage */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Unit Session Percentage (Amazon)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Units ordered per session.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Whether customers tend to buy multiple units or bundles.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> If Unit Session % is meaningfully higher than CVR, shoppers are "stocking up," which can justify higher CPC.
            </p>
          </div>

          {/* Add-to-Cart Rate */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Add-to-Cart Rate (where available)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> The percentage of sessions that add to cart.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Early intent signal.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Low add-to-cart often points to price friction or confusion (variation, sizing, unclear benefits). High add-to-cart but low purchases can indicate fulfillment/checkout friction.
            </p>
          </div>

          {/* Buy Box */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Buy Box / Featured Offer % (Amazon)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> The % of page views where your offer owned the Buy Box/Featured Offer.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> If this drops below ~95%, you have a system leak (pricing wars, unauthorized sellers, inventory issues). It also kneecaps ad performance.
            </p>
          </div>

          {/* Search Rank */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Search Rank (Keyword Rank)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Where your product appears for a given search term.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Why it matters:</strong> Rank influences traffic quality, volume, and required ad spend.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> The most actionable rank tracking is on a set of high-intent terms, not thousands of random keywords.
            </p>
          </div>

          {/* Listing Health Score */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Listing Health Score (internal KPI)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> A structured score for the listing's readiness and quality (content, images, attributes, variations, compliance, reviews).
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Why it matters:</strong> Lets you prioritize fixes across a catalog and prevent "random" performance swings.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> The goal is a weekly cadence where health scores don't drift.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Profitability */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">3) Profitability (the bottom line)</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Revenue is vanity; margin keeps the lights on.
        </p>

        <div className="space-y-6">
          {/* Contribution Margin */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Contribution Margin (the North Star)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong>
            </p>
            <p className="text-gray-300 mb-3 pl-4">
              Revenue − (COGS + Marketplace Fees + Fulfillment/Shipping + Ad Spend + Returns/Refunds)
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> What's left after variable costs.
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Operator note:</strong> Many "top sellers" are unprofitable once ads and returns are included. Contribution margin prevents you from celebrating growth you're paying for.
            </p>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Healthy target (varies):</strong> ~20–30%+ contribution after variable costs.
              </p>
            </div>
          </div>

          {/* Gross Margin */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Gross Margin</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> (Revenue − COGS) ÷ Revenue
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Product margin before marketplace realities hit.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Useful, but incomplete on marketplaces.
            </p>
          </div>

          {/* Net Margin */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Net Margin</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Profit after all costs (fixed + variable).
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Why it matters:</strong> Executive truth metric, but less actionable daily than contribution margin.
            </p>
          </div>

          {/* CAC */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">CAC (Customer Acquisition Cost) (where measurable)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation (simple):</strong> Ad Spend ÷ New Customers
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> What you paid to acquire a new customer.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> CAC is only meaningful if "new customer" is measured reliably (platform definitions vary). Pair it with LTV when possible.
            </p>
          </div>

          {/* LTV */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">LTV (Customer Lifetime Value) (where measurable)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Expected total profit from a customer over time.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Marketplace data often limits LTV visibility. If you can't measure it, don't pretend you can—use repeat purchase rate proxies instead.
            </p>
          </div>

          {/* Price Index */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Price Index (vs competitors)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Your price ÷ Competitor price (or your price vs category median)
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Whether your offer is priced competitively.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> When CVR drops, price index is one of the first checks—especially if reviews are stable.
            </p>
          </div>

          {/* Coupon / Promo Lift */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Coupon / Promo Lift</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> Incremental sales or CVR improvement generated by a coupon or promotion.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Watch profitability. Promotions can increase revenue while shrinking contribution margin.
            </p>
          </div>

          {/* Subscribe & Save */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Subscribe & Save % (if applicable)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Definition:</strong> % of units/orders coming via subscription.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Why it matters:</strong> Often improves retention and stabilizes demand, but affects margin and forecasting.
            </p>
          </div>

          {/* Refund / Return Rate */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Refund / Return Rate</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Returned units ÷ Units sold × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Hidden profit leak + expectation gap indicator.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> High returns often mean the listing is overselling, unclear, or the variation structure is confusing.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Inventory Health & Risk */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">4) Inventory health & risk</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          These metrics protect you from stockouts, overstock, and cash drag.
        </p>

        <div className="space-y-6">
          {/* Weeks of Cover */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Weeks of Cover (WOC)</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> On-hand Units ÷ Average Weekly Sales
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> How long inventory will last at current velocity.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> 4–8 weeks is a common "Goldilocks" zone for many categories—but lead times change the right answer.
            </p>
          </div>

          {/* Sell-Through Rate */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Sell-Through Rate</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> Units Sold ÷ Available Inventory × 100
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> Are you moving inventory at a healthy pace?
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> Low sell-through creates storage fee drag and dead stock. Extremely high sell-through can mean you're flirting with stockouts.
            </p>
          </div>

          {/* Inventory Turnover */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">Inventory Turnover</h3>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">Calculation:</strong> COGS ÷ Average Inventory Value
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-cyan-400">What it tells you:</strong> How efficiently you're using cash.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Operator note:</strong> High turnover is great—until it becomes constant stockouts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Metric Relationships */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">5) Metric relationships (the diagnostic guide)</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          The most valuable insights come from how metrics move together.
        </p>

        <div className="space-y-6">
          {/* High CTR + Low CVR */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">If you see High CTR + Low CVR</h3>
            <p className="text-gray-300 mb-2">
              <strong className="text-cyan-400">It usually means:</strong> mismatch or friction.
            </p>
            <p className="text-gray-300">
              You won the click, but the listing didn't close (price/reviews/variation confusion/weak images/unclear value).
            </p>
          </div>

          {/* High ACoS + Low TACoS */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">If you see High ACoS + Low TACoS</h3>
            <p className="text-gray-300 mb-2">
              <strong className="text-cyan-400">It usually means:</strong> healthy growth.
            </p>
            <p className="text-gray-300">
              Ads look expensive, but total sales are rising and organic is holding. You're often "seeding" rank.
            </p>
          </div>

          {/* Low Sessions + High CVR */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">If you see Low Sessions + High CVR</h3>
            <p className="text-gray-300 mb-2">
              <strong className="text-cyan-400">It usually means:</strong> untapped potential.
            </p>
            <p className="text-gray-300">
              Your offer closes, but not enough people see it. Increase visibility through targeting, ranking strategy, or stronger shelf presentation.
            </p>
          </div>

          {/* Flat sales + Rising TACoS */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">If you see Flat sales + Rising TACoS</h3>
            <p className="text-gray-300 mb-2">
              <strong className="text-cyan-400">It usually means:</strong> organic erosion.
            </p>
            <p className="text-gray-300">
              You're spending more to maintain the same result. Something is stealing your "free" sales (rank loss, competitor pressure, Buy Box loss, branded defense).
            </p>
          </div>

          {/* Rising WOC + Falling CVR */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">If you see Rising WOC + Falling CVR</h3>
            <p className="text-gray-300 mb-2">
              <strong className="text-cyan-400">It usually means:</strong> inventory drag.
            </p>
            <p className="text-gray-300">
              Demand is softening or competition increased. Consider pricing, positioning, offer stack, and whether the listing needs a refresh.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pitfall */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">Common pitfall: the blended trap</h2>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <p className="text-gray-300 leading-relaxed">
            Account-wide averages hide structural problems. A 10% TACoS can look great if one hero SKU runs at 2% while five laggard SKUs sit at 40%. Always review KPIs at the SKU, category, and keyword level before making "portfolio" decisions.
          </p>
        </div>
      </section>
    </div>
  ),

  'who-we-are-fit-for': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">What Types of Brands We're a Fit For</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Most brands don't need "more marketplace help." They need a cleaner model.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Because the real problem isn't usually effort. It's that marketplace growth has turned into a stack of risk: inventory bets, ad spend, fee creep, pricing pressure, operational fires, and a rotating cast of vendors who can all say they did their part while the total system still underperforms.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic's operator model is built for brands that are past the early guessing phase. You have demand. You have traction. You may even have momentum. What you don't have is the time, appetite, or internal bandwidth to keep gambling capital and stitching together execution across listings, ads, inventory, and brand defense.
        </p>
        <p className="text-gray-300 leading-relaxed">
          As a rule of thumb, we're typically a fit once a brand is doing $50K+ per month and the marketplace channel starts behaving less like a side project and more like an operating discipline.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The simplest way to know if you're ready</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 mb-4">
          <p className="text-gray-300 leading-relaxed mb-3">
            If you're still trying to figure out whether the product is going to sell, you're early.
          </p>
          <p className="text-gray-300 leading-relaxed">
            If you know it sells — but performance feels expensive, fragile, or constantly "one issue away" from slipping — you're in the zone.
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed">
          That's the point where an operator model stops being a nice idea and becomes a strategic advantage.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Brands that benefit most from Epic</h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">You're done funding uncertainty</h3>
            <p className="text-gray-300 mb-3">
              A lot of marketplace "growth" is just brands financing volatility.
            </p>
            <p className="text-gray-300 mb-3">
              You buy inventory. You pay for ads. You pay an agency. You eat the fees. And if results don't show up fast enough, you still carry the downside. That's the normal structure.
            </p>
            <p className="text-gray-300">
              Epic is built for brands who want the opposite: a partner that assumes the risk and earns its returns through performance, not through retainers and "activity."
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">The marketplace is now too operational to be handled casually</h3>
            <p className="text-gray-300 mb-3">
              Once you reach a certain level, marketplace performance becomes less about clever marketing and more about consistency:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Listings drift over time unless they're managed</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Ads decay unless they're structured and maintained</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Inventory planning determines whether growth is even possible</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Pricing integrity either holds or it collapses</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Branded search gets defended — or it gets taken</span>
              </li>
            </ul>
            <p className="text-gray-300 mt-3">
              If the channel is taking real attention from leadership every week, that's usually a sign you've outgrown the "patchwork" approach.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">You care about control, not just sales</h3>
            <p className="text-gray-300 mb-3">
              Some partners can drive volume. That's not hard if you're willing to ignore long-term consequences.
            </p>
            <p className="text-gray-300 mb-3">
              The harder thing is keeping your marketplace presence clean: stable pricing, clean listings, defendable branded demand, disciplined advertising, and a catalog that stays healthy as it scales.
            </p>
            <p className="text-gray-300">
              Epic tends to fit brands that think like operators. They want growth, but they also want their brand to look strong, behave predictably, and stay protected while growth happens.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">The U.S. channel needs to be profitable before expansion matters</h3>
            <p className="text-gray-300 mb-3">
              A lot of brands talk about going global while the U.S. channel is quietly leaking margin.
            </p>
            <p className="text-gray-300">
              If your domestic performance feels like you're fighting fees, ad costs, and margin compression, fixing that system comes first. Epic is designed to improve U.S. performance while building the same operating foundation that can later be extended internationally — without a complete reinvention.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">You want one accountable operator, not five different vendors</h3>
            <p className="text-gray-300 mb-3">
              If your current setup includes a listing person, an ad agency, a 3PL, a "brand protection" vendor, and someone producing reports — you already know what happens next: coordination overhead becomes the hidden tax.
            </p>
            <p className="text-gray-300">
              Brands that benefit most from Epic are usually tired of that. They want one operator running the whole machine, with one set of incentives and one line of accountability.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Common "we should talk" signals</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          You don't need to check every box, but these tend to show up when the operator model clicks:
        </p>
        <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 backdrop-blur-xl rounded-xl p-6 border border-orange-500/20">
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Revenue is climbing but margin isn't</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Stockouts and overstock keep trading places</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Ads "work" but spend keeps rising to maintain the same sales</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Competitors keep showing up on branded search</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Pricing gets messy the moment you scale distribution</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>A single listing change can tank performance for weeks</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Leadership is forced into weekly firefighting to keep the channel stable</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-300 leading-relaxed mt-4">
          If any of those sound familiar, you're not alone. They're normal problems at scale — and they're exactly why an operator model exists.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">When Epic is probably not the right fit</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Not every brand should use this structure.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          If you're still early and experimenting, you may be better served by learning fast and staying flexible. If you want to keep all operations in-house, an operator model will feel too integrated. And if you're looking for à la carte help — a one-time listing rewrite or a short ad project — that's not what we're built for.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Epic works best when the goal is simple: build a controlled, scalable marketplace system and run it consistently.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">The point</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic is for brands that already have demand — and now want the channel to behave like a system instead of a gamble.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          If you're doing $50K+ per month, want more control, and don't want to keep carrying the downside of marketplace growth, we're likely a fit.
        </p>
        <p className="text-cyan-400 font-semibold text-lg">
          We buy it. You profit.™
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/knowledge-base/how-our-model-works" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">How Our Model Works</h3>
            <p className="text-sm text-gray-400">Deep dive into Buy–Sell–Advertise–Protect</p>
          </a>
          <a href="/case-studies" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">View Case Studies</h3>
            <p className="text-sm text-gray-400">See real marketplace execution examples</p>
          </a>
        </div>
      </section>
    </div>
  ),

  'marketplace-operating-cadence': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">The Incentive Trap: Why Epic Isn't an "Agency"</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Most brands evaluating marketplace partners run into the same problem: after the third discovery call, every pitch sounds identical. Everyone "scales Amazon." Everyone has a "proven playbook." Everyone promises control.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          And yet, brands keep ending up in the same cycle—paying for activity, absorbing the downside, and watching margins get chipped away by fee creep, ad volatility, and operational complexity.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          The fastest way to cut through the noise is to stop comparing tactics and start comparing business models.
        </p>
        <p className="text-gray-300 leading-relaxed font-semibold">
          Because the model determines the incentives. And the incentives determine the results.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">The marketplace partner landscape</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Most partners fall into four buckets. Here's how they stack up against Epic.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-4 text-cyan-400 font-semibold">Partner type</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">What they do</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Who carries the risk</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">What they're incentivized to optimize</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold">Agencies</td>
                <td className="p-4">Manage ads, listings, creative, SEO for a fee/retainer</td>
                <td className="p-4">The brand</td>
                <td className="p-4">Deliverables, activity, and short-term metrics</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold">Distributors / 1P-style</td>
                <td className="p-4">Buy inventory and sell into the channel</td>
                <td className="p-4">Shared</td>
                <td className="p-4">Their margin and velocity (often with less brand control)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-semibold">Aggregators</td>
                <td className="p-4">Acquire brands outright</td>
                <td className="p-4">The aggregator</td>
                <td className="p-4">EBITDA consolidation for their exit</td>
              </tr>
              <tr className="bg-cyan-500/5 border-b border-cyan-500/20">
                <td className="p-4 font-bold text-white">Operator (Epic)</td>
                <td className="p-4">Buys inventory and runs the marketplace system</td>
                <td className="p-4 font-semibold">Epic</td>
                <td className="p-4">Total channel outcomes: profitable sell-through, stability, and control</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 mt-6">
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Epic is an Operator.</strong> That one word is the difference between "helping you do commerce" and "running commerce on your behalf."
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">1) Agencies: you pay, you risk, you hope</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Agencies are service providers. They sell work—listing projects, ad management, creative, SEO—usually via a retainer, hourly billing, or % of spend.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">The core limitation isn't effort. It's structure.</strong>
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Agencies can optimize ads while inventory is unstable. They can rewrite copy while Buy Box is inconsistent. They can create images while pricing is eroding. They're working on pieces of a machine they don't control.
        </p>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 mb-4">
          <h3 className="text-xl font-semibold mb-3 text-white">The incentive mismatch:</h3>
          <p className="text-gray-300">
            They get paid whether you're profitable or not. Even great agencies are still "hedged" against performance because the brand funds the bet.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-3 text-white">The burden stays with you:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>inventory commitments</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>ad spend and budget risk</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>fees, chargebacks, returns</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>internal coordination overhead</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>the downside if performance dips</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 mt-6">
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Epic is not a retainer-based agency.</strong> We don't sell pieces. We operate the system.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">2) Distributors and 1P-style relationships: cash flow, but less control</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Traditional distributors buy inventory (which can be great for cash flow). Some 1P-style arrangements can reduce operational burden.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          The tradeoff brands often experience is control and transparency:
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>pricing and presentation can drift</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>customer "shelf" decisions aren't always aligned to long-term brand equity</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>reporting can be limited or delayed</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>incentives often prioritize distributor margin and velocity</span>
          </li>
        </ul>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Epic also purchases inventory,</strong> but we're not "set it and forget it distribution." Our model is built to operate the channel with brand control, performance accountability, and ongoing system management—not just placement.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">3) Aggregators: they want your company, not just your inventory</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Aggregators are an M&A model. They buy brands, then apply their operational playbooks to increase EBITDA.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          If you want to sell your business, aggregators are a path.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          If you want to keep your business and still get operator-level execution, aggregators aren't the answer.
        </p>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Epic does not buy brands.</strong> We don't take equity. We don't require an exit to deliver operator-level outcomes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">Buy, Sell, Advertise, Protect: how the model works</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic is a wholesale trade partner. We buy the inventory and run the marketplace business end to end.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          Our model is built on four parts: <strong className="text-white">Buy, Sell, Advertise, Protect</strong>.
        </p>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">BUY</h3>
            <p className="text-gray-300">
              Epic purchases your inventory upfront at wholesale. This converts inventory into cash and removes the "sitting stock" risk from your balance sheet.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">SELL</h3>
            <p className="text-gray-300">
              We operate marketplaces end-to-end. Not just "management"—we run the operating cadence: catalog execution, pricing discipline, listing performance, and the system that keeps performance stable.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">ADVERTISE</h3>
            <p className="text-gray-300">
              Epic covers the costs that normally make growth risky. We fund and manage the advertising and pay the marketplace fees and fulfillment required to scale. When performance dips, our capital is exposed, not yours.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">PROTECT</h3>
            <p className="text-gray-300">
              We protect the brand on every marketplace we operate: Brand Registry authorization, unauthorized-seller removal, MAP enforcement, Amazon Transparency where it fits, Buy Box and catalog monitoring, and brand protection reports.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 mt-6">
          <p className="text-gray-300 leading-relaxed">
            This is the operator reality: when a partner carries the cost and the risk, they become disciplined about what works—not what sounds good in a monthly status report.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">"How are we different from other big marketplace players?"</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          There are other large buy-and-sell operators in the market. Some may look similar at first glance. The best way to tell models apart is to ask a few operator questions that expose incentives and responsibility.
        </p>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-2xl font-semibold mb-6 text-white">The four operator questions</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-cyan-400">1) Who funds advertising?</h4>
              <p className="text-gray-300">
                If you fund ads, you're still funding the risk. In Epic's model, Epic carries the spend.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-cyan-400">2) Who owns execution end-to-end?</h4>
              <p className="text-gray-300">
                Do you still coordinate agencies, freelancers, and internal approvals—or does one operator actually run the machine?
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-cyan-400">3) Is there a retainer or fixed fee?</h4>
              <p className="text-gray-300">
                If there's a monthly fee, the partner is insulated from your downside. Epic only wins when products sell through profitably.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-cyan-400">4) What happens when performance dips?</h4>
              <p className="text-gray-300">
                Do they still get paid the same? Or do they feel the downside alongside you?
              </p>
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 mt-6">
            <p className="text-gray-300">
              The answers reveal the true model fast.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">The bottom line</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Choosing a marketplace partner isn't just hiring help. It's choosing an incentive structure.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Epic is not:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-300">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span>a retainer-based agency</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span>a software tool your team has to operate</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span>a broker taking a cut while you carry the downside</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Epic is:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>a Zero-Risk Global Commerce Operator</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>we buy the inventory, run the system, fund growth, and align our success with yours</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-xl rounded-xl p-8 border border-cyan-500/20 text-center">
          <p className="text-cyan-400 font-bold text-2xl">
            We buy it. You profit.™
          </p>
        </div>
      </section>
    </div>
  ),

  'epic-operational-process': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">How Epic Operates Marketplace Growth End to End</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic Global Inc. is a wholesale trade partner. We buy your inventory upfront at an agreed wholesale price, operate marketplace storefronts end to end, pay for the advertising, marketplace fees and fulfillment, and protect brand equity. We own the inventory, so the retail execution risk is ours, and you keep your brand.
        </p>
        <p className="text-cyan-400/80 font-medium">
          We buy it. You profit.™
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">The Four-Phase Operational Model</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Our operational process follows a proven four-phase framework: Assess → Build → Execute → Scale. Each phase is designed to create a repeatable, scalable system that delivers predictable outcomes across marketplaces and regions.
        </p>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl font-bold text-cyan-500/30">01</div>
              <div>
                <h3 className="text-2xl font-semibold mb-1 text-white">Assess</h3>
                <p className="text-sm text-cyan-400/70 mb-3">Intake + Baseline (1-2 weeks)</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We analyze your current state, catalog structure, and performance baseline to identify quick wins and structural gaps.
                </p>
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Activities</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Current state inventory and baseline metrics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">SKU-level catalog structure and category mapping</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Listing quality and content assessment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Competitive positioning analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Marketplace requirements and documentation gaps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl font-bold text-cyan-500/30">02</div>
              <div>
                <h3 className="text-2xl font-semibold mb-1 text-white">Build</h3>
                <p className="text-sm text-cyan-400/70 mb-3">Rules, Workflows, Tooling (2-4 weeks)</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We establish the operating system: rules, workflows, reporting structure, and automation. This is the foundation for repeatable execution.
                </p>
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Activities</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Listing standards and content templates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Pricing rules and margin controls</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Advertising campaign architecture</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Inventory allocation and forecasting models</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Marketplace policy workflows and documentation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Reporting dashboards and alert systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl font-bold text-cyan-500/30">03</div>
              <div>
                <h3 className="text-2xl font-semibold mb-1 text-white">Execute</h3>
                <p className="text-sm text-cyan-400/70 mb-3">Weekly Operating Cadence (Ongoing)</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We run the work week over week: listings, ads, inventory, catalog health. Every cycle is tracked, measured, and refined.
                </p>
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Activities</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Weekly listing updates and optimization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Ad campaign monitoring and adjustments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Inventory health checks and reorder triggers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Brand protection monitoring and enforcement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Performance reporting and stakeholder updates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Continuous improvement cycles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl font-bold text-cyan-500/30">04</div>
              <div>
                <h3 className="text-2xl font-semibold mb-1 text-white">Scale</h3>
                <p className="text-sm text-cyan-400/70 mb-3">Replicate Across Regions (4-8 weeks per marketplace)</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Once the system is proven, we replicate it across new marketplaces and regions using the same operational framework.
                </p>
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Activities</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Market selection and prioritization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Marketplace setup and account configuration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Catalog deployment and adaptation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Phased rollout and launch sequencing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Region-specific performance tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">Cross-region learnings and optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">What We Need From You</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          To get started, we'll need access to four key areas to properly assess and begin operations:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Product data and SKU list</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Complete SKU catalog with attributes, dimensions, and product details
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Asset library access</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Images, packaging designs, labels, and compliance documentation
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Market/region priorities</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Target marketplaces and countries in order of priority, plus countries where your products are already registered
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Constraints</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pricing floors, inventory limits, compliance requirements, and brand guidelines
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-r from-cyan-950/20 to-cyan-900/10 rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">Pre-assessment checklist</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Trademark status in target markets (Yes/No/In progress)</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Region-ready packaging/labels (Yes/No/In progress)</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Inventory readiness by region (Yes/No/In progress)</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Current fulfillment model clarity (FBA/FBM/3PL/Other)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/knowledge-base/how-our-model-works" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">How Our Model Works</h3>
            <p className="text-sm text-gray-400">Understanding the Buy–Sell–Advertise–Protect framework</p>
          </a>
          <a href="/knowledge-base/who-we-are-fit-for" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h3 className="font-semibold text-cyan-400 mb-1">Who We're a Fit For</h3>
            <p className="text-sm text-gray-400">Brand criteria and requirements</p>
          </a>
        </div>
      </section>
    </div>
  ),
  'ad-account-rebuild-checklist': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"The Ad Account Rebuild Checklist is a step-by-step plan for replacing a disorganized marketplace advertising account with a clean "}<Link href="/knowledge-base/campaign-structure-playbook" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"campaign structure"}</Link>{", without losing the sales and keyword data the old account built up. Use it when the account has too many overlapping campaigns to manage, spend is rising faster than sales, nobody can explain why a campaign exists, or a new team is taking over."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"The examples use Amazon Ads terms (Sponsored Products, Sponsored Brands, Sponsored Display). The same steps apply to Walmart Connect and other marketplace ad platforms."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"When does an account need a rebuild instead of a tune-up?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"The same keyword is targeted in several campaigns, so you bid against yourself."}</li><li>{"Campaigns mix many unrelated products, so you cannot see which product a sale came from."}</li><li>{"There are no consistent naming conventions, portfolios or negative keyword lists."}</li><li>{"Budgets run out early in the day on some campaigns while others barely spend."}</li><li>{"Total advertising cost of sales (TACoS) is rising while organic sales are flat."}</li></ul>
        <p className="text-gray-300 leading-relaxed mb-4">{"If only one or two of these apply, fix them in place. If most apply, rebuild."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do I rebuild without losing sales?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Never pause the old account all at once. Old campaigns hold keyword history and steady sales. Build the new structure alongside, move proven keywords across, add negatives to the old campaigns so the two do not compete, and wind the old campaigns down only after the new ones are carrying the volume."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The checklist"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Phase 1: Audit (before changing anything)"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Export at least 60 to 90 days of campaign, ad group, targeting and search term reports, if available."}</li><li>{"Record baseline numbers: ad spend, ad sales, ACoS, TACoS, conversion rate, total sales, by product."}</li><li>{"List every search term that produced orders, with its spend, orders and ACoS."}</li><li>{"List every search term that spent money with zero orders over a meaningful number of clicks."}</li><li>{"Find duplicate targeting: the same keyword and match type in more than one campaign."}</li><li>{"Note bidding strategies and placement adjustments on each campaign."}</li><li>{"Check listing health on advertised products. Ads cannot fix a suppressed, out-of-stock or weak listing (run the Listing QA Checklist first)."}</li><li>{"Agree goals by product: launch, grow, defend or profit. Each needs a different target ACoS."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Phase 2: Design the new structure"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Create portfolios by brand, product line or goal so budgets can be managed in groups."}</li><li>{"Write a naming convention and use it everywhere, for example: Marketplace | Ad type | Product or group | Targeting | Match type | Goal."}</li><li>{"Separate campaigns by purpose, using the table below."}</li><li>{"Group only closely related products (same product, its variations) in one ad group."}</li><li>{"Build a shared negative keyword list (irrelevant terms, wrong product types)."}</li><li>{"Pick a bidding strategy per campaign: dynamic bids down only is the usual cautious start; up and down for proven exact-match winners."}</li><li>{"Set budgets by goal, not evenly."}</li></ul>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Campaign type"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Purpose"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Targeting"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Brand defense"}</td><td className="py-3 pr-4 align-top">{"Hold your own brand searches and product pages"}</td><td className="py-3 pr-4 align-top">{"Exact brand terms; your own ASINs"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Core performance"}</td><td className="py-3 pr-4 align-top">{"Scale proven converting terms"}</td><td className="py-3 pr-4 align-top">{"Exact match on harvested winners"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Discovery"}</td><td className="py-3 pr-4 align-top">{"Find new converting search terms"}</td><td className="py-3 pr-4 align-top">{"Auto, broad and phrase match"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Product targeting"}</td><td className="py-3 pr-4 align-top">{"Show up on related and competitor product pages"}</td><td className="py-3 pr-4 align-top">{"ASIN and category targets"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Upper funnel (later)"}</td><td className="py-3 pr-4 align-top">{"Brand awareness and remarketing"}</td><td className="py-3 pr-4 align-top">{"Sponsored Brands, Sponsored Display"}</td></tr></tbody></table></div>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Phase 3: Migrate in stages"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Launch brand defense and core performance campaigns first, using the proven search terms from the audit."}</li><li>{"Start new bids near the old effective cost per click, not far above it."}</li><li>{"Add each migrated keyword as a negative exact in the old campaign that held it, so the two do not compete."}</li><li>{"Launch discovery campaigns with negatives for every term already in core campaigns."}</li><li>{"Reduce old campaign budgets step by step as new campaigns pick up volume."}</li><li>{"Archive (do not delete) old campaigns once their spend is near zero, to keep history."}</li><li>{"Log every change with a date so you can link results to actions."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Phase 4: Stabilize and test"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Leave new campaigns mostly alone for the first one to two weeks while data builds. Amazon's attribution window means recent sales keep updating for several days."}</li><li>{"Weekly: harvest converting search terms from discovery into core exact match."}</li><li>{"Weekly: add negatives for search terms with spend and no orders."}</li><li>{"Weekly: adjust bids toward each campaign's target ACoS."}</li><li>{"Test one variable at a time (bid strategy, placement adjustment, new ad format) and record the result."}</li><li>{"Compare against the Phase 1 baseline after four to eight weeks, looking at TACoS and total sales, not ad sales alone."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Rebuild tracker"}</h3>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Item"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Baseline (before)"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Target"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Week 2"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Week 4"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Week 8"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Ad spend"}</td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Ad sales"}</td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"ACoS"}</td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"TACoS"}</td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Total sales"}</td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Conversion rate"}</td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td><td className="py-3 pr-4 align-top"></td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic is a wholesale trade partner, so it is not paid to manage ads. It buys a brand's inventory upfront, sells it at retail, and pays for the advertising itself, along with marketplace fees and fulfillment. Every wasted ad dollar comes out of Epic's own margin, which is why Epic builds clean, measurable campaign structures and judges them on total profitable sales rather than ad spend."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"That is the difference from a fee-based model: there are no retainers, hourly fees or percentage-of-spend charges, so there is no incentive to spend more than the sales justify."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Will a rebuild cause a drop in sales?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"It can if old campaigns are paused before new ones carry the volume. A staged migration, with negatives added to old campaigns as keywords move, limits that risk."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How long does an ad account rebuild take?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Audit and design usually fit in one to two weeks; migration and stabilization take several more weeks. Judge results after four to eight weeks of clean data."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should I delete old campaigns?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"No. Archive them. Archived campaigns keep their reporting history, which helps when you compare results later."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is the difference between ACoS and TACoS?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4"><Link href="/knowledge-base/kpi-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"ACoS"}</Link>{" is ad spend divided by ad-attributed sales. TACoS is ad spend divided by total sales, including organic. TACoS shows whether advertising is lifting the whole business."}</p>
      </section>
    </div>
  ),
  'amazon-marketplace-glossary': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"This glossary defines the Amazon, Walmart, TikTok Shop and wholesale terms brand owners run into when they sell through online marketplaces, in one or two plain sentences each. Where it matters, we also say how Epic Global Inc., a wholesale trade partner that buys a brand's inventory and sells it on marketplaces, handles that term in practice."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"1P (First Party)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"1P means the brand sells its products to Amazon as a supplier, and Amazon resells them to shoppers and controls the retail price. Brands manage a 1P relationship through Vendor Central. Epic itself buys inventory and sells it on the marketplace rather than selling to Amazon as a vendor."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"3P (Third Party)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"3P means an independent seller lists products on Amazon's marketplace, sets its own prices and pays Amazon fees on each sale. Sellers manage 3P accounts through Seller Central. Epic buys a brand's inventory at wholesale and sells it at retail as a marketplace seller, paying the fees, advertising and fulfillment itself."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"A+ Content"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A+ Content is the enhanced section of an Amazon product page with images, comparison charts and brand copy below the main listing. It is available to brand owners enrolled in Brand Registry (and to vendors) and can lift conversion when done well."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"ACoS (Advertising Cost of Sale)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Ad spend divided by the sales the ads are credited with, shown as a percentage. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Affiliates and Creators"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Affiliates and creators are publishers, influencers and video creators who promote products and earn a commission on the sales they drive. Common programs include Amazon Associates, Amazon Influencer, and the TikTok Shop affiliate program."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Agency"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An agency is a service firm a brand pays (through retainers, hourly fees or a percentage of sales) to run its marketplace accounts, ads or creative. The brand still owns the inventory, pays the ad spend and fees, and carries the risk if products don't sell. Epic is not an agency. It does not charge retainers or hourly fees; it earns its margin by buying inventory at wholesale and selling it at retail."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Aggregator"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An aggregator is a company that buys Amazon brands outright, taking ownership or equity in the business itself, and runs them as part of a portfolio. The founder sells the company and usually exits. Epic does not buy brands or take equity. The brand stays with its owner; Epic buys the products, not the company."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"ASIN (Amazon Standard Identification Number)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An ASIN is the 10-character ID Amazon assigns to each product in its catalog. Every seller offering the same product shares the same ASIN and competes for the Buy Box on it."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Authorized Seller"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An authorized seller is a reseller the brand has formally approved, usually in writing, to sell its products on a given channel or marketplace. Authorization is what lets a brand tell "}<Link href="/knowledge-base/unauthorized-seller-monitoring-workflow" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"unauthorized sellers"}</Link>{" apart and act against them. Epic operates as an authorized seller for the brands it buys from and works to keep the marketplace limited to authorized sellers, usually as the exclusive authorized seller on the marketplaces and countries named in its agreement with the brand."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Brand Registry"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Amazon Brand Registry is a free program for brand owners with a registered or pending trademark. It gives the brand more control over its listings plus access to tools such as A+ Content, Brand Stores, Sponsored Brands and the brand protection reporting tools. Check Amazon's current eligibility rules before enrolling. The brand keeps ownership of its Brand Registry and authorizes Epic in it, so Epic can manage the listings and act against unauthorized sellers."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Brand Store"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A Brand Store is a free, multi-page storefront on Amazon with its own URL, available to Brand Registry brands. It showcases the full product line and can be the landing page for Sponsored Brands ads."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Buy Box (Featured Offer)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The Buy Box is the \"Add to Cart\" and \"Buy Now\" area on an Amazon product page, and the seller who wins it gets most of that page's sales. Amazon awards it based on factors like price, fulfillment, delivery speed and seller performance. The share of time you hold it is Buy Box %; see Epic's KPI Glossary. Enforcing MAP and removing unauthorized sellers keeps the Buy Box from being won by off-price or gray-market offers."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Consignment"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Consignment is an arrangement where a retailer or seller lists a brand's goods but only pays the brand after they sell; the brand owns the stock until then and carries the risk of unsold inventory. In Epic's standard model, Epic buys the inventory upfront, so the brand is paid for the goods on agreed payment terms rather than waiting on sell-through."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Contribution Margin"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Revenue left after product cost, marketplace fees, fulfillment and advertising; the clearest single measure of whether a product line is profitable. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Conversion Rate (CVR)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The share of visits or clicks that become orders. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"CTR (Click-Through Rate)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Clicks divided by impressions; how often shoppers click when they see your listing or ad. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Distributor"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A distributor buys inventory from a brand at wholesale and resells it to retailers and other businesses, often across a region or channel. A traditional distributor moves product to other sellers; it usually doesn't run the consumer-facing listings, advertising and brand protection on a marketplace."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Dropshipping"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Dropshipping is a model where the seller lists products it does not hold, and the supplier ships each order directly to the customer. The seller never stocks or pays for inventory in advance. Epic does not dropship. It buys and holds the inventory it sells."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"DSP (Amazon Demand-Side Platform)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Amazon DSP lets advertisers buy display, video and streaming ads programmatically, on and off Amazon, using Amazon's shopper data for targeting. It is typically used for awareness and retargeting rather than search-intent sales."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"FBA (Fulfillment by Amazon)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"With FBA, a seller ships inventory to Amazon's warehouses, and Amazon stores, picks, packs, ships and handles returns and customer service for those orders for a fee. FBA offers usually qualify for Prime. Epic pays fulfillment costs itself, so FBA fees are not billed to the brand. Epic uses both FBA and FBM, mostly FBA, and ships FBM orders from its own US warehouse."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"FBM (Fulfilled by Merchant)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"With FBM, the seller lists on Amazon but stores and ships orders itself or through its own third-party logistics provider. It gives more control over inventory but the seller must meet Amazon's shipping performance standards."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Gating and Ungating"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Gating is Amazon's restriction on selling certain categories, brands or products without approval. Ungating is getting that approval, often by submitting invoices from an authorized supplier, certifications or a brand's authorization letter. Requirements vary by category, so check Seller Central for the current rules."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Gray Market"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Gray-market goods are genuine products sold through channels the brand did not authorize, often diverted from other regions, retailers or liquidation. They are not counterfeit, but they can undercut pricing, confuse customers and fall outside the brand's warranty or quality control. Epic's brand protection work monitors for unauthorized offers and works to remove them."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"GTIN, UPC and EAN"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A GTIN (Global Trade Item Number) is the standard barcode number that identifies a product worldwide; the UPC (12 digits, common in the US) and EAN (13 digits, common in Europe) are types of GTIN. Amazon and Walmart generally require a valid GTIN from GS1 to create a new listing, though exemptions exist in some cases."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Importer of Record (IOR)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The importer of record is the party legally responsible for bringing goods into a country: filing customs entries, paying duties and taxes, and making sure products meet local rules. On international marketplaces, someone in the chain must take on this role."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"IPI (Inventory Performance Index)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"IPI is Amazon's score for how well a seller manages FBA inventory, based on factors like excess stock, sell-through and stranded inventory. A low score can bring storage limits or extra fees. Check Seller Central for the current threshold and how Amazon applies it."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Landed Cost"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Landed cost is the total cost of getting a product to the point of sale: the unit price plus freight, insurance, duties, taxes, customs fees and handling. It is the real cost basis for pricing and margin, especially when selling internationally."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"MAP (Minimum Advertised Price)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"MAP is the lowest price a brand allows resellers to advertise for its products, set out in a written MAP policy. It protects brand value and keeps resellers from racing each other to the bottom on price. Epic sells at or above MAP and enforces it as part of its brand protection work, one of the four pillars of its Buy-Sell-Advertise-Protect model."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Marketplace Operator"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A marketplace operator is a company that runs the day-to-day selling on online marketplaces: listings, pricing, advertising, inventory and customer service. The term describes what a company does, not how it is paid, so an operator can be a seller that owns the inventory or a service provider. Epic is a marketplace operator that owns the inventory it sells, on Amazon, Walmart, eBay, TikTok Shop and other marketplaces."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Multichannel Fulfillment (MCF)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Multichannel fulfillment is using one inventory pool to ship orders from several sales channels. Amazon MCF, for example, lets sellers ship orders from Shopify, Walmart or their own site using inventory stored in FBA. Some marketplaces restrict Amazon-branded packaging or delivery, so check each channel's rules."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Net Terms"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Net terms are payment terms that give a buyer a set number of days to pay an invoice. They are common in wholesale and affect a brand's cash flow. Epic pays for the inventory it buys on payment terms agreed in each supply agreement."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Parent and Child Variations"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A variation family groups versions of one product, such as sizes or colors, on a single Amazon listing. The parent is a non-buyable placeholder; each child is a buyable ASIN with its own price and inventory, and children share reviews."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Private Label"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Private label means a seller has products made by a manufacturer and sells them under its own brand. The seller owns the brand and listing, as opposed to reselling another company's brand."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Project Zero"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Project Zero is an Amazon program that lets eligible brands remove counterfeit listings themselves, without filing a report and waiting for Amazon. It also offers optional unique product serialization. Check Amazon's current eligibility rules."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Removal Order"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A removal order is a request to have Amazon return or dispose of inventory stored in its FBA warehouses. Sellers use them to clear aged, excess or unsellable stock, and Amazon charges a per-unit fee."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Retail Arbitrage"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Retail arbitrage is buying products at a discount from retail stores or clearance sales and reselling them on a marketplace for a profit. These sellers usually aren't authorized by the brand and can disrupt pricing."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"ROAS (Return on Ad Spend)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Ad-attributed sales divided by ad spend; the inverse of "}<Link href="/knowledge-base/kpi-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"ACoS"}</Link>{". See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Seller Central"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Seller Central is Amazon's portal for third-party (3P) sellers to manage listings, pricing, inventory, orders, advertising and account health. Sellers pay Amazon fees and set their own prices."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Sell-Through Rate"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The share of available inventory sold during a period. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"SFP (Seller Fulfilled Prime)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Seller Fulfilled Prime lets a seller ship orders from its own warehouse while still showing the Prime badge, as long as it meets Amazon's strict delivery speed and performance standards. Check Amazon for current enrollment status and requirements."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Shopify"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Shopify is a platform brands use to run their own online store. Unlike a marketplace, the store owner controls the customer relationship and data but must bring its own traffic."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Sponsored Brands"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Sponsored Brands are Amazon ads that show a brand's logo, headline and several products (or a video) at the top of and within search results. They require Brand Registry. Epic pays for advertising itself, including Amazon ad campaigns, as part of the Buy-Sell-Advertise-Protect model."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Sponsored Display"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Sponsored Display ads target shoppers by product, category or audience, and appear on and off Amazon, including on competitor product pages. They are often used for retargeting."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Sponsored Products"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Sponsored Products are cost-per-click Amazon ads for individual listings that appear in search results and on product pages. They are usually the largest share of an Amazon ad budget. Epic funds the ad spend; the brand does not pay for clicks."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Stranded Inventory"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Stranded inventory is stock sitting in an Amazon warehouse with no active, buyable listing attached, often because a listing was suppressed or closed. It still incurs storage fees until it is fixed or removed."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"TACoS (Total Advertising Cost of Sale)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Ad spend divided by total sales, ad and organic; shows whether advertising is growing the whole business. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"TikTok Shop"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"TikTok Shop is TikTok's in-app marketplace, where shoppers buy directly from videos, live streams and product showcases. Sales are driven heavily by creators and affiliates. TikTok Shop is one of the marketplaces where Epic sells the inventory it buys from brands."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Transparency"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Transparency is Amazon's product serialization program: brands put a unique code on each unit, and Amazon checks the code before shipping so counterfeit units are stopped. Shoppers can also scan the code to verify a product."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Unauthorized Seller"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An unauthorized seller is anyone selling a brand's products without the brand's approval, often below MAP and sometimes with old, damaged or diverted stock. They can take the Buy Box, erode price and hurt reviews. Removing unauthorized sellers is part of Epic's brand protection work."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"VAT (Value-Added Tax)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"VAT is a consumption tax charged at each stage of sale in the UK, the EU and many other countries. Selling there usually requires VAT registration and regular filings, and marketplaces may collect VAT on some sales. Rules vary by country and seller location."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Vendor Central"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Vendor Central is Amazon's portal for 1P suppliers that sell wholesale to Amazon. Amazon issues purchase orders, owns the inventory and sets the retail price."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Walmart Marketplace"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Walmart Marketplace lets approved third-party sellers list products on Walmart.com alongside Walmart's own inventory. Sellers apply for approval and pay a referral fee on each sale; check Walmart's current requirements and fees. Walmart is one of the marketplaces where Epic sells the inventory it buys from brands."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Weeks of Cover (WOC)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"How many weeks current inventory will last at the current sales rate. See Epic's KPI Glossary."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"WFS (Walmart Fulfillment Services)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"WFS is Walmart's fulfillment program, similar to FBA: sellers send inventory to Walmart warehouses, and Walmart ships orders and handles returns. WFS items can earn fast-shipping badges on Walmart.com."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Wholesale"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Wholesale is selling products in bulk to a business that resells them, at a price below retail. The buyer owns the goods once purchased and takes on the risk of selling them."}</p>
        <h2 className="text-xl font-semibold mb-3 text-white">{"Wholesale Trade Partner"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A wholesale trade partner buys a brand's inventory upfront at wholesale and sells it directly to consumers on online marketplaces, paying for the advertising, marketplace fees and fulfillment itself. The brand keeps its company and gets paid for its products, while the partner earns its margin only by selling them at retail. This is Epic's model: Epic buys the inventory upfront and funds the ads, fees and fulfillment."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How the four models compare"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Model"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Who owns the inventory"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Who pays ads and fees"}</th><th className="pb-3 pr-4 text-white font-semibold">{"How it gets paid"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Owns your company?"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Agency"}</td><td className="py-3 pr-4 align-top">{"The brand"}</td><td className="py-3 pr-4 align-top">{"The brand"}</td><td className="py-3 pr-4 align-top">{"Retainers, hourly or service fees, or a percentage of sales"}</td><td className="py-3 pr-4 align-top">{"No"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Aggregator"}</td><td className="py-3 pr-4 align-top">{"The aggregator, after buying the business"}</td><td className="py-3 pr-4 align-top">{"The aggregator"}</td><td className="py-3 pr-4 align-top">{"Profits of the brands it owns"}</td><td className="py-3 pr-4 align-top">{"Yes, it buys the company"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Distributor"}</td><td className="py-3 pr-4 align-top">{"The distributor"}</td><td className="py-3 pr-4 align-top">{"Usually the retailers it sells to"}</td><td className="py-3 pr-4 align-top">{"Margin on reselling to other businesses"}</td><td className="py-3 pr-4 align-top">{"No"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Wholesale trade partner (Epic)"}</td><td className="py-3 pr-4 align-top">{"The partner"}</td><td className="py-3 pr-4 align-top">{"The partner"}</td><td className="py-3 pr-4 align-top">{"Margin on selling to consumers at retail"}</td><td className="py-3 pr-4 align-top">{"No"}</td></tr></tbody></table></div>
      </section>
    </div>
  ),
  'brand-protection-escalation-template': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"The Brand Protection Escalation Template is a standard way to record evidence of a marketplace violation and move it up a fixed ladder: monitor, test buy, marketplace report, seller contact, and legal action. Use it whenever an unknown seller, a suspected counterfeit, a hijacked listing or a pricing violation appears, so every case is documented the same way and marketplaces and lawyers get the evidence they need."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What can a marketplace actually remove?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Knowing this first saves time and protects your account. Marketplace brand programs such as Amazon Brand Registry act on intellectual property violations. They generally do not remove a seller just for selling genuine products, or for selling below your MAP."}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Violation"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Removable through a marketplace IP report?"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Main route"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Counterfeit product"}</td><td className="py-3 pr-4 align-top">{"Yes, with evidence"}</td><td className="py-3 pr-4 align-top">{"Test buy, then Brand Registry counterfeit report"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Trademark misuse (logo or brand name used without permission)"}</td><td className="py-3 pr-4 align-top">{"Yes"}</td><td className="py-3 pr-4 align-top">{"Brand Registry trademark report"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Copied images or text"}</td><td className="py-3 pr-4 align-top">{"Yes"}</td><td className="py-3 pr-4 align-top">{"Brand Registry copyright report"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Patent infringement"}</td><td className="py-3 pr-4 align-top">{"Yes, case by case"}</td><td className="py-3 pr-4 align-top">{"Brand Registry patent report (Amazon also offers a patent evaluation process for utility patents)"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Listing hijack (wrong content or images on your listing)"}</td><td className="py-3 pr-4 align-top">{"Usually fixable"}</td><td className="py-3 pr-4 align-top">{"Brand Registry listing correction / catalog support case"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Genuine product sold by an unauthorized reseller"}</td><td className="py-3 pr-4 align-top">{"Generally no"}</td><td className="py-3 pr-4 align-top">{"Distribution controls, seller contact, legal review (for example, a \"materially different\" product claim if warranty, packaging or quality differs)"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Price below MAP"}</td><td className="py-3 pr-4 align-top">{"No, marketplaces do not enforce MAP"}</td><td className="py-3 pr-4 align-top">{"MAP policy enforcement through the supply chain"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Important:"}</strong>{" Never file a counterfeit or IP report against a seller you only know is unauthorized. False reports can lead the marketplace to restrict the brand's own reporting privileges or Brand Registry access."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do I use this template?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li>{"Open one case per seller per marketplace."}</li><li>{"Fill the evidence log every time you observe the seller. Screenshots must show the date, URL and seller name."}</li><li>{"Move up the escalation ladder one step at a time, recording the date and outcome of each step."}</li><li>{"Close the case only when the seller has been gone for several weekly checks in a row."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The template"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Part 1: Case header"}</h3>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Field"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Entry"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Case ID"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Marketplace and country"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Seller name and seller ID"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Storefront URL"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Affected ASINs / item IDs"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Violation type (see table above)"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Date first seen"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Case owner"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Current escalation step"}</td><td className="py-3 pr-4 align-top">{"Fill in"}</td></tr></tbody></table></div>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Part 2: Evidence log"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Add one row each time you observe the seller."}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Date"}</th><th className="pb-3 pr-4 text-white font-semibold">{"ASIN / item"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Observed price"}</th><th className="pb-3 pr-4 text-white font-semibold">{"MAP"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Condition listed"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Fulfillment (FBA / merchant)"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Evidence file (screenshot, order, photo)"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Notes"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Date observed"}</td><td className="py-3 pr-4 align-top">{"ASIN or item ID"}</td><td className="py-3 pr-4 align-top">{"Price seen"}</td><td className="py-3 pr-4 align-top">{"Your MAP"}</td><td className="py-3 pr-4 align-top">{"New, used or other"}</td><td className="py-3 pr-4 align-top">{"FBA or merchant"}</td><td className="py-3 pr-4 align-top">{"File name or link"}</td><td className="py-3 pr-4 align-top">{"What stood out"}</td></tr></tbody></table></div>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Part 3: Test buy record"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Order number, date and price paid recorded."}</li><li>{"Unboxing photographed: shipping label, packaging, product, lot or batch codes, serial numbers."}</li><li>{"Side-by-side comparison with a genuine unit (packaging, labels, materials, codes, inserts, warranty card)."}</li><li>{"Written finding from someone who knows the genuine product: genuine, counterfeit, or genuine but materially different."}</li><li>{"If genuine: lot or batch code traced back to the distributor or retailer that leaked it, if possible."}</li><li>{"Physical unit kept and stored as evidence."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Part 4: Escalation ladder"}</h3>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Step"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Action"}</th><th className="pb-3 pr-4 text-white font-semibold">{"When to use"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"1. Monitor"}</td><td className="py-3 pr-4 align-top">{"Log seller weekly; capture screenshots"}</td><td className="py-3 pr-4 align-top">{"Any new or unknown seller"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"2. Test buy"}</td><td className="py-3 pr-4 align-top">{"Buy from the seller and inspect (Part 3)"}</td><td className="py-3 pr-4 align-top">{"Seller persists, or pricing or reviews suggest counterfeit"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"3. Marketplace report"}</td><td className="py-3 pr-4 align-top">{"File the correct IP report in Brand Registry (or Walmart Brand Portal, eBay VeRO) with test buy evidence"}</td><td className="py-3 pr-4 align-top">{"Counterfeit, trademark, copyright or patent violation confirmed"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"4. Listing correction"}</td><td className="py-3 pr-4 align-top">{"Restore correct content through Brand Registry / catalog support"}</td><td className="py-3 pr-4 align-top">{"Listing content or images changed"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"5. Supply chain action"}</td><td className="py-3 pr-4 align-top">{"Trace the source; enforce distributor agreements and MAP policy"}</td><td className="py-3 pr-4 align-top">{"Genuine goods from a leaking distributor or retailer"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"6. Seller contact / cease and desist"}</td><td className="py-3 pr-4 align-top">{"Letter from counsel, citing the specific legal basis"}</td><td className="py-3 pr-4 align-top">{"Unauthorized seller of materially different goods, or repeat violator"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"7. Legal action"}</td><td className="py-3 pr-4 align-top">{"Counsel decides on further steps"}</td><td className="py-3 pr-4 align-top">{"Counterfeiting at scale or ignored cease and desist"}</td></tr></tbody></table></div>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Part 5: Report submission checklist"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Correct violation type chosen (counterfeit, trademark, copyright, patent)."}</li><li>{"Registered trademark or IP number listed."}</li><li>{"Every affected ASIN / item ID included."}</li><li>{"Test buy order number included for counterfeit reports."}</li><li>{"Clear, factual description of how the product differs from genuine."}</li><li>{"Report ID recorded and follow-up date set."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic is a wholesale trade partner: it buys the brand's inventory upfront and sells it at retail, so "}<Link href="/knowledge-base/unauthorized-seller-monitoring-workflow" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"unauthorized sellers"}</Link>{" and price undercutting hit Epic's own sales directly. Epic's brand protection work covers the monitoring, MAP enforcement and unauthorized seller removal described in this template as part of its model. Epic works through the brand's Brand Registry, which the brand authorizes Epic to use."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Can Amazon remove a seller who sells my genuine product?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Generally not through an IP report, because reselling genuine goods is usually lawful. Control it upstream through distribution agreements and MAP policy, and get legal advice about whether the goods are materially different."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Why do I need a test buy before reporting a counterfeit?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Marketplaces expect evidence that the specific seller's product is fake. A test buy with photos and an order number gives them that, and protects you from filing an inaccurate report."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Does Amazon enforce my MAP policy?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"No. MAP is a policy between a brand and its resellers. Enforcement happens through your supply chain agreements, not marketplace reports."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What other marketplace programs exist besides Brand Registry?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Walmart has its Brand Portal for IP claims, and eBay has the VeRO program. Amazon also offers Transparency (unit-level codes) and Project Zero for eligible brands."}</p>
      </section>
    </div>
  ),
  'campaign-structure-playbook': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"A good baseline Amazon ads structure separates campaigns by objective (discovery, performance, brand defense and competitor conquest), by match type, and by product priority, so each campaign has one job and its own budget. That separation lets you read the data cleanly, move budget to what works, and stop spend on what doesn't without affecting everything else."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"This playbook covers Sponsored Products first, since that is where most spend sits for most brands, then adds Sponsored Brands and Sponsored Display. The same logic works on Walmart Connect, with different names for some settings."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Why does campaign structure matter?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Amazon sets budgets and bidding strategies at the campaign level and reports at the campaign, ad group, target and "}<Link href="/knowledge-base/search-term-harvesting-playbook" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"search term"}</Link>{" levels. If one campaign mixes auto targeting, broad keywords, exact keywords and ten unrelated products, you cannot tell which part is working, and your best keywords compete with your worst ones for the same budget. Structure is what makes the account readable."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What does a baseline structure look like?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Campaign type"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Objective"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Targeting"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Typical bidding"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"SP Auto"}</td><td className="py-3 pr-4 align-top">{"Discovery: find new search terms and ASINs"}</td><td className="py-3 pr-4 align-top">{"Automatic (close match, loose match, substitutes, complements)"}</td><td className="py-3 pr-4 align-top">{"Dynamic down only, modest bids"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"SP Broad / Phrase"}</td><td className="py-3 pr-4 align-top">{"Discovery with more control"}</td><td className="py-3 pr-4 align-top">{"Broad and phrase keywords from research"}</td><td className="py-3 pr-4 align-top">{"Dynamic down only"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"SP Exact (performance)"}</td><td className="py-3 pr-4 align-top">{"Scale proven converters"}</td><td className="py-3 pr-4 align-top">{"Exact keywords harvested from discovery"}</td><td className="py-3 pr-4 align-top">{"Down only, or up and down for top terms"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"SP Brand defense"}</td><td className="py-3 pr-4 align-top">{"Protect branded searches"}</td><td className="py-3 pr-4 align-top">{"Exact match on brand terms"}</td><td className="py-3 pr-4 align-top">{"Down only; low cost per click expected"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"SP Product targeting"}</td><td className="py-3 pr-4 align-top">{"Show on competitor and complementary pages"}</td><td className="py-3 pr-4 align-top">{"ASIN and category targets"}</td><td className="py-3 pr-4 align-top">{"Down only"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Sponsored Brands"}</td><td className="py-3 pr-4 align-top">{"Top-of-search brand presence, video"}</td><td className="py-3 pr-4 align-top">{"Keywords or products; brand store or product collection"}</td><td className="py-3 pr-4 align-top">{"Set per campaign"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Sponsored Display"}</td><td className="py-3 pr-4 align-top">{"Retargeting and on-page placements"}</td><td className="py-3 pr-4 align-top">{"Views remarketing, product and audience targeting"}</td><td className="py-3 pr-4 align-top">{"Set per campaign"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you build it, step by step?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Rank your SKUs."}</strong>{" Sort by margin, stock depth and sales. Tier 1 products (healthy margin, deep stock, proven demand) get dedicated campaigns. Tier 2 and 3 can share campaigns by product group."}</li><li><strong className="text-white">{"Group products that share keywords."}</strong>{" One ad group should contain products a shopper would see as alternatives for the same search. Never mix a $10 item and a $90 item in one ad group with shared bids."}</li><li><strong className="text-white">{"Launch discovery campaigns."}</strong>{" One auto campaign and one broad/phrase campaign per product group."}</li><li><strong className="text-white">{"Launch exact campaigns with your known winners."}</strong>{" Start with your brand terms and any keywords you already know convert."}</li><li><strong className="text-white">{"Add negatives to separate the layers."}</strong>{" Add your exact keywords as negative exact in the discovery campaigns, so each search term is bought by one campaign on purpose."}</li><li><strong className="text-white">{"Set budgets by objective."}</strong>{" Performance and brand defense should not run out of budget. Discovery gets a fixed, smaller share. The right split depends on margin and goals, so set it from your target ACoS or TACoS."}</li><li><strong className="text-white">{"Set placement adjustments only with data."}</strong>{" After two to four weeks, compare top of search, rest of search and product page performance before raising any placement."}</li><li><strong className="text-white">{"Name everything consistently."}</strong>{" See the template below."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What naming convention should you use?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A clear name lets anyone filter the account in seconds. A simple pattern is ad type, product group or SKU, objective, targeting, and match type, separated by hyphens. Examples:"}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"SP - Protein-Vanilla - Perf - KW - Exact"}</li><li>{"SP - Protein-All - Disc - Auto"}</li><li>{"SP - Brand - Defense - KW - Exact"}</li><li>{"SB - Protein-All - Video - KW - Phrase"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Which numbers should you watch each week?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Metric"}</th><th className="pb-3 pr-4 text-white font-semibold">{"What it tells you"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"ACoS (ad spend / ad sales)"}</td><td className="py-3 pr-4 align-top">{"Efficiency of each campaign against your margin"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"TACoS (ad spend / total sales)"}</td><td className="py-3 pr-4 align-top">{"Whether ads are growing the whole business or just buying sales"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Conversion rate by target"}</td><td className="py-3 pr-4 align-top">{"Whether the keyword matches the product"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Impression share / top-of-search share"}</td><td className="py-3 pr-4 align-top">{"How much room there is to grow on a proven term"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Budget-capped hours"}</td><td className="py-3 pr-4 align-top">{"Whether good campaigns are going dark early in the day"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Spend with no sales by target"}</td><td className="py-3 pr-4 align-top">{"What to cut or negate"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Weekly maintenance checklist"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Harvest converting search terms from discovery into exact campaigns"}</li><li>{"Add non-converting terms as negatives"}</li><li>{"Adjust bids on targets above or below target ACoS"}</li><li>{"Check budget-capped campaigns; move money to proven performers"}</li><li>{"Pause ads on out-of-stock or low-stock SKUs"}</li><li>{"Confirm the advertised listings are still active and correct"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic Global Inc. is a wholesale trade partner, and under our model we pay for the advertising ourselves. We buy the brand's inventory upfront, then fund the ads, marketplace fees and fulfillment to sell it. Because the ad spend is our money and the stock is ours, campaign structure is built to protect margin and sell through inventory, not to grow billable spend. Structure is set within about 4 weeks of kickoff and managed weekly, as the \"Advertise\" pillar of Buy-Sell-Advertise-Protect. Brands get a shared dashboard from day one, monthly reports and quarterly business reviews."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How many campaigns should a brand have?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Enough that each has one objective and one budget. For a small catalog that may be under 20; for a large one, more. Fewer, cleaner campaigns beat many overlapping ones."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should auto campaigns stay on forever?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Usually yes, at modest bids. They keep finding new search terms and ASINs as shopper behavior changes."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is the difference between ACoS and TACoS?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4"><Link href="/knowledge-base/kpi-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"ACoS"}</Link>{" compares ad spend to ad-attributed sales. TACoS compares ad spend to all sales, so it shows whether ads are lifting total business."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Do I need to bid on my own brand name?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Often yes. Competitors can bid on your brand terms, and branded clicks are usually cheap and convert well."}</p>
      </section>
    </div>
  ),
  'catalog-integrity-controls': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"Catalog integrity controls are the records and routines that keep your product listings correct: an approved source of truth, a log of every change, regular checks of the live pages, and saved evidence you can show a marketplace when something is wrong. They matter because on Amazon several parties can contribute data to the same detail page, so listings can change without your team touching them, and you need proof to get them corrected quickly."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Why do listings change without your input?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An Amazon detail page is shared. Every seller of the same product sells on one page, and Amazon builds that page from multiple data sources. Brand Registry gives the brand owner more influence over what is displayed, but it does not make the page untouchable. Common causes of unwanted changes:"}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Another seller submits different data (title, images, attributes)"}</li><li>{"Amazon's systems adjust attributes or the category"}</li><li>{"A bulk upload or template error on your own side"}</li><li>{"Variation families merged or split"}</li><li>{"Deliberate abuse, such as swapped images or a hijacked listing"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What controls should you have in place?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Control"}</th><th className="pb-3 pr-4 text-white font-semibold">{"What it is"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Why it matters"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Source of truth"}</td><td className="py-3 pr-4 align-top">{"The approved title, bullets, attributes and image files for every SKU, kept outside Seller Central"}</td><td className="py-3 pr-4 align-top">{"Lets you spot drift and restore content fast"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Change log"}</td><td className="py-3 pr-4 align-top">{"Each edit with date, owner, reason, before/after and rollback step"}</td><td className="py-3 pr-4 align-top">{"Separates your changes from outside ones; explains performance shifts"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Access control"}</td><td className="py-3 pr-4 align-top">{"Named user accounts with the least permissions needed in Seller Central and Brand Registry"}</td><td className="py-3 pr-4 align-top">{"Knowing who can change what; no shared logins"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Live-page audit"}</td><td className="py-3 pr-4 align-top">{"Regular comparison of live pages with the source of truth"}</td><td className="py-3 pr-4 align-top">{"Finds unwanted changes before they cost sales"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Evidence archive"}</td><td className="py-3 pr-4 align-top">{"Dated screenshots, files and documents proving what is correct"}</td><td className="py-3 pr-4 align-top">{"Supports correction requests and violation reports"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Brand Registry enrollment"}</td><td className="py-3 pr-4 align-top">{"Registered trademark linked to the brand in Amazon Brand Registry"}</td><td className="py-3 pr-4 align-top">{"Stronger control over detail pages and access to reporting tools"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What evidence should you collect?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Marketplaces act faster on clear evidence. Keep these on file for every product:"}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Ownership proof:"}</strong>{" trademark registration numbers, Brand Registry details"}</li><li><strong className="text-white">{"Product proof:"}</strong>{" GTIN/UPC records registered to the brand, spec sheets, packaging artwork, label files"}</li><li><strong className="text-white">{"Approved content:"}</strong>{" the image files and copy as approved, with dates"}</li><li><strong className="text-white">{"Live-page snapshots:"}</strong>{" dated screenshots of each detail page after each approved change, with the URL visible"}</li><li><strong className="text-white">{"Change records:"}</strong>{" your change log, including upload confirmations"}</li><li><strong className="text-white">{"Compliance documents:"}</strong>{" safety data sheets, certificates and test reports where the category needs them"}</li></ul>
        <p className="text-gray-300 leading-relaxed mb-4">{"When an unwanted change happens, add:"}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"A screenshot of the incorrect page, with date and URL"}</li><li>{"The matching \"correct\" version from your source of truth"}</li><li>{"Any seller ID linked to the change, if visible"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you correct an unwanted change?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Confirm it is not yours."}</strong>{" Check your change log and recent uploads first."}</li><li><strong className="text-white">{"Capture the evidence."}</strong>{" Screenshot the live page and save the correct version alongside it."}</li><li><strong className="text-white">{"Resubmit the correct data."}</strong>{" Update the listing through your Brand Registry-linked account so your contribution carries the brand owner's weight."}</li><li><strong className="text-white">{"Open a case if it doesn't stick."}</strong>{" Use Seller Central or Brand Registry support, attach your evidence, and state exactly which fields are wrong and what they should be."}</li><li><strong className="text-white">{"Report abuse separately."}</strong>{" If another seller is deliberately misusing your brand content or trademark, use the Report a Violation tool in Brand Registry."}</li><li><strong className="text-white">{"Recheck and log."}</strong>{" Confirm the fix on the live page and record the case number and outcome."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Weekly integrity checklist"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Top ASINs compared with the source of truth (title, bullets, main image, key attributes)"}</li><li>{"Variation families intact"}</li><li>{"No new ASINs using your brand name that you did not create"}</li><li>{"Brand Registry alerts and Brand Dashboard reviewed"}</li><li>{"Change log up to date; every change has an owner"}</li><li>{"Open correction cases followed up"}</li><li>{"Seller Central user list reviewed; departed users removed"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic Global Inc. is a wholesale trade partner. We buy the brand's inventory upfront and pay for the ads, fees and fulfillment, so a listing that changes without notice wastes our ad spend and slows sales of stock we own. Catalog integrity sits between the \"Sell\" and \"Protect\" pillars of our Buy-Sell-Advertise-Protect model and supports our brand protection work, which enforces MAP and removes "}<Link href="/knowledge-base/unauthorized-seller-monitoring-workflow" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"unauthorized sellers"}</Link>{". Brand partners receive brand protection reports by marketplace, covering blocked listing edits and trademark takedowns."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Does Brand Registry stop other sellers from changing my listing?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"It gives the brand owner more say over what is displayed, but it does not lock the page. Monitoring is still needed."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How long should I keep evidence?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"As long as the product is sold, plus a reasonable period after. Disputes can reference old versions of a page."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is a single source of truth?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"One approved record of every listing's content kept outside the marketplace, such as a controlled spreadsheet or product information system."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Is this the same as catalog hygiene?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"They overlap. Hygiene keeps data correct and complete; integrity controls prove what is correct and defend it when it changes."}</p>
      </section>
    </div>
  ),
  'catalog-qa-checklist': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"The Catalog QA Checklist is an audit of a brand's whole marketplace catalog at once, looking for problems that only show up across many listings: suppressed or duplicate listings, broken "}<Link href="/knowledge-base/variation-strategy-basics" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"variation families"}</Link>{", inconsistent attributes, missing content and price conflicts. Use it when you take over a catalog, before a major sales event, after a large catalog upload, and on a regular schedule, because catalogs drift as marketplaces, sellers and automated systems change listing data."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How is this different from the Listing QA Checklist?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The "}<Link href="/knowledge-base/listing-qa-checklist" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"Listing QA"}</Link>{" Checklist checks one listing in depth before it goes live: title, bullets, images, keywords. This checklist works at catalog level. It asks whether the full set of listings is complete, consistent and under the brand's control. Run the Listing QA Checklist on any individual listing this audit flags."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do I run a catalog audit?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Export the catalog."}</strong>{" Pull a full listings report from each marketplace (on Amazon, an All Listings report plus the Category Listings report or a flat-file export), along with suppressed and inactive listings reports."}</li><li><strong className="text-white">{"Build one master sheet."}</strong>{" One row per SKU and marketplace, with ASIN or item ID, parent, status, price, inventory and key attributes."}</li><li><strong className="text-white">{"Work section by section"}</strong>{" through the checklist below, logging each issue with its SKU, severity and owner."}</li><li><strong className="text-white">{"Fix in severity order."}</strong>{" Anything stopping a product from being bought comes first; content improvements come last."}</li><li><strong className="text-white">{"Re-export and confirm."}</strong>{" Marketplaces can take time to reflect changes, and some edits get overwritten by other contributors. Check again after fixes are submitted."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How should I rank what I find?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Severity"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Meaning"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Examples"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"1. Blocking"}</td><td className="py-3 pr-4 align-top">{"Product cannot be bought or found"}</td><td className="py-3 pr-4 align-top">{"Suppressed listing, stranded inventory, missing Buy Box, wrong category gating"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"2. Revenue leak"}</td><td className="py-3 pr-4 align-top">{"Product sells less than it should"}</td><td className="py-3 pr-4 align-top">{"Split reviews from broken variations, duplicate listings, wrong browse node, out of stock"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"3. Quality"}</td><td className="py-3 pr-4 align-top">{"Weak or inconsistent content"}</td><td className="py-3 pr-4 align-top">{"Missing A+ content, low image count, incomplete attributes"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The checklist"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"1. Listing status and availability"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Every active SKU is live and buyable on every intended marketplace."}</li><li>{"No suppressed or search-suppressed listings (check the suppressed listings view and the reason given for each)."}</li><li>{"No stranded inventory (units in the fulfillment network without an active offer)."}</li><li>{"Every in-stock listing holds the Featured Offer / Buy Box, or the reason it does not is known."}</li><li>{"Discontinued SKUs are closed out intentionally, not left as dead listings."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"2. Catalog structure"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"No duplicate ASINs or item pages for the same product. Duplicates split reviews and sales history and can break marketplace policy."}</li><li>{"Every variation family has one parent, correct variation themes (size, color, count) and no unrelated products merged in."}</li><li>{"No orphaned child SKUs that should be in a family."}</li><li>{"Each product sits in the most specific correct browse node / category."}</li><li>{"Bundles and multipacks have their own GTINs or exemptions and correct unit counts."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"3. Attributes and data"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Brand name is spelled identically on every listing."}</li><li>{"Required and recommended attributes are filled for each category (size, material, color, count, item weight and dimensions)."}</li><li>{"Item dimensions and weights match the real product, since they drive fulfillment fees."}</li><li>{"GTINs are valid and match the product on the page."}</li><li>{"Compliance fields are complete: safety warnings, hazmat information, country of origin, and any certifications the category needs."}</li><li>{"Contributed data has not been overwritten. Compare live listing data with the brand's master data."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"4. Images and content"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Main images follow the marketplace spec (for Amazon, pure white background, product filling most of the frame, at least 1,000 pixels on the longest side for zoom)."}</li><li>{"Every listing has a full image set: lifestyle, scale, detail and infographic images."}</li><li>{"Titles follow one consistent pattern across the catalog and stay within the marketplace's length and character rules."}</li><li>{"Bullets and descriptions are accurate, with no claims the brand cannot support (especially health, safety or \"best\" claims)."}</li><li>{"Backend search terms are filled, within the byte limit, and do not repeat brand names or words already in the title."}</li><li>{"A+ / enhanced content is published on every top-selling parent."}</li><li>{"Video is present on hero products where the marketplace supports it."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"5. Pricing and offers"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Prices are at or above MAP on every channel the brand controls."}</li><li>{"No unintended price conflicts between marketplaces (the same item far cheaper on one channel can trigger pricing alerts or Buy Box loss on another)."}</li><li>{"Coupons, promotions and deals have end dates and are intentional."}</li><li>{"Unknown sellers on the brand's listings are logged for the Unauthorized Seller Monitoring Workflow."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"6. Reviews and customer signals"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Listings with ratings below the brand's threshold are flagged for root-cause review."}</li><li>{"Return reasons and customer questions are checked for listing errors (wrong size chart, missing info)."}</li><li>{"Any listing with a quality or safety complaint pattern is escalated."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Issue log template"}</h3>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"SKU / ASIN"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Marketplace"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Section"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Issue"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Severity (1-3)"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Owner"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Fix submitted"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Verified live"}</th></tr></thead><tbody className="text-gray-300"></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"As a wholesale trade partner, Epic buys a brand's inventory upfront and sells it at retail, so a broken listing costs Epic sales on stock it already owns. That is why catalog QA is part of Epic's regular operating work rather than an optional add-on: Epic pays for the advertising, marketplace fees and fulfillment."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"Pricing and seller checks from section 5 feed Epic's brand protection work, which enforces MAP and works to remove "}<Link href="/knowledge-base/unauthorized-seller-monitoring-workflow" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"unauthorized sellers"}</Link>{"."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How often should I audit my catalog?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Run a full audit when you take over a catalog, before peak season and after large uploads, plus on a regular schedule. Status and Buy Box checks (section 1) are worth doing weekly."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Why do listing details change without my edits?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Marketplaces combine data from several contributors, including other sellers and automated systems. Brand Registry gives the brand more control over its listing content, but you still need to compare live data with your master data."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should I merge duplicate listings?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"If they are truly the same product, yes. Work through Seller Support or the brand's catalog tools to merge or close the duplicate, rather than leaving both live."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is the most expensive catalog error?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Usually a suppressed or stranded listing on a top seller, because the product cannot sell at all while inventory still incurs storage fees."}</p>
      </section>
    </div>
  ),
  'creative-testing-loop': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"A creative testing loop is a repeatable cycle: pick one element of a listing (such as the main image), form a hypothesis, run a controlled A/B test, keep the winner, and start the next test. On Amazon, brand-registered sellers can run these tests with Manage Your Experiments, which splits real shopper traffic between two versions and reports which one sold better."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"Testing one change at a time on a steady schedule beats redesigning a listing all at once, because you learn what actually moved the number."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What can you test on Amazon?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Manage Your Experiments (in Seller Central under Brands) supports A/B tests on several content types. Eligibility depends on Brand Registry and on the ASIN having enough recent traffic; Amazon shows which ASINs qualify."}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Element"}</th><th className="pb-3 pr-4 text-white font-semibold">{"What it affects"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Example hypothesis"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Main image"}</td><td className="py-3 pr-4 align-top">{"Click-through from search, then conversion"}</td><td className="py-3 pr-4 align-top">{"An angled shot showing the product in use will outperform a flat front shot"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Title"}</td><td className="py-3 pr-4 align-top">{"Click-through and relevance"}</td><td className="py-3 pr-4 align-top">{"Leading with the size or count will help shoppers comparing pack sizes"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"A+ Content"}</td><td className="py-3 pr-4 align-top">{"Conversion on the detail page"}</td><td className="py-3 pr-4 align-top">{"A comparison chart near the top will reduce hesitation between variants"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Bullet points / description"}</td><td className="py-3 pr-4 align-top">{"Conversion"}</td><td className="py-3 pr-4 align-top">{"Leading with the main use case will beat leading with materials"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Secondary images and video"}</td><td className="py-3 pr-4 align-top">{"Conversion (tested outside Manage Your Experiments if not supported, by sequential comparison)"}</td><td className="py-3 pr-4 align-top">{"An infographic answering the top review question will improve conversion"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How does the testing loop work?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Pick the element with the biggest gap."}</strong>{" Low click-through rate from search points to the main image or title. Good click-through but low conversion points to the detail page: secondary images, A+ or bullets."}</li><li><strong className="text-white">{"Mine the evidence."}</strong>{" Read reviews, customer questions and returns comments. Look at the top search results for your main keyword. What do shoppers ask that your page does not answer?"}</li><li><strong className="text-white">{"Write one hypothesis."}</strong>{" \"If we change X, Y will improve, because Z.\" One variable per test."}</li><li><strong className="text-white">{"Build version B."}</strong>{" Keep it compliant (main images still need a white background and no added text on Amazon)."}</li><li><strong className="text-white">{"Run the test."}</strong>{" In Manage Your Experiments, set the duration. Lower-traffic ASINs need longer tests to give reliable results, and many sellers choose 8 to 10 weeks. Check the options Amazon offers for your ASIN. Avoid launching a test right before a major sale event that will distort traffic."}</li><li><strong className="text-white">{"Don't change other things mid-test."}</strong>{" Price changes, stock-outs or big ad shifts muddy the result."}</li><li><strong className="text-white">{"Read the result honestly."}</strong>{" Amazon reports the probability that one version is better. If it is inconclusive, that is a result too; keep the original and move on."}</li><li><strong className="text-white">{"Publish the winner and log it."}</strong>{" Record the hypothesis, dates, result and the asset files."}</li><li><strong className="text-white">{"Start the next test."}</strong>{" The loop only pays off if it keeps running."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you prioritize what to test?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Signal"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Likely test"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Low click-through rate on ads and organic search"}</td><td className="py-3 pr-4 align-top">{"Main image, then title"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"High click-through, low conversion"}</td><td className="py-3 pr-4 align-top">{"Secondary images, A+, bullets"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Repeated customer questions on one topic"}</td><td className="py-3 pr-4 align-top">{"Image or A+ module that answers it"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Returns citing \"not as expected\""}</td><td className="py-3 pr-4 align-top">{"Images showing true size, contents and use"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Shoppers confused between variants"}</td><td className="py-3 pr-4 align-top">{"Comparison chart, clearer child images"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Creative test log template"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Field"}</th><th className="pb-3 pr-4 text-white font-semibold">{"What to record"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"ASIN / product"}</td><td className="py-3 pr-4 align-top">{"Which listing"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Element tested"}</td><td className="py-3 pr-4 align-top">{"Main image, title, A+, bullets, etc."}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Hypothesis"}</td><td className="py-3 pr-4 align-top">{"If we change X, Y improves, because Z"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Start / end dates"}</td><td className="py-3 pr-4 align-top">{"Test window"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Outside factors"}</td><td className="py-3 pr-4 align-top">{"Promotions, stock-outs, price changes during the test"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Result"}</td><td className="py-3 pr-4 align-top">{"Winner, confidence reported, change in conversion or units per visitor"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Decision"}</td><td className="py-3 pr-4 align-top">{"Publish B, keep A, or retest"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Next test"}</td><td className="py-3 pr-4 align-top">{"What the result suggests trying next"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What does this look like in practice?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"In one Epic partner-brand case study, A/B tests ran across the brand's top 10 products by sales, using changes to imagery, video and content. Six of the 10 products had a successful test, and those successful tests raised conversion rate by an average of 21%. Note that four products did not produce a winner. That is normal, and it is why the loop matters more than any single test."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic Global Inc. is a wholesale trade partner. We buy the inventory upfront and pay for the ads that drive traffic to each listing, so a better-converting page directly improves how fast we sell through stock we own and how far our ad spend goes. Creative testing runs as part of weekly execution under the \"Sell\" and \"Advertise\" pillars of our Buy–Sell–Advertise–Protect model, with the brand's approval on any new brand assets."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Do I need Brand Registry to A/B test on Amazon?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes. Manage Your Experiments is available to brand owners enrolled in Brand Registry, on ASINs with enough traffic."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How long should a test run?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Long enough to reach a clear result. Lower-traffic listings need longer tests; many sellers choose 8 to 10 weeks."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Can I test more than one change at once?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"You can, but you won't know which change caused the result. Test one variable at a time."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What if my ASIN isn't eligible for Manage Your Experiments?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Make one change, hold everything else steady, and compare conversion over equal periods before and after. It is less reliable, so keep notes on outside factors."}</p>
      </section>
    </div>
  ),
  'inventory-reorder-model-template': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"This template is a one-row-per-SKU spreadsheet that tells you, each week, which SKUs to reorder and how many units to order. It calculates safety stock, the "}<Link href="/knowledge-base/reorder-point-logic-explained" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"reorder point"}</Link>{" and the order quantity from four inputs: daily demand, demand variability, full lead time and current inventory."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"The logic behind each formula is explained in Reorder Point Logic Explained. This page gives the columns, the formulas and a filled-in example row."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What inputs does the model need?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Sales history:"}</strong>{" units sold per day for the last 4 to 8 weeks, with out-of-stock days removed."}</li><li><strong className="text-white">{"Lead time:"}</strong>{" days from purchase order to sellable stock at the marketplace, including production, freight, prep and check-in."}</li><li><strong className="text-white">{"Inventory:"}</strong>{" units on hand at the marketplace, units in transit and units on open purchase orders."}</li><li><strong className="text-white">{"Order rules:"}</strong>{" case pack size, supplier minimum order quantity and your review period (how often you place orders)."}</li><li><strong className="text-white">{"Service level:"}</strong>{" how often you want to avoid a stockout, set as a Z-score."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The template: columns and formulas"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Column letters assume the table starts in column A, with one SKU per row starting at row 2. Inputs are typed in; calculated columns use the formulas shown."}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Col"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Column name"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Type"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Formula or source"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"A"}</td><td className="py-3 pr-4 align-top">{"SKU / ASIN"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"From catalog"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"B"}</td><td className="py-3 pr-4 align-top">{"Marketplace / region"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"One row per SKU per region"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"C"}</td><td className="py-3 pr-4 align-top">{"Avg daily demand (units)"}</td><td className="py-3 pr-4 align-top">{"Input or calc"}</td><td className="py-3 pr-4 align-top">{"Units sold in period ÷ in-stock days in period"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"D"}</td><td className="py-3 pr-4 align-top">{"Std dev of daily demand"}</td><td className="py-3 pr-4 align-top">{"Input or calc"}</td><td className="py-3 pr-4 align-top">{"=STDEV.S(daily sales range), in-stock days only"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"E"}</td><td className="py-3 pr-4 align-top">{"Lead time (days)"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Production + freight + prep + check-in"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"F"}</td><td className="py-3 pr-4 align-top">{"Review period (days)"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Days between order reviews, e.g. 7 or 30"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"G"}</td><td className="py-3 pr-4 align-top">{"Z-score"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"1.65 for 95%, 2.05 for 98%; or =NORM.S.INV(service level)"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"H"}</td><td className="py-3 pr-4 align-top">{"Safety stock"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=ROUNDUP(G2*D2*SQRT(E2),0)"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"I"}</td><td className="py-3 pr-4 align-top">{"Reorder point"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=ROUNDUP(C2*E2,0)+H2"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"J"}</td><td className="py-3 pr-4 align-top">{"On hand"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Sellable units at the marketplace"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"K"}</td><td className="py-3 pr-4 align-top">{"Inbound"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Units shipped, not yet received"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"L"}</td><td className="py-3 pr-4 align-top">{"Open POs"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Units ordered, not yet shipped"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"M"}</td><td className="py-3 pr-4 align-top">{"Inventory position"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=J2+K2+L2"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"N"}</td><td className="py-3 pr-4 align-top">{"Weeks of cover"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=IFERROR(M2/(C2*7),\"\")"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"O"}</td><td className="py-3 pr-4 align-top">{"Reorder now?"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=IF(M2<=I2,\"YES\",\"no\")"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"P"}</td><td className="py-3 pr-4 align-top">{"Order-up-to level"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=ROUNDUP(C2*(E2+F2),0)+H2"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Q"}</td><td className="py-3 pr-4 align-top">{"Raw order qty"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=IF(O2=\"YES\",MAX(P2-M2,0),0)"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"R"}</td><td className="py-3 pr-4 align-top">{"Case pack"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Units per carton"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"S"}</td><td className="py-3 pr-4 align-top">{"Supplier MOQ"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Minimum units per order"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"T"}</td><td className="py-3 pr-4 align-top">{"Final order qty"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=IF(Q2=0,0,MAX(CEILING(Q2,R2),S2))"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"U"}</td><td className="py-3 pr-4 align-top">{"Days until stockout"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=IFERROR(J2/C2,\"\")"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"V"}</td><td className="py-3 pr-4 align-top">{"Stockout before arrival?"}</td><td className="py-3 pr-4 align-top">{"Calc"}</td><td className="py-3 pr-4 align-top">{"=IF(U2<E2,\"RISK\",\"ok\")"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"W"}</td><td className="py-3 pr-4 align-top">{"Notes / overrides"}</td><td className="py-3 pr-4 align-top">{"Input"}</td><td className="py-3 pr-4 align-top">{"Promotions, launches, supplier delays"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Example row (illustrative numbers, not Epic results)"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Column"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Value"}</th><th className="pb-3 pr-4 text-white font-semibold">{"How it was calculated"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Avg daily demand (C)"}</td><td className="py-3 pr-4 align-top">{"40"}</td><td className="py-3 pr-4 align-top">{"Input"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Std dev (D)"}</td><td className="py-3 pr-4 align-top">{"10"}</td><td className="py-3 pr-4 align-top">{"Input"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Lead time (E)"}</td><td className="py-3 pr-4 align-top">{"45"}</td><td className="py-3 pr-4 align-top">{"Input"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Review period (F)"}</td><td className="py-3 pr-4 align-top">{"30"}</td><td className="py-3 pr-4 align-top">{"Input"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Z-score (G)"}</td><td className="py-3 pr-4 align-top">{"1.65"}</td><td className="py-3 pr-4 align-top">{"95% service level"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Safety stock (H)"}</td><td className="py-3 pr-4 align-top">{"111"}</td><td className="py-3 pr-4 align-top">{"1.65 × 10 × √45 = 110.7, rounded up"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Reorder point (I)"}</td><td className="py-3 pr-4 align-top">{"1,911"}</td><td className="py-3 pr-4 align-top">{"40 × 45 + 111"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"On hand / inbound / open POs (J, K, L)"}</td><td className="py-3 pr-4 align-top">{"1,300 / 500 / 0"}</td><td className="py-3 pr-4 align-top">{"Inputs"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Inventory position (M)"}</td><td className="py-3 pr-4 align-top">{"1,800"}</td><td className="py-3 pr-4 align-top">{"1,300 + 500 + 0"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Weeks of cover (N)"}</td><td className="py-3 pr-4 align-top">{"6.4"}</td><td className="py-3 pr-4 align-top">{"1,800 ÷ 280"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Reorder now? (O)"}</td><td className="py-3 pr-4 align-top">{"YES"}</td><td className="py-3 pr-4 align-top">{"1,800 is below 1,911"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Order-up-to level (P)"}</td><td className="py-3 pr-4 align-top">{"3,111"}</td><td className="py-3 pr-4 align-top">{"40 × 75 + 111"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Raw order qty (Q)"}</td><td className="py-3 pr-4 align-top">{"1,311"}</td><td className="py-3 pr-4 align-top">{"3,111 − 1,800"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Case pack / MOQ (R, S)"}</td><td className="py-3 pr-4 align-top">{"24 / 500"}</td><td className="py-3 pr-4 align-top">{"Inputs"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Final order qty (T)"}</td><td className="py-3 pr-4 align-top">{"1,320"}</td><td className="py-3 pr-4 align-top">{"1,311 rounded up to 55 cases of 24"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Days until stockout (U)"}</td><td className="py-3 pr-4 align-top">{"32.5"}</td><td className="py-3 pr-4 align-top">{"1,300 ÷ 40"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Stockout before arrival? (V)"}</td><td className="py-3 pr-4 align-top">{"RISK"}</td><td className="py-3 pr-4 align-top">{"32.5 days of stock on hand vs 45-day lead time"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4">{"The RISK flag matters: the 500 inbound units should arrive well before day 32, so check their expected arrival date. If they are delayed, this SKU needs an expedited shipment or a temporary cut in ad spend to slow sales."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How to use the template each week"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li>{"Refresh sales, on hand, inbound and open PO columns from marketplace reports."}</li><li>{"Filter column O for \"YES\" and column V for \"RISK\"."}</li><li>{"Review each flagged SKU against the notes column for promotions or launches that change demand."}</li><li>{"Check marketplace storage limits before approving order quantities."}</li><li>{"Place purchase orders and add them to column L so they are not ordered twice."}</li><li>{"Once a month, refresh lead times from actual shipment dates and recheck service levels."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What are the common mistakes?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Averaging demand over stockout days, which understates true demand."}</li><li>{"Using production time instead of full lead time."}</li><li>{"Leaving inbound or open POs out of inventory position, which causes double orders."}</li><li>{"One row for a SKU sold in several countries. Use one row per SKU per region."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"As a wholesale trade partner, Epic buys a brand's inventory upfront at wholesale, so this model drives Epic's own purchase orders to the brand. Epic owns the forecast and the inventory risk, and pays for fulfillment and storage. The brand's part is to supply reliable lead times, case packs and minimums, and to flag production changes early."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Can I use this for Walmart, eBay or TikTok Shop too?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes. Add a row per SKU per marketplace or fulfillment network, since each has its own demand and lead time."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What if I do not have enough sales history?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Use a launch forecast for column C and a higher buffer, such as a fixed number of extra days of demand, until 6 to 8 weeks of data exist."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Why round up to case packs?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Suppliers ship in full cartons, and marketplace prep rules often require case-packed inventory to be shipped in consistent carton quantities."}</p>
      </section>
    </div>
  ),
  'listing-qa-checklist': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"A listing QA check confirms, before launch, that a new product's title, images, attributes, variations and compliance details are correct and meet marketplace rules. It takes under an hour per listing and prevents the most common launch problems: suppressed listings, wrong search placement, and ad spend sent to a page that does not convert."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"Use the checklist below for every new ASIN or Walmart item, and again after any major edit. Category rules differ, so always confirm limits against the current style guide for your category in Seller Central or Walmart Seller Center."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Why QA a listing before launch?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Launch is when a listing is most fragile. It has no sales history, no reviews and often a large ad budget pointed at it. A missing attribute can keep it out of filtered results. A main image that breaks policy can suppress it. A wrong variation theme can merge it with the wrong products. Fixing these after launch costs ad money and early momentum you do not get back."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The listing QA checklist"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"1. Identifiers and setup"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"GTIN (UPC/EAN) is valid and registered to the brand, or an approved GTIN exemption is in place"}</li><li>{"SKU naming follows your internal convention"}</li><li>{"Product type and browse category are correct (not just \"close enough\")"}</li><li>{"Brand name matches the Brand Registry entry exactly"}</li><li>{"Condition, fulfillment channel (FBA, FBM, WFS) and price are set as planned"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"2. Title"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Within the category character limit. Amazon has tightened title limits: for most non-media categories the cap is now 75 characters (from July 27, 2026). Check the current limit for your category in Seller Central."}</li><li>{"Follows the brand pattern, for example: Brand + product type + key feature + size/count"}</li><li>{"No promotional words (\"best seller,\" \"sale,\" \"free shipping\")"}</li><li>{"No word repeated more than twice; no decorative special characters"}</li><li>{"Reads clearly on a phone screen where only the first part shows"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"3. Bullets and description"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Each bullet covers one benefit or fact; most important first"}</li><li>{"Claims are accurate and supportable (no unapproved health, safety or \"guaranteed\" claims)"}</li><li>{"Dimensions, materials and what is in the box are stated"}</li><li>{"No pricing, shipping promises, contact details or links to other sites"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"4. Backend search terms"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Under Amazon's limit (250 bytes in the US)"}</li><li>{"Includes synonyms, alternate spellings and use cases not already in the title"}</li><li>{"No competitor brand names, no ASINs, no repeated words, no offensive terms"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"5. Attributes"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"All required fields filled"}</li><li>{"Recommended fields filled where they apply (these drive filters and AI shopping answers)"}</li><li>{"Units consistent with the rest of the catalog"}</li><li>{"No \"N/A\" or placeholder values unless allowed"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"6. Images and video"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Main image: product only, pure white background, product fills most of the frame, no text, logos or badges"}</li><li>{"At least 1,000 pixels on the longest side so zoom works (Amazon accepts 500 to 10,000)"}</li><li>{"Secondary images show scale, use, details, and answer the top buyer questions"}</li><li>{"Each variation child has its own correct main image"}</li><li>{"Video, if used, is approved and plays"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"7. A+ / brand content"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"A+ Content submitted and approved (requires Brand Registry on Amazon)"}</li><li>{"No claims in A+ that are not also supported elsewhere"}</li><li>{"Comparison chart links to the right sibling ASINs"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"8. Variations"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Child is attached to the right parent"}</li><li>{"Variation theme reflects a real difference (size, color, count)"}</li><li>{"Child values are named consistently across the family"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"9. Compliance"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Category approval (ungating) in place if required"}</li><li>{"Safety documents, labels, Prop 65 warnings, or hazmat (dangerous goods) review completed where they apply"}</li><li>{"Packaging and labeling match the listing"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"10. Post-launch checks (day 1 and day 7)"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Listing is active and buyable; not suppressed"}</li><li>{"Searching the main keyword in an incognito window finds the product"}</li><li>{"Live page matches the approved version (no overwritten fields)"}</li><li>{"Ads are pointed at the right ASIN and serving"}</li><li>{"Inventory is received and available at the fulfillment center"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What are the most common failures?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Failure"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Typical cause"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Fix"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Listing suppressed"}</td><td className="py-3 pr-4 align-top">{"Main image or missing required attribute"}</td><td className="py-3 pr-4 align-top">{"Check the suppressed listings view, fix the flagged field"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Not in filtered results"}</td><td className="py-3 pr-4 align-top">{"Blank or non-standard attributes"}</td><td className="py-3 pr-4 align-top">{"Fill recommended attributes with standard values"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Wrong category"}</td><td className="py-3 pr-4 align-top">{"Product type picked for speed"}</td><td className="py-3 pr-4 align-top">{"Correct the product type and browse node"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Child shows wrong image"}</td><td className="py-3 pr-4 align-top">{"Image uploaded to parent only"}</td><td className="py-3 pr-4 align-top">{"Upload a main image to each child"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Live page differs from upload"}</td><td className="py-3 pr-4 align-top">{"Another contributor's data or a template error"}</td><td className="py-3 pr-4 align-top">{"Compare with source of truth; correct through Brand Registry"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"As a wholesale trade partner, Epic buys the inventory upfront and pays for the ads that send traffic to each listing, so a listing that fails QA wastes our money first. Listing QA is done within about 4 weeks of kickoff, before a product goes live with Epic, and the post-launch checks roll into our weekly work."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How long does listing QA take?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"For a single listing with ready content, usually under an hour. "}<Link href="/knowledge-base/variation-strategy-basics" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"Variation families"}</Link>{" and regulated categories take longer."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Do I need Brand Registry to pass QA?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Not to list, but you need it for A+ Content and for more control over your detail page data on Amazon."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should I run QA again after launch?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes. Check on day 1 and day 7, then fold the listing into your weekly "}<Link href="/knowledge-base/catalog-hygiene-what-it-is-why-it-matters" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"catalog hygiene"}</Link>{" review."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Does the same checklist work for Walmart?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Mostly. Walmart has its own required attributes, content scoring and image rules, so check its style guide for the category."}</p>
      </section>
    </div>
  ),
  'reorder-point-logic-explained': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"A reorder point is the inventory level at which you place the next purchase order, so new stock arrives before the old stock runs out. It equals average daily demand multiplied by the full lead time in days, plus a safety stock buffer for demand and supply surprises."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"On marketplaces, getting this right matters more than in most channels. A stockout on Amazon does not just pause sales; it can cost organic rank, ad momentum and the "}<Link href="/knowledge-base/amazon-marketplace-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"Buy Box"}</Link>{", which take weeks to rebuild. Ordering too early ties up cash and adds storage fees."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What is the reorder point formula?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Reorder point = (average daily demand × lead time in days) + safety stock"}</strong></p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Average daily demand:"}</strong>{" units sold per day, usually a trailing 4 to 8 week average, adjusted for known events (promotions, seasonality, a new marketplace going live)."}</li><li><strong className="text-white">{"Lead time:"}</strong>{" every day between deciding to order and having sellable stock at the marketplace. Not just production time."}</li><li><strong className="text-white">{"Safety stock:"}</strong>{" extra units that cover the gap when demand runs high or supply runs late."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What counts as lead time?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The most common mistake is using the supplier's production time as the lead time. For marketplace selling, lead time is the sum of every step until a unit is available to buy:"}</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li>{"Purchase order approval and confirmation"}</li><li>{"Production or pick time at the brand or factory"}</li><li>{"Freight to the warehouse or prep center"}</li><li>{"Prep, labeling and inbound shipment creation"}</li><li>{"Carrier transit to the marketplace fulfillment center"}</li><li>{"Receiving and check-in at the fulfillment center (FBA check-in can take days to weeks in busy periods)"}</li></ol>
        <p className="text-gray-300 leading-relaxed mb-4">{"Use the realistic number from recent shipments, not the best case. If lead time varies a lot, that variability belongs in safety stock."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you calculate safety stock?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"There are two common methods."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Simple method: days of buffer"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Safety stock = average daily demand × buffer days"}</strong>{". For example, 14 buffer days. This is easy to explain and fine for stable products."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Statistical method: service level"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Safety stock = Z × standard deviation of daily demand × √(lead time in days)"}</strong></p>
        <p className="text-gray-300 leading-relaxed mb-4">{"Z is set by the service level you want, meaning the share of order cycles with no stockout. Common values:"}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Target service level"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Z-score"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"90%"}</td><td className="py-3 pr-4 align-top">{"1.28"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"95%"}</td><td className="py-3 pr-4 align-top">{"1.65"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"98%"}</td><td className="py-3 pr-4 align-top">{"2.05"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"99%"}</td><td className="py-3 pr-4 align-top">{"2.33"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4">{"Higher service levels cost more inventory for each extra point of protection, so most sellers reserve 98 to 99% for their top sellers."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Worked example (illustrative numbers, not Epic results)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"An illustrative SKU sells an average of 40 units per day, with a standard deviation of 10 units per day. Full lead time is 45 days (25 days production, 12 days freight, 8 days prep and check-in). Target service level is 95%, so Z = 1.65."}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Step"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Calculation"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Result"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Lead time demand"}</td><td className="py-3 pr-4 align-top">{"40 × 45"}</td><td className="py-3 pr-4 align-top">{"1,800 units"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Safety stock"}</td><td className="py-3 pr-4 align-top">{"1.65 × 10 × √45 (6.71)"}</td><td className="py-3 pr-4 align-top">{"111 units"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Reorder point"}</td><td className="py-3 pr-4 align-top">{"1,800 + 111"}</td><td className="py-3 pr-4 align-top">{"1,911 units"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4">{"Now compare the reorder point with "}<strong className="text-white">{"inventory position"}</strong>{", not just stock on hand:"}</p>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Inventory position = on hand at the marketplace + inbound in transit + open purchase orders − backorders"}</strong></p>
        <p className="text-gray-300 leading-relaxed mb-4">{"If the illustrative SKU has 1,500 units on hand and 600 inbound, its inventory position is 2,100. That is 189 units above the reorder point, or about 5 days of sales (189 ÷ 40), so the next order goes out within the week."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How much should you order when you hit the reorder point?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A common approach is an order-up-to level that covers the lead time plus the time until your next order review:"}</p>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Order-up-to level = daily demand × (lead time + review period) + safety stock"}</strong></p>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Order quantity = order-up-to level − inventory position"}</strong></p>
        <p className="text-gray-300 leading-relaxed mb-4">{"With a 30-day review period in the illustrative example: 40 × (45 + 30) + 111 = 3,111 units. At an inventory position of 1,911, the order is 1,200 units. Round to case packs and supplier minimums, and check against marketplace storage limits before placing it."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What breaks reorder point logic?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Demand measured during a stockout."}</strong>{" Days with zero stock show zero sales, which drags the average down. Exclude out-of-stock days."}</li><li><strong className="text-white">{"Ignoring planned events."}</strong>{" A Prime Day deal or a new marketplace launch needs a separate demand forecast, not the trailing average."}</li><li><strong className="text-white">{"One reorder point for all regions."}</strong>{" Each country or fulfillment network has its own demand and lead time."}</li><li><strong className="text-white">{"Storage limits."}</strong>{" Marketplace capacity limits can cap how much you can send, so the order may need to be split across shipments."}</li><li><strong className="text-white">{"Setting it once."}</strong>{" Demand and lead times move. Recalculate on a fixed cadence."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Because Epic is a wholesale trade partner, reorder points are Epic's problem, not the brand's. Epic buys the brand's inventory upfront at wholesale, so Epic carries the cash tied up in stock and absorbs the cost of overstock or a stockout. That gives Epic a direct reason to forecast carefully."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"In practice, Epic tracks demand, inventory position and lead time per SKU and per marketplace, and turns reorder points into purchase orders to the brand. After the opening order, which usually covers about 60 to 90 days of stock, Epic replenishes monthly. The most useful thing a brand can give Epic is an accurate production lead time and early notice of changes."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Is the reorder point the same as the order quantity?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"No. The reorder point tells you when to order. The order quantity tells you how much, usually enough to reach an order-up-to level that covers lead time plus the review period."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should inbound shipments count toward the reorder point?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes. Compare the reorder point with inventory position (on hand plus inbound plus open orders), or you will double-order."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How much safety stock is enough?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"It depends on how variable demand and lead time are and how costly a stockout is. Top sellers usually justify a higher service level than slow movers."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How often should reorder points be recalculated?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"At least monthly, and weekly for fast movers or during peak season, when both demand and fulfillment center check-in times change quickly."}</p>
      </section>
    </div>
  ),
  'search-term-harvesting-playbook': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"Search term harvesting means reviewing the Amazon search term report on a fixed schedule, moving terms that convert profitably into their own exact-match targets, and adding terms that spend without converting as negatives. Done weekly, it moves budget toward proven demand and away from waste, which is how most accounts improve efficiency without simply cutting spend."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What is the search term report?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The Sponsored Products search term report shows the actual words shoppers typed (or the ASINs they were viewing) when your ad was shown and clicked, mapped to the keyword or target that triggered it. Your keyword \"protein powder\" in broad match might match searches like \"vanilla protein powder for women\" or \"protein shaker.\" The report shows which of those produced sales and which only cost money."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"You can download it from Amazon Ads (Reports or Measurement and Reporting, depending on the console version). Pull it for a window long enough to have meaningful clicks, typically the last 30 to 60 days for discovery campaigns."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you decide what to do with each term?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Set thresholds before you open the report, based on your product's price, margin and conversion rate. A simple decision table:"}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"What the term shows"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Action"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Orders at or below target ACoS, with repeat conversions"}</td><td className="py-3 pr-4 align-top"><strong className="text-white">{"Promote:"}</strong>{" add as exact match in a performance campaign; add negative exact in the source campaign"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Orders but ACoS above target"}</td><td className="py-3 pr-4 align-top"><strong className="text-white">{"Optimize:"}</strong>{" keep, lower the bid, or check the listing for a relevance gap"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Clicks past your threshold, zero orders, clearly irrelevant"}</td><td className="py-3 pr-4 align-top"><strong className="text-white">{"Negate:"}</strong>{" negative exact (or negative phrase if the root word is the problem)"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Clicks past your threshold, zero orders, relevant"}</td><td className="py-3 pr-4 align-top"><strong className="text-white">{"Investigate:"}</strong>{" check price, images and reviews vs. the search results page before cutting"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Few clicks so far"}</td><td className="py-3 pr-4 align-top"><strong className="text-white">{"Wait:"}</strong>{" not enough data yet"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"ASIN (product target) that converts"}</td><td className="py-3 pr-4 align-top"><strong className="text-white">{"Promote:"}</strong>{" add to a product targeting campaign"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4"><strong className="text-white">{"Setting the \"clicks with no order\" threshold:"}</strong>{" a common approach is to compare clicks to your typical conversion rate. If your product normally converts at about 10%, 20 or more clicks with no order is a reasonable signal to act. If it converts at 5%, wait longer. Adjust to your own numbers."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What is the step-by-step harvesting routine?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Download the report"}</strong>{" for the discovery campaigns (auto, broad, phrase) and the product targeting campaigns."}</li><li><strong className="text-white">{"Sort by spend."}</strong>{" Start with the terms that cost the most; they matter most."}</li><li><strong className="text-white">{"Tag each term"}</strong>{" using the decision table: promote, optimize, negate, investigate, wait."}</li><li><strong className="text-white">{"Promote winners."}</strong>{" Add each to an exact-match ad group in the right performance campaign at a bid near its recent cost per click."}</li><li><strong className="text-white">{"Isolate them."}</strong>{" Add the same term as negative exact in the discovery campaign it came from, so the two campaigns stop competing for the same search."}</li><li><strong className="text-white">{"Negate waste."}</strong>{" Use negative exact for one bad query; negative phrase when a word makes every query irrelevant (for example \"used,\" \"replacement part,\" or a different product type)."}</li><li><strong className="text-white">{"Log the changes."}</strong>{" Record date, term, action and reason so you can check results later and undo mistakes."}</li><li><strong className="text-white">{"Review in two to four weeks."}</strong>{" Check that promoted terms hold their conversion rate at the new bid."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What mistakes should you avoid?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Negating too early."}</strong>{" Cutting a relevant term after a handful of clicks throws away future buyers."}</li><li><strong className="text-white">{"Using negative phrase too broadly."}</strong>{" Negating \"free\" may be fine; negating \"protein\" in a protein account is not."}</li><li><strong className="text-white">{"Forgetting to isolate."}</strong>{" Promoting a term without negating it in the source campaign means you bid against yourself."}</li><li><strong className="text-white">{"Negating your own brand."}</strong>{" Branded searches belong in brand defense, not on a negative list."}</li><li><strong className="text-white">{"Judging by ACoS alone."}</strong>{" A term with a high ACoS but a strong new-to-brand share or high ranking value can be worth keeping for a launch period. Decide on purpose."}</li><li><strong className="text-white">{"Ignoring the listing."}</strong>{" If a relevant term never converts, the problem may be the price, the main image or the reviews, not the keyword."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Weekly harvesting checklist"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Search term report downloaded for discovery and product targeting campaigns"}</li><li>{"Thresholds set from current conversion rate and target ACoS"}</li><li>{"Winners added as exact match and negated at the source"}</li><li>{"Irrelevant terms added as negative exact or phrase"}</li><li>{"Converting competitor and complementary ASINs added to product targeting"}</li><li>{"Change log updated"}</li><li>{"Last cycle's promoted terms reviewed"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic Global Inc. works as a wholesale trade partner. We buy the brand's inventory upfront and pay for the advertising ourselves, so every wasted click is our own cost. Search term harvesting is a standing weekly task and part of the \"Advertise\" pillar of Buy-Sell-Advertise-Protect. The goal is to sell the stock we own at a healthy margin while keeping the brand's pricing and listings clean."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How often should I harvest search terms?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Weekly for active accounts. Smaller accounts with low click volume can do it every two weeks."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should I remove a keyword from the auto campaign after harvesting it?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"You cannot remove a term from an auto campaign, but you can add it as a negative exact so the exact-match campaign handles it."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is the difference between negative exact and negative phrase?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Negative exact blocks one specific search. Negative phrase blocks any search containing that phrase, so use it carefully."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Does this work on Walmart?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes. Walmart Connect provides search term data and negative keywords; the menus and match options differ slightly."}</p>
      </section>
    </div>
  ),
  'unauthorized-seller-monitoring-workflow': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"To deal with unauthorized sellers, monitor your listings for new offers, identify who each seller is, collect evidence of a real violation, and then use the right tool for that violation: a marketplace infringement report, a test buy, or a direct notice to the seller. It is important to know the limit up front: in the US, reselling genuine, unaltered goods is generally lawful, so a seller being \"unauthorized\" is not by itself grounds for Amazon to remove them."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"Effective enforcement is evidence-based. It targets sellers who are breaking a law or a marketplace policy, and it reduces leaks in the supply chain so fewer unauthorized sellers appear in the first place."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What can and can't enforcement do?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Situation"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Can it usually be removed through Amazon?"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Basis"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Counterfeit product"}</td><td className="py-3 pr-4 align-top">{"Yes, with evidence"}</td><td className="py-3 pr-4 align-top">{"Trademark infringement; counterfeit report through Brand Registry"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Listing uses your copyrighted images or text without permission on a separate page"}</td><td className="py-3 pr-4 align-top">{"Often yes"}</td><td className="py-3 pr-4 align-top">{"Copyright report"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Product infringes a patent"}</td><td className="py-3 pr-4 align-top">{"Possibly"}</td><td className="py-3 pr-4 align-top">{"Patent report or Amazon's patent evaluation process"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Goods materially different from genuine (missing warranty, altered, expired, wrong region, damaged packaging)"}</td><td className="py-3 pr-4 align-top">{"Sometimes"}</td><td className="py-3 pr-4 align-top">{"Material-difference argument; needs strong evidence and often legal support"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Genuine, new, unaltered goods sold below MAP"}</td><td className="py-3 pr-4 align-top">{"No, not through Amazon"}</td><td className="py-3 pr-4 align-top">{"Amazon does not enforce MAP; handle through your own reseller and MAP policies"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Genuine goods sold by a seller you never authorized"}</td><td className="py-3 pr-4 align-top">{"Usually no"}</td><td className="py-3 pr-4 align-top">{"First sale doctrine generally allows resale of genuine goods"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4">{"Filing reports that are not supported by evidence is risky. Amazon can restrict a brand's access to reporting tools for inaccurate or abusive reports."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What is the monitoring workflow?"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Step 1: Monitor"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Check the offer listing (\"Other sellers on Amazon\") on every active ASIN; daily for top sellers, weekly for the rest"}</li><li>{"Track who holds the Buy Box and at what price"}</li><li>{"Watch for new ASINs using your brand name, and for edits to your detail pages"}</li><li>{"Check other marketplaces where your brand sells (Walmart, eBay)"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Step 2: Identify"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Record the seller name, seller ID, storefront link and business address shown on the seller profile"}</li><li>{"Note fulfillment method (FBA or merchant-fulfilled), price, and claimed condition"}</li><li>{"Match against your authorized reseller list and distributor records"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Step 3: Collect evidence"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Timestamped screenshots of the offer, price and seller profile, with the URL visible"}</li><li>{"A test buy for suspected counterfeit or materially different goods: order ID, photos of packaging, labels, lot codes and serial numbers, compared to your genuine product"}</li><li>{"Any lot or batch codes that trace the goods to a specific distributor or retailer"}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Step 4: Classify"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Put each case into one category from the table above. The category decides the action. If you can't prove a violation, the case goes to supply chain follow-up, not a takedown."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Step 5: Act"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Counterfeit or IP violation:"}</strong>{" file through Amazon Brand Registry's Report a Violation tool with the evidence. Brands enrolled in Project Zero may have extra self-service removal tools, if eligible."}</li><li><strong className="text-white">{"Materially different goods:"}</strong>{" document the differences carefully; consider counsel before sending notices."}</li><li><strong className="text-white">{"MAP breach by an authorized reseller:"}</strong>{" enforce under your MAP or reseller policy (warnings, then the consequences stated in that policy, such as stopping supply)."}</li><li><strong className="text-white">{"Genuine goods from an unknown source:"}</strong>{" trace the lot codes, find the leak in your distribution, and tighten agreements."}</li></ul>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Step 6: Follow up"}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Recheck the listing after any report or notice"}</li><li>{"Log the outcome and date"}</li><li>{"Escalate repeat offenders according to your escalation plan"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you prevent unauthorized sellers in the first place?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Written reseller and MAP policies."}</strong>{" Clear terms for who may sell where, and at what advertised price."}</li><li><strong className="text-white">{"Distribution agreements."}</strong>{" Limit online resale rights and require distributors to pass terms down."}</li><li><strong className="text-white">{"Lot and serial tracking."}</strong>{" Codes on packaging let you trace leaked stock to its source."}</li><li><strong className="text-white">{"Brand Registry and, where available, Transparency."}</strong>{" Transparency adds unique codes to each unit so Amazon can check authenticity before shipping."}</li><li><strong className="text-white">{"Fewer channels."}</strong>{" The more distributors you have, the more places stock can leak from."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Monitoring log template"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Field"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Example entry"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Date found"}</td><td className="py-3 pr-4 align-top">{"Date the offer was first seen"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Marketplace / ASIN"}</td><td className="py-3 pr-4 align-top">{"Amazon US / ASIN"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Seller name and ID"}</td><td className="py-3 pr-4 align-top">{"From the seller profile"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Price and fulfillment"}</td><td className="py-3 pr-4 align-top">{"Price, FBA or FBM"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Category"}</td><td className="py-3 pr-4 align-top">{"Counterfeit / material difference / MAP / genuine unknown source"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Evidence"}</td><td className="py-3 pr-4 align-top">{"Screenshot links, test buy order ID, lot codes"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Action taken"}</td><td className="py-3 pr-4 align-top">{"Report filed, notice sent, distributor contacted"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Outcome and date"}</td><td className="py-3 pr-4 align-top">{"Removed, still active, escalated"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic Global Inc. is a wholesale trade partner: we buy the brand's inventory upfront and sell it at retail, so unauthorized sellers and below-MAP pricing cut into sales of stock we own. Brand protection is the \"Protect\" pillar of our Buy-Sell-Advertise-Protect model. In practice this covers Brand Registry authorization, unauthorized-seller removal, MAP enforcement, Transparency enrollment, "}<Link href="/knowledge-base/amazon-marketplace-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"Buy Box"}</Link>{" monitoring and brand protection reports by marketplace. We follow the evidence-based approach above, so actions are ones the marketplace will uphold. The brand keeps its Brand Registry and authorizes Epic to act on it."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Can Amazon remove a seller just because I didn't authorize them?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Generally no. Amazon acts on intellectual property violations and policy breaches, not on whether a seller is on your authorized list."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Does Amazon enforce MAP?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"No. MAP is a policy between a brand and its resellers. Amazon sets its own prices and does not police MAP for brands."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is a test buy?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Ordering the product from the suspect seller to inspect it. It is the strongest evidence for counterfeit or materially different goods."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Is this legal advice?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"No. Laws differ by country and situation. Talk to an IP attorney before sending legal notices."}</p>
      </section>
    </div>
  ),
  'variation-strategy-basics': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"Variations group versions of the same product, such as sizes, colors or pack counts, under one non-buyable parent listing so shoppers can switch between them on one page. Set them up when the products are truly the same item in different versions, and keep them separate when they are different products, because Amazon prohibits grouping unrelated items and a bad family can hurt conversion and reviews for every child."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do Amazon variations work?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"A variation family has three parts:"}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Parent ASIN."}</strong>{" A non-buyable record that holds the family together. It has no price or stock."}</li><li><strong className="text-white">{"Child ASINs."}</strong>{" The buyable versions. Each has its own SKU, price, stock, images and attributes."}</li><li><strong className="text-white">{"Variation theme."}</strong>{" The attribute that differs between children, such as Size, Color, SizeColor or Item Package Quantity. Available themes depend on the product type."}</li></ul>
        <p className="text-gray-300 leading-relaxed mb-4">{"Children in a family usually share a detail page view and display a combined review and rating count. That is the main benefit and the main risk: one weak child can drag down the rating shown for all of them."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"When should products be grouped as variations?"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Situation"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Group as variations?"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Why"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Same shirt in five colors"}</td><td className="py-3 pr-4 align-top">{"Yes"}</td><td className="py-3 pr-4 align-top">{"Same product, one real difference"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Same supplement in 30 and 60 count"}</td><td className="py-3 pr-4 align-top">{"Yes"}</td><td className="py-3 pr-4 align-top">{"Size or count is a valid theme"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Same item as a single and a 3-pack"}</td><td className="py-3 pr-4 align-top">{"Usually yes"}</td><td className="py-3 pr-4 align-top">{"Item Package Quantity theme, if available for the category"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Different scents of the same lotion"}</td><td className="py-3 pr-4 align-top">{"Yes, if the category allows a Scent theme"}</td><td className="py-3 pr-4 align-top">{"Same formula base, buyer chooses the scent"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"A shampoo and a conditioner"}</td><td className="py-3 pr-4 align-top">{"No"}</td><td className="py-3 pr-4 align-top">{"Different products; this breaks Amazon's variation policy"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"A product and a bundle with an accessory"}</td><td className="py-3 pr-4 align-top">{"No, in most cases"}</td><td className="py-3 pr-4 align-top">{"A bundle is a different product"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Old and new formula"}</td><td className="py-3 pr-4 align-top">{"Usually no"}</td><td className="py-3 pr-4 align-top">{"Material change; mixing reviews can mislead shoppers"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4">{"Rule of thumb: if a shopper would describe them as \"the same thing, just in a different size or color,\" they belong together. If not, keep them apart."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you decide on a variation structure?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"List every SKU and its real differences."}</strong>{" Write down the attributes that change between SKUs (size, color, count, flavor)."}</li><li><strong className="text-white">{"Choose the theme that matches."}</strong>{" Use one theme if only one attribute changes; a two-dimensional theme (for example SizeColor) if two change."}</li><li><strong className="text-white">{"Check the category's allowed themes."}</strong>{" Download the category template or check the product type in Seller Central. Some themes are deprecated over time, so use only those currently listed as valid."}</li><li><strong className="text-white">{"Standardize child values."}</strong>{" \"Small, Medium, Large,\" not \"S, Medium, LG.\" Consistent values make the dropdowns and swatches clean."}</li><li><strong className="text-white">{"Give every child its own main image."}</strong>{" Shoppers expect the picture to change when they pick a color."}</li><li><strong className="text-white">{"Decide how wide the family should be."}</strong>{" Very large families can be hard to browse and can bury slow SKUs. Very small ones lose the benefit of shared reviews. Group what a shopper would compare side by side."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What goes wrong with variations?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Orphaned children."}</strong>{" A child loses its parent link and shows as a standalone listing with no shared reviews."}</li><li><strong className="text-white">{"Wrong theme."}</strong>{" A theme that does not match the actual difference confuses shoppers and can be flagged."}</li><li><strong className="text-white">{"Mismatched images."}</strong>{" Only the parent or one child has images, so selecting a color shows the wrong product."}</li><li><strong className="text-white">{"Inconsistent values."}</strong>{" Duplicate dropdown options (\"Blue\" and \"blue\") or sizes out of order."}</li><li><strong className="text-white">{"Policy violations."}</strong>{" Grouping different products to borrow reviews. Amazon can break up the family and take action on the account."}</li><li><strong className="text-white">{"Stock-outs on top children."}</strong>{" If the default child is out of stock, the page can lose the Buy Box or show an unavailable option first."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Variation health checklist"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Every child is linked to the correct parent"}</li><li>{"Theme matches the real difference between children"}</li><li>{"Child values are spelled and ordered consistently"}</li><li>{"Each child has its own correct main image"}</li><li>{"No unrelated products in the family"}</li><li>{"Best-selling children are in stock"}</li><li>{"Family checked after every bulk upload or new SKU"}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Should you merge or split an existing family?"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Merging two families can pool reviews and simplify the page, but only if the products are truly the same item in different versions. Splitting makes sense when a child has a different formula, a poor rating that hurts the others, or does not fit the theme. Either change can briefly affect ranking and ad delivery, so make it deliberately, log the before and after, and avoid doing it during a major promotion."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic Global Inc. is a wholesale trade partner: we buy the brand's inventory upfront and sell it at retail, paying for the ads, fees and fulfillment ourselves. Because we own every SKU in a family, we plan variations around how shoppers buy and around stock, so the children we advertise are the ones we have in stock. Variation structure is set within about 4 weeks of kickoff and checked weekly as part of the \"Sell\" pillar of our Buy-Sell-Advertise-Protect model."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Do variations share reviews?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Generally yes. Children in a family usually display a combined rating, which is why only true versions of the same product should be grouped."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Can I add a bundle as a variation?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"In most cases no. A bundle is a different product. A multi-pack of the same item can use an Item Package Quantity theme where the category allows it."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Why did my variation family break apart?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Common causes are a template upload that dropped the parent link, a theme that is no longer valid, or Amazon separating children it considers different products."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Do Walmart variations work the same way?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"The idea is similar (Walmart uses variant groups with a shared group ID and attributes), but the attribute names and rules differ, so check Walmart's guide."}</p>
      </section>
    </div>
  ),
  'weekly-executive-dashboard': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"A weekly executive dashboard should fit on one page and answer five questions: are we growing, are we making money, is advertising pulling its weight, will we stay in stock, and is the brand protected. That means about 12 to 15 metrics, each shown against last week, the same week last year and target, plus a short list of decisions needed."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"Most dashboards fail by showing too much. An executive needs the few numbers that change a decision this week, with the detail one click away."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What sections should the dashboard have?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Sales:"}</strong>{" total sales, units, average selling price, and the split by marketplace."}</li><li><strong className="text-white">{"Profit:"}</strong>{" contribution margin in dollars and as a percentage. This is the most important line on the page."}</li><li><strong className="text-white">{"Advertising:"}</strong>{" ad spend, TACoS and ACoS, and organic sales %."}</li><li><strong className="text-white">{"Conversion:"}</strong>{" sessions, conversion rate and Buy Box %."}</li><li><strong className="text-white">{"Inventory:"}</strong>{" weeks of cover, in-stock rate, inbound units and SKUs at risk of stockout."}</li><li><strong className="text-white">{"Brand protection:"}</strong>{" unauthorized sellers found and removed, MAP violations open."}</li><li><strong className="text-white">{"Decisions and actions:"}</strong>{" three to five items that need an owner or approval this week."}</li></ol>
        <p className="text-gray-300 leading-relaxed mb-4">{"Definitions and formulas for every metric are in The Marketplace KPI Glossary."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Sample layout (illustrative numbers, not Epic results)"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"The table below shows the shape of a one-page dashboard. All numbers are made up for illustration."}</p>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Section"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Metric"}</th><th className="pb-3 pr-4 text-white font-semibold">{"This week"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Last week"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Same week last year"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Target"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Status"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Sales"}</td><td className="py-3 pr-4 align-top">{"Total sales"}</td><td className="py-3 pr-4 align-top">{"$84,000"}</td><td className="py-3 pr-4 align-top">{"$80,500"}</td><td className="py-3 pr-4 align-top">{"$66,000"}</td><td className="py-3 pr-4 align-top">{"$82,000"}</td><td className="py-3 pr-4 align-top">{"On track"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Sales"}</td><td className="py-3 pr-4 align-top">{"Units"}</td><td className="py-3 pr-4 align-top">{"2,950"}</td><td className="py-3 pr-4 align-top">{"2,860"}</td><td className="py-3 pr-4 align-top">{"2,400"}</td><td className="py-3 pr-4 align-top">{"2,900"}</td><td className="py-3 pr-4 align-top">{"On track"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Sales"}</td><td className="py-3 pr-4 align-top">{"Average selling price"}</td><td className="py-3 pr-4 align-top">{"$28.47"}</td><td className="py-3 pr-4 align-top">{"$28.15"}</td><td className="py-3 pr-4 align-top">{"$27.50"}</td><td className="py-3 pr-4 align-top">{"$28.28"}</td><td className="py-3 pr-4 align-top">{"On track"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Profit"}</td><td className="py-3 pr-4 align-top">{"Contribution margin $"}</td><td className="py-3 pr-4 align-top">{"$15,100"}</td><td className="py-3 pr-4 align-top">{"$15,800"}</td><td className="py-3 pr-4 align-top">{"$11,200"}</td><td className="py-3 pr-4 align-top">{"$16,000"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Profit"}</td><td className="py-3 pr-4 align-top">{"Contribution margin %"}</td><td className="py-3 pr-4 align-top">{"18.0%"}</td><td className="py-3 pr-4 align-top">{"19.6%"}</td><td className="py-3 pr-4 align-top">{"17.0%"}</td><td className="py-3 pr-4 align-top">{"19.5%"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Advertising"}</td><td className="py-3 pr-4 align-top">{"Ad spend"}</td><td className="py-3 pr-4 align-top">{"$10,900"}</td><td className="py-3 pr-4 align-top">{"$9,700"}</td><td className="py-3 pr-4 align-top">{"$8,600"}</td><td className="py-3 pr-4 align-top">{"$10,000"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Advertising"}</td><td className="py-3 pr-4 align-top">{"TACoS"}</td><td className="py-3 pr-4 align-top">{"13.0%"}</td><td className="py-3 pr-4 align-top">{"12.0%"}</td><td className="py-3 pr-4 align-top">{"13.0%"}</td><td className="py-3 pr-4 align-top">{"12.0%"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Advertising"}</td><td className="py-3 pr-4 align-top">{"Organic sales %"}</td><td className="py-3 pr-4 align-top">{"58%"}</td><td className="py-3 pr-4 align-top">{"61%"}</td><td className="py-3 pr-4 align-top">{"55%"}</td><td className="py-3 pr-4 align-top">{"60%"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Conversion"}</td><td className="py-3 pr-4 align-top">{"Conversion rate"}</td><td className="py-3 pr-4 align-top">{"11.2%"}</td><td className="py-3 pr-4 align-top">{"11.0%"}</td><td className="py-3 pr-4 align-top">{"10.1%"}</td><td className="py-3 pr-4 align-top">{"11.0%"}</td><td className="py-3 pr-4 align-top">{"On track"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Conversion"}</td><td className="py-3 pr-4 align-top">{"Buy Box %"}</td><td className="py-3 pr-4 align-top">{"97%"}</td><td className="py-3 pr-4 align-top">{"98%"}</td><td className="py-3 pr-4 align-top">{"91%"}</td><td className="py-3 pr-4 align-top">{"98%"}</td><td className="py-3 pr-4 align-top">{"On track"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Inventory"}</td><td className="py-3 pr-4 align-top">{"Weeks of cover"}</td><td className="py-3 pr-4 align-top">{"7.5"}</td><td className="py-3 pr-4 align-top">{"8.1"}</td><td className="py-3 pr-4 align-top">{"5.0"}</td><td className="py-3 pr-4 align-top">{"8 to 10"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Inventory"}</td><td className="py-3 pr-4 align-top">{"In-stock rate (SKUs)"}</td><td className="py-3 pr-4 align-top">{"96%"}</td><td className="py-3 pr-4 align-top">{"97%"}</td><td className="py-3 pr-4 align-top">{"88%"}</td><td className="py-3 pr-4 align-top">{"98%"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Inventory"}</td><td className="py-3 pr-4 align-top">{"SKUs below reorder point"}</td><td className="py-3 pr-4 align-top">{"3"}</td><td className="py-3 pr-4 align-top">{"1"}</td><td className="py-3 pr-4 align-top">{"n/a"}</td><td className="py-3 pr-4 align-top">{"0"}</td><td className="py-3 pr-4 align-top">{"Act"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Protection"}</td><td className="py-3 pr-4 align-top">{"Unauthorized sellers found / removed"}</td><td className="py-3 pr-4 align-top">{"4 / 3"}</td><td className="py-3 pr-4 align-top">{"2 / 2"}</td><td className="py-3 pr-4 align-top">{"n/a"}</td><td className="py-3 pr-4 align-top">{"All removed"}</td><td className="py-3 pr-4 align-top">{"Watch"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Protection"}</td><td className="py-3 pr-4 align-top">{"Open MAP violations"}</td><td className="py-3 pr-4 align-top">{"1"}</td><td className="py-3 pr-4 align-top">{"0"}</td><td className="py-3 pr-4 align-top">{"n/a"}</td><td className="py-3 pr-4 align-top">{"0"}</td><td className="py-3 pr-4 align-top">{"Act"}</td></tr></tbody></table></div>
        <p className="text-gray-300 leading-relaxed mb-4">{"Below the table, a short notes block explains the story in plain words. For this illustrative week: sales grew, but ad spend grew faster, so TACoS rose a point and contribution margin fell. Organic share dipped at the same time, which suggests a rank or Buy Box issue on a top SKU. Three SKUs are below their "}<Link href="/knowledge-base/reorder-point-logic-explained" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"reorder points"}</Link>{" and need purchase orders."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How should each metric be shown?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Always with comparisons."}</strong>{" A number alone means nothing. Show last week, the same week last year (for seasonality) and the target."}</li><li><strong className="text-white">{"With a status, not a color only."}</strong>{" Use words such as \"On track\", \"Watch\" and \"Act\" so the page reads in black and white too."}</li><li><strong className="text-white">{"In dollars and percentages for profit."}</strong>{" Margin percentage can rise while margin dollars fall."}</li><li><strong className="text-white">{"With a 4 to 13 week trend line"}</strong>{" for the top metrics, since one week is noisy."}</li><li><strong className="text-white">{"With a drill-down"}</strong>{" to marketplace and top 10 SKUs, so the \"why\" is easy to find."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"What should be left off?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li>{"Keyword-level ad data. That belongs in the advertising review."}</li><li>{"Vanity totals such as impressions with no link to sales."}</li><li>{"Metrics nobody owns. If a number has no owner and no action, remove it."}</li><li>{"Blended averages without a SKU view. An account average can hide a few SKUs losing money."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you build one?"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li>{"Pull marketplace sales, ad and inventory reports on a fixed day each week, for the same seven-day window every time."}</li><li>{"Join them by SKU and marketplace in one sheet or BI tool."}</li><li>{"Calculate contribution margin using actual fees, fulfillment, ads and an estimate for returns."}</li><li>{"Set targets for each metric, then add status rules (for example \"Watch\" if more than 5% off target)."}</li><li>{"Write the notes block and decisions list before the meeting, not during it."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic is a wholesale trade partner: it buys the brand's inventory upfront at wholesale and pays the ads, marketplace fees and fulfillment itself. So the dashboard is Epic's own operating view of its business, not a report produced to justify a retainer. The same metrics drive Epic's weekly Execute cycle, where pricing, bids, reorders and enforcement actions are decided. Brand partners get a shared dashboard from day one, monthly reports covering sales, rank, advertising, Subscribe & Save and inventory, and quarterly business reviews."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Why weekly and not daily?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Daily numbers are noisy and invite overreaction. Weekly is fast enough to catch problems and slow enough to show real trends. Daily alerts can still cover stockouts and "}<Link href="/knowledge-base/amazon-marketplace-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"Buy Box"}</Link>{" loss."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What is the single most important metric?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Contribution margin, because it shows whether sales growth is profitable after ads, fees, fulfillment and returns."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Should the dashboard cover every marketplace?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes, with a total line and a row per marketplace, so a problem in one channel is not hidden by growth in another."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How many metrics is too many?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"If it does not fit on one page, it is too many. Around 12 to 15 is a practical limit."}</p>
      </section>
    </div>
  ),
  'weekly-operating-cadence-doc': () => (
    <div className="space-y-8">
      <section>
        <p className="text-gray-300 leading-relaxed mb-4">{"A weekly "}<Link href="/knowledge-base/marketplace-operating-cadence" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"operating cadence"}</Link>{" is a fixed schedule that tells a marketplace team what to review, decide and fix on each day of the week. It turns the work of running Amazon, Walmart and other marketplaces (listings, ads, inventory, pricing and brand protection) into a repeatable loop, so problems are caught within days instead of at month end."}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{"The template below is built for a small team or a single operator. Adjust the days to match when your marketplace reports refresh."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"Why does a fixed cadence matter?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Marketplaces change daily."}</strong>{" Prices, competitors, Buy Box ownership, search rank and stock levels all move without warning."}</li><li><strong className="text-white">{"Most damage is slow and quiet."}</strong>{" A suppressed listing, a hijacked offer or a SKU drifting toward a stockout rarely triggers an alert on its own."}</li><li><strong className="text-white">{"Decisions need data from the same window."}</strong>{" Reviewing ads on Monday and inventory on Thursday with different date ranges leads to conflicting conclusions."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The template: weekly schedule"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Day"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Focus"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Tasks"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Output"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Owner"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Monday"}</td><td className="py-3 pr-4 align-top">{"Data and dashboard"}</td><td className="py-3 pr-4 align-top">{"Pull last week's sales, ad, inventory and Buy Box reports for the same 7-day window. Update the weekly executive dashboard. Flag every metric outside target."}</td><td className="py-3 pr-4 align-top">{"Updated dashboard and list of flags"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Monday"}</td><td className="py-3 pr-4 align-top">{"Weekly review meeting (30 to 45 min)"}</td><td className="py-3 pr-4 align-top">{"Walk the dashboard. Agree on the top 3 to 5 priorities and owners for the week."}</td><td className="py-3 pr-4 align-top">{"Action list with owners and due dates"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Tuesday"}</td><td className="py-3 pr-4 align-top">{"Advertising"}</td><td className="py-3 pr-4 align-top">{"Harvest converting search terms into exact match. Add negatives for wasted spend. Adjust bids by target ACoS and TACoS. Check budgets that ran out early."}</td><td className="py-3 pr-4 align-top">{"Bid and keyword change log"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Wednesday"}</td><td className="py-3 pr-4 align-top">{"Inventory and purchasing"}</td><td className="py-3 pr-4 align-top">{"Refresh the reorder model. Place purchase orders for SKUs at or below reorder point. Check inbound shipments and check-in delays. Review aged stock and storage fees."}</td><td className="py-3 pr-4 align-top">{"POs placed, shipment plan, at-risk SKU list"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Thursday"}</td><td className="py-3 pr-4 align-top">{"Catalog and listings"}</td><td className="py-3 pr-4 align-top">{"Check for suppressed or inactive listings, changed titles or images, and broken variations. Review new reviews and questions. Run one listing improvement or test."}</td><td className="py-3 pr-4 align-top">{"Catalog issue log, test status"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Friday"}</td><td className="py-3 pr-4 align-top">{"Pricing and brand protection"}</td><td className="py-3 pr-4 align-top">{"Check MAP compliance and new unauthorized sellers. File or follow up on enforcement actions. Check price index against key competitors. Plan next week's promotions."}</td><td className="py-3 pr-4 align-top">{"Enforcement log, pricing changes"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Daily (10 min)"}</td><td className="py-3 pr-4 align-top">{"Alerts"}</td><td className="py-3 pr-4 align-top">{"Stockouts, Buy Box loss on top SKUs, listing suppressions, account health warnings."}</td><td className="py-3 pr-4 align-top">{"Same-day fix or escalation"}</td><td className="py-3 pr-4 align-top">{"Assign one person"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The template: weekly review meeting agenda"}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Scorecard (10 min):"}</strong>{" total sales, contribution margin, TACoS, conversion rate, Buy Box %, weeks of cover, in-stock rate. Compare with last week, last year and target."}</li><li><strong className="text-white">{"Last week's actions (5 min):"}</strong>{" done, not done, and what changed as a result."}</li><li><strong className="text-white">{"Exceptions (15 min):"}</strong>{" only the metrics and SKUs flagged on Monday. Ask what caused each one before deciding a fix."}</li><li><strong className="text-white">{"Decisions (5 to 10 min):"}</strong>{" purchase orders, price changes, budget shifts, enforcement escalations."}</li><li><strong className="text-white">{"This week's priorities (5 min):"}</strong>{" three to five items, each with one owner and a due date."}</li></ol>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The template: monthly and quarterly add-ons"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Cadence"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Review"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Questions to answer"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Monthly"}</td><td className="py-3 pr-4 align-top">{"SKU profitability"}</td><td className="py-3 pr-4 align-top">{"Which SKUs have negative contribution margin after ads and returns? Fix, reprice or cut?"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Monthly"}</td><td className="py-3 pr-4 align-top">{"Lead times and safety stock"}</td><td className="py-3 pr-4 align-top">{"Have actual lead times changed? Are service levels right for each SKU group?"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Monthly"}</td><td className="py-3 pr-4 align-top">{"Ad structure"}</td><td className="py-3 pr-4 align-top">{"Are campaigns still organized by intent? Is branded spend defending or cannibalizing organic?"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Quarterly"}</td><td className="py-3 pr-4 align-top">{"Marketplace and region mix"}</td><td className="py-3 pr-4 align-top">{"Which marketplaces or countries should get more inventory and ad budget? Any new launches?"}</td></tr><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Quarterly"}</td><td className="py-3 pr-4 align-top">{"Seasonal plan"}</td><td className="py-3 pr-4 align-top">{"What inventory and promotions are needed for the next peak period, given lead times?"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"The template: weekly action log"}</h2>
        <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/20 overflow-x-auto mb-4"><table className="w-full text-left"><thead><tr className="border-b border-cyan-500/20"><th className="pb-3 pr-4 text-white font-semibold">{"Week of"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Issue or opportunity"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Action"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Owner"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Due"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Status"}</th><th className="pb-3 pr-4 text-white font-semibold">{"Result"}</th></tr></thead><tbody className="text-gray-300"><tr className="border-b border-white/5"><td className="py-3 pr-4 align-top">{"Week start date"}</td><td className="py-3 pr-4 align-top">{"Example: Buy Box % dropped on top SKU"}</td><td className="py-3 pr-4 align-top">{"Example: identify new seller, file report, check MAP"}</td><td className="py-3 pr-4 align-top">{"Name"}</td><td className="py-3 pr-4 align-top">{"Due date"}</td><td className="py-3 pr-4 align-top">{"Open or Done"}</td><td className="py-3 pr-4 align-top">{"What changed"}</td></tr></tbody></table></div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How do you make the cadence stick?"}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4"><li><strong className="text-white">{"Same day, same time."}</strong>{" Put each block on the calendar as a recurring event."}</li><li><strong className="text-white">{"One owner per area."}</strong>{" Shared ownership means nobody checks."}</li><li><strong className="text-white">{"Write it down."}</strong>{" Change logs for bids, prices and listings let you connect results to actions."}</li><li><strong className="text-white">{"Keep the meeting short."}</strong>{" Discuss exceptions, not every metric that is on track."}</li><li><strong className="text-white">{"Review the cadence itself"}</strong>{" every quarter and drop steps that never lead to action."}</li></ul>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"How Epic handles this"}</h2>
        <p className="text-gray-300 leading-relaxed mb-4">{"Epic runs this kind of weekly loop as the Execute stage of its operating process (Assess, Build, Execute, Scale). Because Epic is a wholesale trade partner, it buys the brand's inventory upfront at wholesale and pays the ads, marketplace fees and fulfillment, so the weekly work on listings, bids, reorders and enforcement is Epic's own job, done by Epic's team. The brand does not need to staff this cadence; its role is to supply product, data and approvals when needed. Brand partners get a shared dashboard from day one, monthly reports and quarterly business reviews."}</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">{"FAQ"}</h2>
        <h3 className="text-xl font-semibold mb-3 text-white">{"How long does the weekly cadence take?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"For a small catalog, roughly half a day to a day of focused work per week plus daily alert checks. Larger catalogs need dedicated owners per area."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Which day should the review meeting be?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Early in the week, once the prior week's data is complete, so decisions can be acted on the same week."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"Does this work for Walmart, eBay and TikTok Shop?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Yes. Keep the same days and add a row per marketplace to the dashboard and action log."}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{"What should trigger action between weekly reviews?"}</h3>
        <p className="text-gray-300 leading-relaxed mb-4">{"Stockouts, "}<Link href="/knowledge-base/amazon-marketplace-glossary" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300">{"Buy Box"}</Link>{" loss on top SKUs, suppressed listings and account health warnings. Those go through the daily alert check."}</p>
      </section>
    </div>
  ),
};

// Default "Coming Soon" component for articles without content
const ComingSoonArticle = () => (
  <div className="space-y-8">
    <section className="text-center py-16">
      <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-xl rounded-xl p-12 border border-yellow-500/20">
        <div className="mb-6">
          <span className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-full text-sm font-semibold">
            Coming Soon
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">This Article Is In Progress</h2>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
          We're currently developing this content. Check back soon for detailed insights, frameworks, and actionable guidance.
        </p>
        <p className="text-sm text-gray-400">
          Looking for an answer in the meantime?{' '}
          <a href="/faq" className="text-cyan-400 hover:text-cyan-300 underline">
            Browse the FAQ
          </a>
        </p>
      </div>
    </section>
  </div>
);

// Helper function to get article content with fallback
export const getArticleContent = (slug: string): (() => JSX.Element) => {
  return articleContent[slug] || ComingSoonArticle;
};

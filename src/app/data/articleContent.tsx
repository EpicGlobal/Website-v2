import { CheckCircle2, AlertCircle } from 'lucide-react';

// This file contains the actual content for each knowledge base article
// Each article is a React component that can be imported and rendered

export const articleContent: Record<string, () => JSX.Element> = {
  'what-is-epic-global-inc': () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Definition</h2>
        <p className="text-gray-300 leading-relaxed">
          Epic Global Inc. is a global marketplace operator and technology platform that purchases inventory at wholesale and runs end-to-end eCommerce execution across marketplaces worldwide. We cover operating costs like advertising, marketplace fees, and fulfillment, so incentives stay aligned.
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
        <h2 className="text-3xl font-bold mb-4 text-white">How Epic Approaches It</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">1. We Purchase Inventory</h3>
            <p className="text-gray-300">
              We buy your inventory at wholesale pricing and take ownership. This means we have real skin in the game—our success is tied to retail performance, not billable hours.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">2. We Operate Retail Sales</h3>
            <p className="text-gray-300">
              We manage day-to-day execution: listings, advertising, pricing, inventory allocation, compliance, and brand protection across approved marketplaces.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-white">3. We Cover Operating Expenses</h3>
            <p className="text-gray-300">
              Advertising spend, marketplace fees, and fulfillment costs are covered by us. You get predictable wholesale revenue; we take on retail execution risk.
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
            <h4 className="font-semibold text-cyan-400 mb-1">How Our Model Works</h4>
            <p className="text-sm text-gray-400">Deep dive into Buy–Sell–Advertise–Protect</p>
          </a>
          <a href="/knowledge-base/who-we-are-fit-for" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h4 className="font-semibold text-cyan-400 mb-1">Who We're a Fit For</h4>
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
          Epic is the world's first Zero-Risk Global Commerce Operator. We operate a performance-based model that removes risk from marketplace growth by assuming it ourselves. We purchase inventory upfront, operate marketplace storefronts end-to-end, fund advertising and logistics, and protect brand equity — while the brand carries zero operational burden and does not get trapped in a model where they pay retainers, fund spend, and hope the numbers work out.
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
          Epic is the Zero-Risk Global Commerce Operator category.
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
            <h4 className="font-semibold text-cyan-400 mb-1">What is Epic Global Inc</h4>
            <p className="text-sm text-gray-400">Foundational explanation for brand partners</p>
          </a>
          <a href="/case-studies" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h4 className="font-semibold text-cyan-400 mb-1">Case Studies</h4>
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
            <h4 className="font-semibold text-cyan-400 mb-1">How Our Model Works</h4>
            <p className="text-sm text-gray-400">Deep dive into Buy–Sell–Advertise–Protect</p>
          </a>
          <a href="/contact" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h4 className="font-semibold text-cyan-400 mb-1">Request an Assessment</h4>
            <p className="text-sm text-gray-400">Let's evaluate if we're a fit</p>
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
        <h2 className="text-3xl font-bold mb-6 text-white">The Epic category: the Zero-Risk Commerce Operator</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Epic is an Operator. We assume risk and run the marketplace business end-to-end.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          Our model is built on the <strong className="text-white">Purchase, Expand, Cover (PEC)</strong> framework:
        </p>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">PURCHASE</h3>
            <p className="text-gray-300">
              Epic purchases your inventory upfront at wholesale. This converts inventory into cash and removes the "sitting stock" risk from your balance sheet.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">EXPAND</h3>
            <p className="text-gray-300">
              We operate marketplaces end-to-end. Not just "management"—we run the operating cadence: catalog execution, pricing discipline, listing performance, and the system that keeps performance stable.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3 text-white">COVER</h3>
            <p className="text-gray-300">
              Epic covers the costs that normally make growth risky. We fund the advertising and carry the operational load required to scale. When performance dips, our capital is exposed—not yours.
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
          Epic Global Inc. is the world's first Zero-Risk Global Commerce Operator. We purchase inventory upfront, operate marketplace storefronts end to end, fund all advertising and logistics, and protect brand equity—while you carry zero risk and zero operational burden.
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
            <h4 className="font-semibold text-cyan-400 mb-1">How Our Model Works</h4>
            <p className="text-sm text-gray-400">Understanding the Buy–Sell–Advertise–Protect framework</p>
          </a>
          <a href="/knowledge-base/who-we-are-fit-for" className="block p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
            <h4 className="font-semibold text-cyan-400 mb-1">Who We're a Fit For</h4>
            <p className="text-sm text-gray-400">Brand criteria and requirements</p>
          </a>
        </div>
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
          Have questions in the meantime?{' '}
          <a href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
            Reach out to our team
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
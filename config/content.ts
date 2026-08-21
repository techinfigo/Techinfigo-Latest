/**
 * The copy the site ships with.
 *
 * DEFAULTS, NOT LIVE VALUES — exactly the relationship config/site.ts has with
 * the settings document. Every string here is what currently renders, lifted
 * verbatim out of the components so that an empty, missing or unreachable
 * Firestore leaves the public site reading precisely as it does today. Nothing
 * here is a placeholder, and nothing was deleted from the codebase to put it
 * here: this file *is* the copy now, and the components read it through
 * lib/content.ts, which layers anything saved in the admin panel on top.
 *
 * Do not delete an entry to "clean up" after it has been edited in the panel.
 * The saved value can vanish — a wiped database, a failed read, a fresh
 * environment — and when it does this is what the visitor sees.
 *
 * ICONS ARE NOT CONTENT. They are `lucide-react` components and inline SVGs in
 * the markup, and a Firestore document cannot hold a React element. Each record
 * carries an `icon` *key* instead, and the component maps the key to the actual
 * glyph. An editor changes words; an icon change is a code change.
 */

export const DEFAULT_CONTENT = {
  home: {
    hero: {
      eyebrow: 'Profit-First Growth for D2C Brands',
      // Split at the styled tail rather than stored with markup: the <br>s in
      // the component are responsive layout, not content, and an editor should
      // never have to type a tag to get the yellow half right.
      headline: 'Scaling Revenue is Easy. Scaling',
      headlineAccent: 'Profit is Hard.',
      subhead:
        'We find the hidden profit leaks in your funnel and build the system to scale your bottom line.',
      ctaLabel: 'Get My Free Profit Audit',
      ctaNote: 'No Junior Account Managers. Only Strategists.',
    },

    /**
     * The scrolling strip under the hero. `capacityOff` is what shows when the
     * scarcity toggle in Settings is off — the slot-count variant is assembled
     * from the settings document and stays there.
     */
    marquee: {
      onboarding: 'Now onboarding our first founding D2C partners',
      capacityOff: 'Senior strategists only — no junior account managers',
      offer: 'Founding-partner offer active',
    },

    painPoints: [
      {
        icon: 'trending-down',
        title: 'ROAS looks good, but margins are shrinking',
        desc: 'Platform data is inflating your ego while hidden costs kill your actual take-home pay.',
      },
      {
        icon: 'zap',
        title: 'Scaling increases revenue but kills profitability',
        desc: 'Whenever you push budgets, the unit economics crumble instantly, leaving you with less.',
      },
      {
        icon: 'shield-alert',
        title: 'Creatives burn out faster than you can replace them',
        desc: 'Ad fatigue hits within days because you lack a structured, high-velocity testing lab.',
      },
      {
        icon: 'bar-chart',
        title: 'You don’t know which product/ad is actually making money',
        desc: "Attribution mess means you're guessing where to put your next rupee of capital.",
      },
      {
        icon: 'alert-circle',
        title: 'Hidden costs (discounts, shipping, COD, returns) eating profit',
        desc: "The silent killers that don't show up on your Meta dashboard but drain your bank account.",
      },
    ],

    profitLeaks: [
      { text: 'ROAS looks good, but margins are shrinking' },
      { text: 'Scaling revenue kills my profitability' },
      { text: 'Creatives burn out faster than we replace them' },
      { text: 'Hidden costs (Logistics/COD) are eating my cash' },
      { text: 'Unsure which product/ad is actually making money' },
    ],

    protocolSteps: [
      { label: 'Diagnostic Audit' },
      { label: 'Margin Engineering' },
      { label: 'Scientific Testing' },
      { label: 'Profit Scaling' },
      { label: 'Asset Stabilization' },
    ],

    criteria: [
      {
        icon: 'zap',
        label: 'Spending ₹2L+/mo',
        description: 'You have a proven product and are already investing in traffic.',
      },
      {
        icon: 'target',
        label: 'Profit Focused',
        description: 'You care about bottom-line margins more than vanity ROAS.',
      },
      {
        icon: 'bar-chart',
        label: 'Stable Orders',
        description: 'You have consistent sales but your margins feel unstable.',
      },
      {
        icon: 'trending-up',
        label: 'Repeatable Growth',
        description: 'You want a system that works every month, not just by luck.',
      },
      {
        icon: 'settings',
        label: 'Backend Ready',
        description: 'You are willing to fix operations to support 10x volume.',
      },
    ],

    /**
     * Deliberately called insights, not testimonials. The section's own copy
     * says these are not client quotes, and naming the type after what it
     * actually holds stops someone pasting a fake endorsement into it later.
     */
    insightsIntro:
      'We don’t use fake testimonials. We share the brutal realizations D2C founders have after we audit their Performance Marketing numbers.',
    insights: [
      {
        label: 'Common Realization',
        text: 'Most founders think they’re growing because revenue is increasing — until they actually look at net profit. We\'ve seen ₹10Cr brands making less profit than ₹2Cr brands.',
      },
      {
        label: 'Insight 01',
        text: 'A 4x ROAS on a low-margin product is a loss. A 2.5x ROAS on a high-margin product is a goldmine.',
      },
      {
        label: 'Insight 02',
        text: 'Increasing ad spend without stable unit economics scales losses. We fix the foundation before we push the pedal.',
      },
      {
        label: 'The Retention Advantage',
        text: '"The profit isn\'t in the first purchase. It\'s in the 3rd, 4th, and 5th. If your backend retention isn\'t hitting 30%+, you\'re just renting customers, not owning a brand."',
      },
    ],
  },

  services: {
    pillars: [
      {
        slug: 'performance-ads',
        title: 'D2C Performance Ads (Meta + Google)',
        desc: 'Scale profitably with offer-led creative and full-funnel strategy.',
      },
      {
        slug: 'cro',
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'Convert more traffic into revenue with data-driven A/B testing.',
      },
      {
        slug: 'seo',
        title: 'eCommerce & D2C SEO',
        desc: 'Drive high-intent organic traffic by ranking for valuable keywords.',
      },
      {
        slug: 'retention',
        title: 'Email & SMS Retention Flows',
        desc: 'Boost LTV with automated flows that drive repeat purchases.',
      },
      {
        slug: 'automation',
        title: 'Marketing Automation',
        desc: 'Automate tasks and personalize journeys to scale efficiently.',
      },
      {
        slug: 'creative',
        title: 'Performance Creative Strategy',
        desc: 'Make creatives that stop thumbs and keep learning fresh.',
      },
    ],
  },

  howItWorks: {
    steps: [
      {
        num: '01',
        title: 'Funnel Audit',
        desc: 'Neutralizing leakages in unit economics before a single rupee is spent.',
      },
      {
        num: '02',
        title: 'Variable Testing',
        desc: 'Weekly creative sprints to isolate high-conviction hooks and angles.',
      },
      {
        num: '03',
        title: 'Stabilization',
        desc: 'Eliminating waste and establishing a predictable baseline CAC.',
      },
      {
        num: '04',
        title: 'Controlled Scale',
        desc: 'Injecting capital into proven creative/offer clusters with MER guardrails.',
      },
      {
        num: '05',
        title: 'LTV Optimization',
        desc: 'Compounding the back-end through high-retention automation loops.',
      },
    ],
  },

  qualification: {
    greenLights: [
      {
        title: 'Profitable Foundation',
        desc: "You are currently doing ₹50L–₹5Cr monthly and have a product that people actually want. We don't fix broken business models; we scale winners.",
      },
      {
        title: 'Growth Mindset',
        desc: "You aren't looking for a 'miracle month'. You understand that building a dominant D2C brand requires consistency, testing velocity, and a systems-first approach.",
      },
      {
        title: 'Strong Unit Economics',
        desc: 'You know your COGS and contribution margins. You understand that scale is only healthy if the economics support high-intensity acquisition.',
      },
      {
        title: 'Operational Scalability',
        desc: 'Your backend — supply chain, fulfillment, and customer support — is ready to handle 2x–5x volume without collapsing under the pressure of growth.',
      },
    ],
    redFlags: [
      {
        title: 'Short-Term Thinking',
        desc: "If you need a 'miracle month' just to keep the lights on, we aren't the right fit. We build high-performance systems, not gambling strategies.",
      },
      {
        title: 'Razor-Thin Margins',
        desc: "If your product margins don't allow for scalable acquisition costs, no amount of 'optimization' can fix a broken business model.",
      },
      {
        title: 'Data Silos',
        desc: "We require full transparency into your numbers. If you aren't ready to share your true contribution margins, we can't optimize for profit.",
      },
      {
        title: 'Fixed Mindsets',
        desc: "Our system thrives on testing new funnels, offers, and creatives. If you are married to 'your way' of doing things, we'll reach a ceiling early.",
      },
    ],
  },

  agra: {
    faqs: [
      {
        q: 'How much does digital marketing cost in Agra?',
        a: "Our pricing is performance-linked. We don't have 'packages'. We build custom growth plans based on your revenue goals. Whether you're a small business in Kamla Nagar or a large brand in Sanjay Place, we ensure every rupee generates ROI.",
      },
      {
        q: 'How soon can I see results for my Agra business?',
        a: "For Paid Ads (FB/Google), you can see leads within 48-72 hours. For SEO in Agra, it typically takes 3-6 months to dominate local search results. We focus on 'quick wins' while building long-term assets for your brand.",
      },
      {
        q: 'Do you work with local retail stores in Agra?',
        a: 'Absolutely. We specialize in driving footfall and online sales for Agra-based retail stores, showrooms, and D2C brands. We understand the local consumer behavior in markets like Shahganj and Raja Ki Mandi.',
      },
    ],
  },
} as const;

/**
 * Case studies ship as defaults too, but unlike the page copy they are a
 * *collection* in Firestore rather than a field on a document — they are added
 * and removed over time, they need an order, and a half-written one must not
 * appear on the public site. See lib/content-schema.ts.
 *
 * These two are benchmarks, not delivered client results, which is why the
 * brand names read as targets and the proof disclaimer applies. Anything added
 * through the panel that describes a real client should say so plainly.
 */
export const DEFAULT_CASE_STUDIES = [
  {
    slug: 'skincare-bench',
    brand: 'Skincare Scaling Target',
    category: 'Skincare',
    before: {
      spend: '₹12L/month',
      roas: '4.8x',
      profit: '₹1.2L',
      pain: 'Industry leak: High CAC & unstable scaling',
    },
    after: {
      spend: '₹12L',
      profit: '₹5.6L/month',
      cacReduction: '32%',
      gain: 'Target Profitability State',
    },
    highlight: 'Goal: Increase Profit 4.6x Without Increasing Ad Spend',
    details: {
      overview: {
        industry: 'Personal Care / Skincare',
        revenue: '₹50L - ₹1Cr / month',
        spend: '₹12L / month',
      },
      problem:
        'Common plateau: Revenue scales but profit stays flat due to unoptimized unit economics.',
      diagnosis: [
        'High CAC baseline due to broad targeting.',
        'Weak backend retention patterns (Common in Q3).',
        'Inefficient scaling without stabilizing contribution margins.',
      ],
      solution: [
        'Funnel Optimization: Targeting 4%+ Conversion Rate.',
        'Unit Economics: Improving AOV through strategic bundling.',
        'Profit Focus: Creative hooks that attract high-LTV buyers.',
        'LTV Model: Building 90-day retention predictability.',
      ],
      results: {
        profitBefore: '₹1.2L',
        profitAfter: '₹5.6L (Target)',
        cacImprovement: '32% Reduction (Benchmark)',
        timeline: '75-90 Days',
      },
      quote:
        'This represents the typical profit recovery we identify during our initial audit process for skincare brands.',
    },
    published: true,
    order: 0,
  },
  {
    slug: 'apparel-bench',
    brand: 'Apparel Growth Target',
    category: 'Apparel',
    before: {
      spend: '₹8L/month',
      roas: '3.2x',
      profit: '₹80K',
      pain: 'Industry leak: Low AOV & high return rates',
    },
    after: {
      spend: '₹10L',
      profit: '₹3.8L/month',
      cacReduction: '24%',
      gain: 'Optimized Margin State',
    },
    highlight: 'Goal: Grow Net Profit 4.7x While Scaling Spend Sustainably',
    details: {
      overview: {
        industry: 'Fashion & Apparel',
        revenue: '₹30L - ₹50L / month',
        spend: '₹8L / month',
      },
      problem:
        'The "Discount Trap": Revenue coming only during sales with unsustainable return rates.',
      diagnosis: [
        'Single-item purchase dependency lowering AOV.',
        'High RTO baseline (Common in India D2C).',
        'Price-led creative vs Value-led storytelling.',
      ],
      solution: [
        'Value-Based Creative: Shifting to Lifestyle hooks.',
        'RTO Control: Implementing automated COD verification.',
        'AOV Multiplier: Post-purchase upsell engine implementation.',
        'Margin Scaling: Prioritizing high-margin SKU scalability.',
      ],
      results: {
        profitBefore: '₹80K',
        profitAfter: '₹3.8L (Target)',
        cacImprovement: '24% Reduction (Benchmark)',
        timeline: '90 Days',
      },
      quote:
        'For apparel brands, the biggest lever is usually RTO control and AOV expansion before scaling spend.',
    },
    published: true,
    order: 1,
  },
] as const;

/** The filter chips on /case-studies. 'All' is the unfiltered view, not a category. */
export const CASE_STUDY_CATEGORIES = ['Skincare', 'Apparel', 'Supplements', 'Lifestyle'] as const;

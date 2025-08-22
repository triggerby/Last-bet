export type Automation = {
  id: string;
  title: string;
  kpi: string;
  oneLiner: string;
  image: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const automations: Automation[] = [
  // Carousel A (First 3 - Recovery)
  {
    id: "cart-recovery-engine",
    title: "Cart Recovery Engine",
    kpi: "Recover 8–15% lost carts",
    oneLiner: "AI-powered abandoned cart recovery with personalized email sequences and smart timing",
    image: "/images/automations/cart-recovery-engine.png",
    badge: "Popular",
    ctaLabel: "Learn More",
    ctaHref: "#ai-overlay"
  },
  {
    id: "where-is-my-order",
    title: "Where Is My Order (WISMO)",
    kpi: "Tickets ↓ 30–60%",
    oneLiner: "Automated order tracking updates that reduce customer service inquiries dramatically",
    image: "/images/automations/where-is-my-order.png",
    ctaLabel: "Get Started",
    ctaHref: "#ai-overlay"
  },
  {
    id: "ad-budget-optimizer",
    title: "Ad Budget Optimizer",
    kpi: "Spend → winners",
    oneLiner: "Automatically reallocate ad spend to your highest-performing campaigns in real-time",
    image: "/images/automations/ad-budget-optimizer.png",
    ctaLabel: "Optimize Now",
    ctaHref: "#ai-overlay"
  },
  
  // Carousel B (Next 4 - Optimization)
  {
    id: "attribution-protector",
    title: "Attribution Protector",
    kpi: "ROAS you trust",
    oneLiner: "Server-side tracking that maintains accurate attribution despite iOS 14.5+ changes",
    image: "/images/automations/attribution-protector.png",
    badge: "New",
    ctaLabel: "Protect ROAS",
    ctaHref: "#ai-overlay"
  },
  {
    id: "aov-booster",
    title: "AOV Booster",
    kpi: "AOV +10–20%",
    oneLiner: "Smart upsells and cross-sells powered by customer behavior analysis and AI recommendations",
    image: "/images/automations/aov-booster.png",
    ctaLabel: "Boost AOV",
    ctaHref: "#ai-overlay"
  },
  {
    id: "profit-maximizer",
    title: "Profit Maximizer",
    kpi: "Margin ↑",
    oneLiner: "Dynamic pricing optimization that maximizes profit margins while maintaining competitiveness",
    image: "/images/automations/profit-maximizer.png",
    ctaLabel: "Maximize Profit",
    ctaHref: "#ai-overlay"
  },
  {
    id: "fraud-shield",
    title: "Fraud Shield",
    kpi: "False positives ↓",
    oneLiner: "AI fraud detection that blocks bad actors while reducing legitimate order rejections",
    image: "/images/automations/fraud-shield.png",
    ctaLabel: "Shield Store",
    ctaHref: "#ai-overlay"
  },
  
  // Carousel C (Last 3 - Protection)
  {
    id: "loss-preventer",
    title: "Loss Preventer",
    kpi: "Leakage ↓",
    oneLiner: "Identify and plug revenue leaks across your entire customer journey automatically",
    image: "/images/automations/loss-preventer.png",
    ctaLabel: "Prevent Loss",
    ctaHref: "#ai-overlay"
  },
  {
    id: "chargeback-winner",
    title: "Chargeback Winner",
    kpi: "Win rate ↑",
    oneLiner: "Automated chargeback dispute management with AI-generated evidence and responses",
    image: "/images/automations/chargeback-winner.png",
    ctaLabel: "Win Disputes",
    ctaHref: "#ai-overlay"
  },
  {
    id: "inventory-guard",
    title: "Inventory Guard",
    kpi: "Stockouts ↓",
    oneLiner: "Predictive inventory management that prevents stockouts and reduces overstock situations",
    image: "/images/automations/inventory-guard.png",
    ctaLabel: "Guard Inventory",
    ctaHref: "#ai-overlay"
  }
];
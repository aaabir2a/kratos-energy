export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Guides" | "Rebates" | "Battery" | "News";
  date: string;
  readMins: number;
  author: string;
  cover: string;
  /** Body as an array of paragraphs / headings. */
  body: { type: "h2" | "p" | "ul"; text?: string; items?: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "how-much-does-solar-cost-2025",
    title: "How much does solar really cost in Australia in 2025?",
    excerpt:
      "A clear breakdown of system prices, rebates and payback periods — so you know exactly what to expect before you buy.",
    category: "Guides",
    date: "2025-05-28",
    readMins: 6,
    author: "Kratos Energy",
    cover: "/assets/photo-panels.jpg",
    body: [
      { type: "p", text: "Solar pricing has never been more competitive — but the sticker price is only half the story. Here's how to think about the real cost of going solar in 2025." },
      { type: "h2", text: "Typical system prices" },
      { type: "p", text: "After federal STCs, a quality 6.6kW system typically lands around $3,990, a 10kW around $5,490, and a 13.2kW around $7,990. Commercial systems are quoted per site." },
      { type: "h2", text: "What drives the price" },
      { type: "ul", items: ["Panel and inverter brand (Tier 1 vs budget)", "Roof type, pitch and number of storeys", "Single vs three-phase connection", "Whether you add a battery or EV charger"] },
      { type: "h2", text: "Payback period" },
      { type: "p", text: "Most Australian households see payback in 3–5 years, after which the system effectively pays you. Use our savings calculator to model your own numbers." },
    ],
  },
  {
    slug: "is-a-home-battery-worth-it",
    title: "Is a home battery worth it in 2025?",
    excerpt:
      "Batteries are cheaper than ever and rebates are generous — but the maths depends on how you use power. Here's the honest answer.",
    category: "Battery",
    date: "2025-05-15",
    readMins: 7,
    author: "Kratos Energy",
    cover: "/assets/photo-panel-battery.jpg",
    body: [
      { type: "p", text: "A battery lets you store daytime solar for use at night, slashing your reliance on the grid. Whether it pays depends on your usage pattern and local rebates." },
      { type: "h2", text: "When a battery makes sense" },
      { type: "ul", items: ["You're home in the evenings and use a lot of power then", "Your state offers a battery rebate or loan", "You want backup during blackouts", "You have or plan to get an EV"] },
      { type: "h2", text: "The numbers" },
      { type: "p", text: "With current battery rebates in states like VIC, ACT and NT, payback has dropped to well under ten years for many households — and keeps improving as power prices rise." },
    ],
  },
  {
    slug: "solar-rebates-explained",
    title: "Solar rebates explained: STCs, state schemes and how to claim",
    excerpt:
      "Federal STCs, state rebates and battery schemes can stack to thousands off your system. Here's how each one works.",
    category: "Rebates",
    date: "2025-04-30",
    readMins: 5,
    author: "Kratos Energy",
    cover: "/assets/photo-family-house.jpg",
    body: [
      { type: "p", text: "Australia's solar incentives are some of the best in the world — but they step down every year. Here's what's on the table and how Kratos claims it for you." },
      { type: "h2", text: "Federal STCs" },
      { type: "p", text: "Small-scale Technology Certificates are applied as an upfront discount at the point of sale. The value depends on your system size and location's solar zone." },
      { type: "h2", text: "State schemes" },
      { type: "p", text: "On top of STCs, states like VIC, NSW, ACT and NT offer their own rebates and interest-free loans, especially for batteries. Use our rebate explorer to see yours." },
    ],
  },
  {
    slug: "choosing-the-right-system-size",
    title: "6.6kW, 10kW or 13.2kW? Choosing the right system size",
    excerpt:
      "Bigger isn't always better. Match your system to your roof, your bill and your future plans with this quick guide.",
    category: "Guides",
    date: "2025-04-12",
    readMins: 4,
    author: "Kratos Energy",
    cover: "/assets/photo-panels.jpg",
    body: [
      { type: "p", text: "The right system size balances your current usage with room to grow. Here's a rule-of-thumb for the most popular sizes." },
      { type: "h2", text: "Quick guide" },
      { type: "ul", items: ["6.6kW — small homes, bills around $250–350/mo", "10kW — medium homes with air-con or a pool", "13.2kW — large homes, high usage, three-phase", "20kW+ — estates and light commercial"] },
      { type: "p", text: "If you're planning a battery or EV, size up — the extra generation pays off quickly." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

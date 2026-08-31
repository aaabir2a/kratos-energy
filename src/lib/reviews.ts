export type Review = {
  /** Verbatim review text. */
  q: string;
  /** Reviewer name as shown on Google. */
  n: string;
  /** Relative time as shown on Google. */
  when: string;
  /** Only set when the reviewer named their system. */
  sys?: string;
};

/** Official Google Business review link. */
export const GOOGLE_REVIEW_LINK = "https://g.page/r/CYG04XozugInEBM/review";

/** Verbatim 5-star Google reviews (data/Customer Reviews.pdf). */
export const REVIEWS: Review[] = [
  {
    q: "I am very happy to recommend Kratos Energy to anyone planning to install a solar panel and battery system at home. I found their pricing fair and affordable, and the service both before and on installation day was excellent. Thank you, Nessar and Wei.",
    n: "Robyn Brookfield",
    when: "9 months ago",
  },
  {
    q: "Kratos Energy completed our solar system seamlessly, and we are very satisfied with the entire process and results. They offered a very reasonable price for the same products and services compared to other providers. A special mention to Nessar, who worked hard and efficiently throughout the process. Highly recommended to future customers.",
    n: "Alan Gui",
    when: "1 year ago",
  },
  {
    q: "I'd like to thank Nessar and my neighbour Hasan for doing a wonderful job organising the installation of solar panels on my house. Wei and his team worked incredibly hard, especially since my home is double-storey, making the installation quite challenging. They spent the entire day ensuring everything was completed correctly. I'm very happy with the service.",
    n: "Legend",
    when: "9 months ago",
  },
  {
    q: "I am more than happy to recommend this company. Communication throughout the entire process was clear and prompt. Wei and the installation team kept me informed, left the property clean, and removed all rubbish. Mike, my salesperson, was knowledgeable, thorough, and genuinely took the time to answer my questions. Excellent service from start to finish.",
    n: "Jo Lister",
    when: "1 year ago",
  },
  {
    q: "I installed a 10.13kW solar system and am extremely happy with the product (Sungrow inverter and Trina panels) as well as the price. Mr. Nessar, CEO of Kratos Energy, is dependable and true to his word. He provided detailed information, a competitive quotation, and completed the installation within a week. The electricians were highly professional and took great care with my roof tiles.",
    n: "Md. Mijanur Rahman",
    when: "1 year ago",
    sys: "10.13kW System",
  },
  {
    q: "Kratos Energy arranged my solar battery installation, and the entire process went very smoothly. I was kept informed every step of the way. Logan from LJ Electrical arrived on time and completed an excellent installation. He explained everything clearly and even helped me install the monitoring app before leaving.",
    n: "Paul Phillips",
    when: "8 months ago",
  },
  {
    q: "We added a battery to our existing solar system, and the service was handled with minimal interruption. Ordering the parts and arranging installation was smooth and efficient. Kratos Energy and their team were wonderful to deal with, and I highly recommend them for their professionalism and ongoing customer support.",
    n: "Natalie Cootes",
    when: "3 years ago",
  },
  {
    q: "Highly appreciated and recommended. As a customer, you can deal directly with Nessar Khan and his team, ask questions, and receive clear answers for complete peace of mind. Thank you to Nessar and the team.",
    n: "Saleem Muhammad",
    when: "1 year ago",
  },
  {
    q: "I'm so pleased I chose Kratos Energy after comparing three different providers while building my home. Their pricing, product choices, and installation quality exceeded my expectations.",
    n: "Sukhneet Kaur",
    when: "4 years ago",
  },
  {
    q: "Friendly and professional throughout the entire process. The contractors were trustworthy and kept us well informed from beginning to end.",
    n: "Monir Younan",
    when: "8 months ago",
  },
  {
    q: "Loved the service and the quality of the products provided. The analysis and recommendations before installation were extremely helpful. Highly recommended.",
    n: "Areed Mohammad Nur",
    when: "1 year ago",
  },
  {
    q: "Kratos Energy offers different pricing options, allowing customers to choose what suits their needs. The quality of work was absolutely worth it, and the team went above and beyond during our solar installation.",
    n: "Sreejit Guha",
    when: "4 years ago",
  },
  {
    q: "I'm very happy with the installation, as well as the post-purchase follow-up and customer service. I will definitely recommend Kratos Energy to my friends and family.",
    n: "Natasha Miller",
    when: "4 years ago",
  },
  {
    q: "Informative website, excellent workmanship, and a great overall experience. Highly recommended.",
    n: "Rumne Khan",
    when: "4 years ago",
  },
];

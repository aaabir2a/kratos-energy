import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

type Story = {
  system: string;
  name: string;
  location: string;
  before: string;
  after: string;
  quote: string;
  photo: string;
};

const STORIES: Story[] = [
  {
    system: "12kW System",
    name: "The Kustome Family",
    location: "Penrith, NSW",
    before: "$600/qtr",
    after: "$35/qtr",
    quote:
      "Our bills used to average about $600 a quarter. After installation it came in around $35 — a genuinely good financial investment.",
    photo: "/assets/photo-family-house.jpg",
  },
  {
    system: "6.6kW System",
    name: "Ron Hinckley",
    location: "Newcastle, NSW",
    before: "$340/qtr",
    after: "In credit",
    quote:
      "I chose Kratos after doing my research. The contractors were efficient and did a great job. I'm now in energy credit in under a month.",
    photo: "/assets/photo-panels.jpg",
  },
  {
    system: "13.2kW System",
    name: "Roxana & Jason",
    location: "Wollongong, NSW",
    before: "$720/qtr",
    after: "$60/qtr",
    quote:
      "The information we got was so much better than other companies. Kratos reached our expectations in everything they did for us.",
    photo: "/assets/photo-panel-battery.jpg",
  },
];

export function CaseStudies() {
  return (
    <section id="projects" className="bg-white py-[84px]">
      <div className="container-ke">
        <div className="mb-11 text-center">
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Every system tells a savings story.
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] font-body text-lg text-ash-700">
            See the before-and-after on real homes we&rsquo;ve powered across the
            country.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {STORIES.map((s) => (
            <article
              key={s.name}
              className="ke-lift flex flex-col overflow-hidden rounded-lg border border-ash-200 bg-white shadow-md"
            >
              <div className="relative h-48">
                <Image
                  src={s.photo}
                  alt={`${s.name}, ${s.system}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-pill bg-white/95 px-3 py-1.5 font-display text-[12px] font-bold text-forest-700 shadow-sm">
                  {s.system}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Before / after */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-1 rounded-md bg-paper px-3 py-2.5 text-center">
                    <div className="font-body text-[11px] font-bold uppercase tracking-[0.05em] text-ash-500">
                      Before
                    </div>
                    <div className="font-display text-[16px] font-extrabold text-ash-700">
                      {s.before}
                    </div>
                  </div>
                  <Icon name="arrow" size={18} className="flex-none text-green-500" />
                  <div className="flex-1 rounded-md bg-green-50 px-3 py-2.5 text-center">
                    <div className="font-body text-[11px] font-bold uppercase tracking-[0.05em] text-forest-700">
                      After
                    </div>
                    <div className="font-display text-[16px] font-extrabold text-green-600">
                      {s.after}
                    </div>
                  </div>
                </div>

                <p className="mb-5 flex-1 font-body text-[14.5px] leading-relaxed text-ink">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className="border-t border-ash-200 pt-4">
                  <div className="font-display text-[15px] font-bold text-navy-700">
                    {s.name}
                  </div>
                  <div className="font-body text-[12.5px] text-ash-500">
                    {s.location}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

interface BlockData {
  id: string;
  type: string;
  content: any;
  settings?: any;
}

export function BlogBlockRenderer({
  blocks,
  postTitle,
}: {
  blocks: BlockData[];
  /** Used as last-resort alt text context for images the CMS left undescribed. */
  postTitle?: string;
}) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-8 font-body text-gray-700 leading-relaxed text-[16.5px]">
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} postTitle={postTitle} />
      ))}
    </div>
  );
}

/** Post titles carry a " | Kratos Energy" suffix that adds nothing when read
 *  aloud as part of an image description. */
function articleContext(postTitle?: string): string {
  const clean = (postTitle || "").split("|")[0].trim();
  return clean ? `Illustration from the article: ${clean}` : "";
}

function RenderBlock({ block, postTitle }: { block: BlockData; postTitle?: string }) {
  switch (block.type) {
    case "text":
    case "texteditor":
      return (
        <div
          className="prose max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:text-navy-800 prose-h2:text-[24px] prose-h2:mt-8 prose-h2:mb-3 prose-p:mb-4 prose-a:text-[#8bc34a] prose-a:underline hover:prose-a:text-[#7cb342]"
          dangerouslySetInnerHTML={{ __html: typeof block.content === 'string' ? block.content : block.content?.html || '' }}
        />
      );

    case "image": {
      const { imageUrl, alt, caption } = block.content || {};
      if (!imageUrl) return null;
      return (
        <figure className="my-8 text-center">
          <div className="relative w-full h-[260px] sm:h-[420px] overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-gray-50">
            <Image
              src={imageUrl}
              // "Blog content image" told a screen-reader user nothing. Fall
              // back to the caption, then to the article this sits in; an
              // empty alt is better than a meaningless one, so undescribed
              // images on an untitled page are treated as decorative.
              alt={alt || caption || articleContext(postTitle)}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-[13px] text-gray-500 italic font-body">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "accordion":
      return <AccordionBlock items={block.content?.items} />;

    case "tabs":
      return <TabsBlock tabs={block.content?.tabs} />;

    case "card":
      return <CardsBlock items={block.content?.items} />;

    case "button": {
      const { text, url, alignment } = block.content || {};
      const align =
        alignment === "center"
          ? "justify-center"
          : alignment === "right"
          ? "justify-end"
          : "justify-start";
      return (
        <div className={`my-8 flex w-full ${align}`}>
          <a
            href={url || "#"}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-transparent text-[15px] font-display font-bold rounded-xl text-white bg-[#8bc34a] hover:bg-[#7cb342] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {text || "Click Here"}
          </a>
        </div>
      );
    }

    case "layout":
      return <LayoutGridBlock content={block.content} />;

    default:
      return null;
  }
}

// ── SUB-COMPONENTS ──

function AccordionBlock({ items }: { items?: any[] }) {
  if (!items || !Array.isArray(items)) return null;

  // <details>/<summary> rather than a JS toggle: the answer text ships in the
  // HTML even while collapsed, so crawlers and AI readers can see it. It also
  // keeps working without JS and gets native keyboard and screen-reader
  // behaviour for free.
  return (
    <div className="my-8 space-y-4">
      {items.map((item, idx) => (
        <details
          key={idx}
          className="group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-[#8bc34a]/60 hover:shadow-md open:border-[#8bc34a] open:shadow-md"
        >
          <summary className="flex min-h-[54px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left font-display text-[16px] font-bold leading-snug text-gray-900 transition-colors hover:text-[#8bc34a] group-open:bg-[#8bc34a] group-open:text-white [&::-webkit-details-marker]:hidden">
            <span className="flex-1 font-semibold">{item.title}</span>
            <Icon
              name="chevron"
              size={18}
              stroke={2.5}
              className="shrink-0 text-[#8bc34a] transition-transform duration-200 group-open:rotate-180 group-open:text-white"
            />
          </summary>
          <div className="border-t border-[#8bc34a]/20 bg-white px-6 py-5 font-body text-[15px] leading-relaxed text-gray-700">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}

function TabsBlock({ tabs }: { tabs?: any[] }) {
  const [activeTab, setActiveTab] = useState(0);
  if (!tabs || !Array.isArray(tabs)) return null;

  return (
    <div className="my-8 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="flex border-b border-gray-200 overflow-x-auto bg-slate-50/80 px-3 pt-3 gap-2">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-3 font-display text-[14.5px] font-bold rounded-t-xl transition-all border-b-2 text-center whitespace-nowrap ${
              activeTab === idx
                ? "border-[#8bc34a] text-[#8bc34a] bg-white shadow-xs"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {/* Every panel is rendered and the inactive ones are hidden with CSS.
          Rendering only the active tab kept the other panels out of the HTML
          entirely, so crawlers only ever saw one tab's worth of content. */}
      {tabs.map((tab, idx) => (
        <div
          key={idx}
          role="tabpanel"
          hidden={activeTab !== idx}
          className="p-6 font-body text-gray-700 text-[15px] leading-relaxed"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

function CardsBlock({ items }: { items?: any[] }) {
  if (!items || !Array.isArray(items)) return null;

  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col hover:shadow-md hover:border-[#8bc34a]/40 transition-all group"
        >
          {item.imageUrl && (
            <div className="h-48 relative bg-gray-50 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title || "Card image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="font-display font-bold text-gray-900 text-[17px] mb-2 leading-snug group-hover:text-[#8bc34a] transition-colors">
              {item.title}
            </h4>
            <p className="font-body text-gray-600 text-[14px] leading-relaxed flex-1">
              {item.description}
            </p>
            {item.link && (
              <a
                href={item.link}
                className="mt-4 inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-[#8bc34a] hover:underline"
              >
                Learn more <Icon name="chevron" size={12} className="-rotate-90 text-[#8bc34a]" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function LayoutGridBlock({ content }: { content: any }) {
  const {
    columns = 2,
    col1Type = "text",
    col1Text = "",
    col1Image = "",
    col2Type = "text",
    col2Text = "",
    col2Image = "",
    col3Type = "text",
    col3Text = "",
    col3Image = "",
  } = content || {};

  const gridCols =
    columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  const renderColumn = (type: "text" | "image", text: string, img: string) => {
    if (type === "image") {
      return img ? (
        <div className="relative w-full h-[220px] overflow-hidden rounded-xl bg-gray-50 shadow-sm border border-gray-100">
          <Image
            src={img}
            alt="Column media content"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ) : null;
    }
    return (
      <div
        className="prose max-w-none text-[15px] leading-relaxed font-body text-gray-700 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };

  return (
    <div className={`my-8 grid gap-6 ${gridCols}`}>
      <div className="flex flex-col">{renderColumn(col1Type, col1Text, col1Image)}</div>
      <div className="flex flex-col">{renderColumn(col2Type, col2Text, col2Image)}</div>
      {columns === 3 && (
        <div className="flex flex-col">{renderColumn(col3Type, col3Text, col3Image)}</div>
      )}
    </div>
  );
}


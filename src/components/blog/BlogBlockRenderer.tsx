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

export function BlogBlockRenderer({ blocks }: { blocks: BlockData[] }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-8 font-body text-gray-700 leading-relaxed text-[16.5px]">
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function RenderBlock({ block }: { block: BlockData }) {
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
              alt={alt || caption || "Blog content image"}
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
  const [openIdxs, setOpenIdxs] = useState<number[]>([]);
  if (!items || !Array.isArray(items)) return null;

  const toggle = (idx: number) => {
    setOpenIdxs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="my-8 space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIdxs.includes(idx);
        return (
          <div
            key={idx}
            className={`rounded-xl overflow-hidden shadow-sm transition-all duration-200 border ${
              isOpen
                ? "border-[#8bc34a] bg-white shadow-md"
                : "border-gray-200 bg-white hover:border-[#8bc34a]/60 hover:shadow-md"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className={`w-full flex items-center justify-between px-6 py-4 font-display font-bold text-left transition-colors text-[16px] leading-snug min-h-[54px] gap-4 ${
                isOpen
                  ? "bg-[#8bc34a] text-white"
                  : "bg-white text-gray-900 hover:text-[#8bc34a]"
              }`}
            >
              <span className="flex-1 font-semibold">{item.title}</span>
              <Icon
                name="chevron"
                size={18}
                stroke={2.5}
                className={`transition-transform duration-200 shrink-0 ${
                  isOpen ? "text-white rotate-180" : "text-[#8bc34a]"
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 py-5 text-gray-700 text-[15px] leading-relaxed font-body bg-white border-t border-[#8bc34a]/20">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
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
      <div className="p-6 font-body text-gray-700 text-[15px] leading-relaxed">
        {tabs[activeTab]?.content}
      </div>
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


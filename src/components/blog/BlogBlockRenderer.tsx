"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="space-y-8 font-body text-ash-700 leading-relaxed text-[16.5px]">
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
          className="prose max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:text-navy-800 prose-h2:text-[24px] prose-h2:mt-8 prose-h2:mb-3 prose-p:mb-4 prose-a:text-forest-600 prose-a:underline hover:prose-a:text-forest-700"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case "image": {
      const { imageUrl, alt, caption } = block.content || {};
      if (!imageUrl) return null;
      return (
        <figure className="my-8 text-center">
          <div className="relative w-full h-[240px] sm:h-[400px] overflow-hidden rounded-xl shadow-sm bg-muted/10">
            <Image
              src={imageUrl}
              alt={alt || caption || "Blog content image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {caption && (
            <figcaption className="mt-2.5 text-[13px] text-ash-500 italic">
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
            className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-[15px] font-display font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
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
    <div className="my-8 border border-ash-200 rounded-xl overflow-hidden divide-y divide-ash-200 bg-white shadow-sm">
      {items.map((item, idx) => {
        const isOpen = openIdxs.includes(idx);
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-4.5 font-display font-bold text-navy-800 hover:text-forest-700 text-left transition-colors text-[15.5px]"
            >
              <span>{item.title}</span>
              <Icon
                name="chevron"
                size={14}
                className={`text-ash-400 transition-transform ${
                  isOpen ? "" : "-rotate-90"
                }`}
              />
            </button>
            {isOpen && (
              <div className="p-5 pt-0 font-body text-ash-600 text-[14.5px] leading-relaxed bg-paper border-t border-ash-50">
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
    <div className="my-8 border border-ash-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="flex border-b border-ash-200 overflow-x-auto bg-paper">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-3.5 font-display text-[14.5px] font-bold border-b-2 text-center whitespace-nowrap transition-all ${
              activeTab === idx
                ? "border-forest-600 text-forest-700 bg-white"
                : "border-transparent text-ash-500 hover:text-navy-800"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-6 font-body text-ash-600 text-[14.5px] leading-relaxed">
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
          className="border border-ash-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow"
        >
          {item.imageUrl && (
            <div className="h-44 relative bg-muted/10">
              <Image
                src={item.imageUrl}
                alt={item.title || "Card image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          )}
          <div className="p-5 flex-1 flex flex-col">
            <h4 className="font-display font-bold text-navy-800 text-[17px] mb-2 leading-snug">
              {item.title}
            </h4>
            <p className="font-body text-ash-600 text-[14px] leading-relaxed flex-1">
              {item.description}
            </p>
            {item.link && (
              <a
                href={item.link}
                className="mt-4 inline-flex items-center gap-1 font-display text-[13.5px] font-bold text-forest-700 hover:underline"
              >
                Learn more <Icon name="chevron" size={10} className="-rotate-90" />
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
        <div className="relative w-full h-[200px] overflow-hidden rounded-lg bg-muted/10 shadow-sm">
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
        className="prose max-w-none text-[15px] leading-relaxed font-body text-ash-600 whitespace-pre-wrap"
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

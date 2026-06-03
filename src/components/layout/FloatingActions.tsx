"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PHONE } from "@/lib/nav";
import { cn } from "@/lib/utils";

const WHATSAPP_HREF =
  "https://wa.me/611300089547?text=Hi%20Kratos%20Energy%2C%20I%27d%20like%20a%20solar%20quote.";

/** WhatsApp brand glyph. */
function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.01 3.2c-7.06 0-12.8 5.73-12.8 12.8 0 2.25.59 4.45 1.71 6.39L3.2 28.8l6.6-1.73a12.74 12.74 0 0 0 6.2 1.58h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06A12.7 12.7 0 0 0 16.01 3.2Zm0 23.43h-.01c-1.85 0-3.66-.5-5.24-1.43l-.38-.22-3.92 1.03 1.05-3.82-.25-.39a10.6 10.6 0 0 1-1.62-5.6c0-5.86 4.78-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.87-4.77 10.64-10.63 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

type Msg = { from: "bot" | "user"; text: string; href?: string; cta?: string };

const QUICK = [
  "How much can I save?",
  "Do I qualify for rebates?",
  "Is a battery worth it?",
  "Talk to a human",
];

function reply(input: string): Msg {
  const q = input.toLowerCase();
  if (q.includes("save") || q.includes("saving") || q.includes("roi") || q.includes("payback"))
    return {
      from: "bot",
      text: "Most homes save $1,800–$2,900 a year and pay the system off in 3–5 years. Try our live ROI calculator to model your own numbers.",
      href: "/savings-calculator",
      cta: "Open savings calculator",
    };
  if (q.includes("rebate") || q.includes("qualif") || q.includes("stc") || q.includes("government"))
    return {
      from: "bot",
      text: "Federal STCs plus your state rebate can stack to thousands off. Pick your state on our rebate page to see what you can claim — we handle the paperwork.",
      href: "/rebates",
      cta: "Check my rebates",
    };
  if (q.includes("battery") || q.includes("storage") || q.includes("powerwall"))
    return {
      from: "bot",
      text: "A battery stores daytime solar for night use and adds blackout backup. With current rebates the payback keeps improving — here's the detail.",
      href: "/battery-storage",
      cta: "Explore batteries",
    };
  if (q.includes("ev") || q.includes("car") || q.includes("charger"))
    return {
      from: "bot",
      text: "We install smart 7kW & 22kW home EV chargers so you can run your car on your own solar.",
      href: "/ev-charging",
      cta: "See EV chargers",
    };
  if (q.includes("price") || q.includes("cost") || q.includes("quote") || q.includes("how much does"))
    return {
      from: "bot",
      text: "Pricing depends on your roof, usage and rebates — so we tailor it. Grab a free, no-obligation quote in about 2 minutes.",
      href: "/get-a-quote",
      cta: "Get my free quote",
    };
  if (q.includes("build") || q.includes("configure") || q.includes("design"))
    return {
      from: "bot",
      text: "You can design your own system — panels, inverter, battery and EV charging — and watch the price update live.",
      href: "/build",
      cta: "Build my system",
    };
  if (q.includes("human") || q.includes("call") || q.includes("phone") || q.includes("talk") || q.includes("contact"))
    return {
      from: "bot",
      text: `Happy to help in person — call us on ${PHONE} (Mon–Fri 8am–6pm AEST), or tap WhatsApp below. You can also book a callback through a quick quote.`,
      href: "/get-a-quote",
      cta: "Request a callback",
    };
  return {
    from: "bot",
    text: "Great question! A consultant can give you an exact answer — the fastest way is a quick free quote, or ask me about savings, rebates, batteries or EV charging.",
    href: "/get-a-quote",
    cta: "Get a free quote",
  };
}

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi, I'm Sunny — the Kratos Energy assistant ☀️ Ask me anything about going solar, or pick a question below.",
    },
  ]);
  const [text, setText] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setText("");
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setTimeout(() => setMsgs((m) => [...m, reply(v)]), 360);
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-[92px] right-5 z-[70] w-[min(360px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-xl border border-ash-200 bg-white shadow-lg transition-all duration-200 ease-soft",
          open ? "visible scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-forest-900 px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
            <Icon name="sun" size={22} />
          </span>
          <div className="flex-1">
            <div className="font-display text-[15px] font-bold text-white">
              Sunny · Solar Assistant
            </div>
            <div className="flex items-center gap-1.5 font-body text-[12px] text-[#a9c4a3]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online now
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={bodyRef} className="flex max-h-[340px] flex-col gap-3 overflow-y-auto bg-paper px-4 py-4">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[82%] rounded-2xl px-3.5 py-2.5 font-body text-[14px] leading-relaxed",
                  m.from === "user"
                    ? "rounded-br-sm bg-green-500 text-white"
                    : "rounded-bl-sm border border-ash-200 bg-white text-ink",
                )}
              >
                {m.text}
                {m.href && m.cta && (
                  <a
                    href={m.href}
                    className="mt-2 flex items-center gap-1.5 font-display text-[13px] font-bold text-forest-700 hover:underline"
                  >
                    {m.cta} <Icon name="arrow" size={14} stroke={2.4} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        <div className="flex flex-wrap gap-1.5 border-t border-ash-200 bg-white px-3 pt-3">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-pill border border-green-200 bg-green-50 px-2.5 py-1.5 font-body text-[12px] font-semibold text-forest-700 transition-colors hover:bg-green-100"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
          className="flex items-center gap-2 bg-white p-3"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question…"
            className="flex-1 rounded-pill border border-ash-300 bg-paper px-4 py-2.5 font-body text-[14px] text-ink outline-none focus:border-green-500"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-green-500 text-white shadow-green hover:bg-green-600"
          >
            <Icon name="arrow" size={18} stroke={2.6} />
          </button>
        </form>
      </div>

      {/* Launcher stack */}
      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
        {/* WhatsApp */}
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5"
          aria-label="Chat with us on WhatsApp"
        >
          <span className="pointer-events-none hidden rounded-pill bg-white px-3.5 py-2 font-display text-[13px] font-bold text-forest-700 shadow-md transition-opacity group-hover:opacity-100 sm:block sm:opacity-0">
            Give us a call on WhatsApp
          </span>
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ke-press">
            <WhatsAppIcon size={28} />
          </span>
        </a>

        {/* AI chat launcher */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open solar assistant"
          className="ke-press flex h-[58px] w-[58px] items-center justify-center rounded-full bg-forest-900 text-white shadow-lg"
        >
          <Icon name={open ? "x" : "sun"} size={26} className="text-gold-400" />
        </button>
      </div>
    </>
  );
}

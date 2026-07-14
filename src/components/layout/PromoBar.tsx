import { Icon } from "@/components/ui/Icon";
import { PHONE, PHONE_HREF } from "@/lib/nav";

/** Slim utility / promo strip above the header. */
export function PromoBar() {
  return (
    <div className="sticky top-0 z-[60] bg-forest-900 text-[13px] text-[#eaf3e6]">
      <div className="flex h-[38px] w-full items-center gap-[18px] px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Icon name="zap" size={13} fill="#f4ce47" stroke={0} className="text-gold-400" />
          <span>
            <b className="text-gold-400">NSW Rebates 2026</b> — up to $3,450 off,
            ending soon.
          </span>
        </span>
        <div className="ml-auto hidden items-center gap-[22px] font-semibold md:flex">
          <span className="inline-flex items-center gap-[7px] opacity-90">
            <Icon name="mapPin" size={13} stroke={2.2} /> NSW . Victoria . WA
          </span>
          <a
            href={PHONE_HREF}
            className="inline-flex animate-flash items-center gap-[7px] font-extrabold text-gold-400 motion-reduce:animate-none"
          >
            <Icon name="phone" size={13} stroke={2.4} className="text-gold-400" />{" "}
            {PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}

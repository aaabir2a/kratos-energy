import { Icon } from "@/components/ui/Icon";
import { PHONE, PHONE_HREF } from "@/lib/nav";

/** Slim utility / promo strip above the header. */
export function PromoBar() {
  return (
    <div className="relative z-[60] bg-forest-900 text-[13px] text-[#eaf3e6]">
      <div className="container-ke flex h-[38px] items-center gap-[18px]">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Icon name="zap" size={13} fill="#f4ce47" stroke={0} className="text-gold-400" />
          <span>
            <b className="text-gold-400">NSW Rebates 2025</b> — up to $2,870 off,
            ending soon.
          </span>
        </span>
        <div className="ml-auto hidden items-center gap-[22px] font-semibold md:flex">
          <span className="inline-flex items-center gap-[7px] opacity-90">
            <Icon name="mapPin" size={13} stroke={2.2} /> Sydney · Melbourne ·
            Brisbane
          </span>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-[7px] font-extrabold text-white"
          >
            <Icon name="phone" size={13} stroke={2.4} className="text-green-400" />{" "}
            {PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}

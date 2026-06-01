import { Icon } from "./Icon";

/** Five gold stars — review rating row. */
export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="inline-flex gap-px text-gold-500">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} fill="#f4ce47" stroke={0} />
      ))}
    </span>
  );
}

export type Battery = {
  brand: string;
  model: string;
  image: string;
  capacity: string;
  features: string[];
};

/** Battery brands Kratos installs. Images live in /public/battery. */
export const BATTERIES: Battery[] = [
  {
    brand: "Fox ESS",
    model: "Energy Cube",
    image: "/battery/Fox-ess.png",
    capacity: "4 – 16 kWh",
    features: ["Stackable modular design", "Add capacity any time"],
  },
  {
    brand: "GoodWe",
    model: "Lynx Home Series",
    image: "/battery/GoodWe.png",
    capacity: "6.6 – 46 kWh",
    features: ["High-voltage hybrid system", "Whole-home backup ready"],
  },
  {
    brand: "Sigenergy",
    model: "SigenStor",
    image: "/battery/sigenergy.png",
    capacity: "5 – 48 kWh",
    features: ["5-in-1 AI-managed unit", "Solar, storage and EV in one"],
  },
];

import { useState } from "react";
import { motion } from "framer-motion";

export default function UnitConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [category, setCategory] = useState("length");

  const conversions = {
    length: {
      name: "Length",
      units: {
        mm: { label: "Millimeter", factor: 1 },
        cm: { label: "Centimeter", factor: 10 },
        m: { label: "Meter", factor: 1000 },
        km: { label: "Kilometer", factor: 1000000 },
        in: { label: "Inch", factor: 25.4 },
        ft: { label: "Foot", factor: 304.8 },
        yd: { label: "Yard", factor: 914.4 },
        mi: { label: "Mile", factor: 1609344 },
      },
    },
    weight: {
      name: "Weight",
      units: {
        mg: { label: "Milligram", factor: 1 },
        g: { label: "Gram", factor: 1000 },
        kg: { label: "Kilogram", factor: 1000000 },
        oz: { label: "Ounce", factor: 28349.5 },
        lb: { label: "Pound", factor: 453592 },
      },
    },
    temperature: {
      name: "Temperature",
      units: {
        c: {
          label: "Celsius",
          convert: (v: number, to: string) =>
            to === "f" ? (v * 9) / 5 + 32 : v + 273.15,
        },
        f: {
          label: "Fahrenheit",
          convert: (v: number, to: string) =>
            to === "c" ? ((v - 32) * 5) / 9 : ((v - 32) * 5) / 9 + 273.15,
        },
        k: {
          label: "Kelvin",
          convert: (v: number, to: string) =>
            to === "c" ? v - 273.15 : ((v - 273.15) * 9) / 5 + 32,
        },
      },
    },
    volume: {
      name: "Volume",
      units: {
        ml: { label: "Milliliter", factor: 1 },
        l: { label: "Liter", factor: 1000 },
        gal: { label: "Gallon (US)", factor: 3785.41 },
        fl_oz: { label: "Fluid Ounce", factor: 29.5735 },
        pt: { label: "Pint", factor: 473.176 },
      },
    },
  };

  const currentCategory = conversions[category as keyof typeof conversions];
  const units = currentCategory.units as any;

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0";

    if (category === "temperature") {
      const fromData = units[fromUnit];
      if (fromData.convert) {
        return fromData.convert(numValue, toUnit).toFixed(2);
      }
    } else {
      const fromFactor = units[fromUnit].factor;
      const toFactor = units[toUnit].factor;
      const result = (numValue * fromFactor) / toFactor;
      return result.toFixed(4);
    }
    return "0";
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neon-pink mb-3">
            Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(conversions).map(([key, val]: any) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategory(key);
                  setFromUnit(Object.keys(val.units)[0]);
                  setToUnit(Object.keys(val.units)[1]);
                }}
                className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  category === key
                    ? "bg-neon-pink/30 border border-neon-pink text-neon-pink"
                    : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {val.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-silver mb-3 uppercase">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted-silver/50 focus:outline-none focus:border-neon-pink"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-silver mb-3 uppercase">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink"
            >
              {Object.entries(units).map(([key, unit]: any) => (
                <option key={key} value={key} className="bg-obsidian">
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-muted-silver mb-3 uppercase">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink"
            >
              {Object.entries(units).map(([key, unit]: any) => (
                <option key={key} value={key} className="bg-obsidian">
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-r from-neon-pink/10 to-electric-violet/10 border border-neon-pink/30 rounded-lg p-6">
          <p className="text-muted-silver text-sm mb-2">Result</p>
          <p className="text-4xl font-bold text-gradient">{convert()}</p>
          <p className="text-muted-silver text-sm mt-3">
            {value || "0"} {units[fromUnit]?.label} = {convert()}{" "}
            {units[toUnit]?.label}
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ColorPicker() {
  const [color, setColor] = useState("#FF2E93");
  const [copied, setCopied] = useState("");

  const copyColor = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(""), 2000);
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
        .toUpperCase()
    );
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb = hexToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = rgbToHsl(rgb.r, rgb.g, rgb.b);

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  const presetColors = [
    "#FF2E93",
    "#8A2BE2",
    "#00F5FF",
    "#CCFF00",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg space-y-6">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-shrink-0">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-24 h-24 rounded-xl cursor-pointer border-2 border-white/20 hover:border-neon-pink/50 transition-all"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs text-muted-silver mb-2 uppercase">
                HEX
              </label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => copyColor(color)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono text-sm hover:bg-white/20 flex items-center justify-between transition-all group"
              >
                <span>{color}</span>
                {copied === color ? (
                  <Check size={16} className="text-acid-lime" />
                ) : (
                  <Copy
                    size={16}
                    className="opacity-50 group-hover:opacity-100"
                  />
                )}
              </motion.button>
            </div>

            <div>
              <label className="block text-xs text-muted-silver mb-2 uppercase">
                RGB
              </label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => copyColor(rgbString)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono text-sm hover:bg-white/20 flex items-center justify-between transition-all group"
              >
                <span>{rgbString}</span>
                {copied === rgbString ? (
                  <Check size={16} className="text-acid-lime" />
                ) : (
                  <Copy
                    size={16}
                    className="opacity-50 group-hover:opacity-100"
                  />
                )}
              </motion.button>
            </div>

            <div>
              <label className="block text-xs text-muted-silver mb-2 uppercase">
                HSL
              </label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => copyColor(hslString)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono text-sm hover:bg-white/20 flex items-center justify-between transition-all group"
              >
                <span>{hslString}</span>
                {copied === hslString ? (
                  <Check size={16} className="text-acid-lime" />
                ) : (
                  <Copy
                    size={16}
                    className="opacity-50 group-hover:opacity-100"
                  />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-muted-silver mb-3 uppercase">
            Preset Colors
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {presetColors.map((presetColor) => (
              <motion.button
                key={presetColor}
                whileHover={{ scale: 1.1 }}
                onClick={() => setColor(presetColor)}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  color === presetColor
                    ? "border-white ring-2 ring-neon-pink"
                    : "border-white/30 hover:border-white/60"
                }`}
                style={{ backgroundColor: presetColor }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("");

  const conversions = {
    lowercase: (str: string) => str.toLowerCase(),
    UPPERCASE: (str: string) => str.toUpperCase(),
    "Title Case": (str: string) =>
      str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    "Sentence case": (str: string) =>
      str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1),
    camelCase: (str: string) =>
      str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
    snake_case: (str: string) =>
      str
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, ""),
    "kebab-case": (str: string) =>
      str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, ""),
    PascalCase: (str: string) =>
      str
        .toLowerCase()
        .split(/[\s_-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(""),
    CONSTANT_CASE: (str: string) =>
      str
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/[^A-Z0-9_]/g, ""),
    "dot.case": (str: string) =>
      str
        .toLowerCase()
        .replace(/\s+/g, ".")
        .replace(/[^a-z0-9.]/g, ""),
  };

  const copyText = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neon-pink mb-3">
            Input Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted-silver/50 focus:outline-none focus:border-neon-pink resize-none"
          />
          <p className="text-xs text-muted-silver mt-2">
            Characters: {text.length} | Words:{" "}
            {text.trim().split(/\s+/).filter(Boolean).length}
          </p>
        </div>

        <div className="space-y-3">
          {Object.entries(conversions).map(([name, converter]) => {
            const result = converter(text);
            return (
              <motion.div
                key={name}
                whileHover={{ x: 4 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all group"
              >
                <p className="text-xs text-muted-silver uppercase mb-2">
                  {name}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-mono text-sm break-words flex-1">
                    {result || "—"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyText(result)}
                    disabled={!result}
                    className="flex-shrink-0 bg-acid-lime/20 border border-acid-lime/50 text-acid-lime rounded-lg px-3 py-2 hover:bg-acid-lime/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied === result ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

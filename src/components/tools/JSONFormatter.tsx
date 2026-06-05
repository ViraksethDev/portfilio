import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(`Error: ${e instanceof Error ? e.message : "Invalid JSON"}`);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError(`Error: ${e instanceof Error ? e.message : "Invalid JSON"}`);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
          <label className="block text-sm font-semibold text-neon-pink mb-3">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "value"}'
            className="w-full h-40 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted-silver/50 focus:outline-none focus:border-neon-pink resize-none"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
          <label className="block text-sm font-semibold text-bright-cyan mb-3">
            Output JSON
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-40 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-bright-cyan placeholder-muted-silver/50 focus:outline-none resize-none font-mono text-sm"
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={formatJSON}
          className="flex-1 bg-neon-pink/20 border border-neon-pink/50 text-neon-pink rounded-lg py-3 font-semibold hover:bg-neon-pink/30 transition-all duration-300"
        >
          Format
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={minifyJSON}
          className="flex-1 bg-electric-violet/20 border border-electric-violet/50 text-electric-violet rounded-lg py-3 font-semibold hover:bg-electric-violet/30 transition-all duration-300"
        >
          Minify
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          disabled={!output}
          className="bg-acid-lime/20 border border-acid-lime/50 text-acid-lime rounded-lg px-4 py-3 font-semibold hover:bg-acid-lime/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </motion.button>
      </div>
    </div>
  );
}

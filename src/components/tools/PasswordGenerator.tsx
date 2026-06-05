import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (useUppercase) chars += uppercase;
    if (useLowercase) chars += lowercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (chars === "") {
      setPassword("Select at least one option");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (!password || password.includes("Select"))
      return { level: 0, text: "None", color: "bg-gray-500" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: 1, text: "Weak", color: "bg-red-500" };
    if (strength <= 4)
      return { level: 2, text: "Fair", color: "bg-yellow-500" };
    if (strength <= 5) return { level: 3, text: "Good", color: "bg-acid-lime" };
    return { level: 4, text: "Strong", color: "bg-bright-cyan" };
  };

  const strength = getPasswordStrength();

  const Option = ({ label, value, onChange }: any) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative w-5 h-5">
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="w-5 h-5 accent-neon-pink cursor-pointer"
        />
      </div>
      <span className="text-sm text-muted-silver group-hover:text-white transition-all">
        {label}
      </span>
    </label>
  );

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg space-y-6">
        {/* Password Display */}
        <div>
          <label className="block text-sm font-semibold text-neon-pink mb-3">
            Generated Password
          </label>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white font-mono text-lg break-all">
              {password || "—"}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyPassword}
              disabled={!password || password.includes("Select")}
              className="bg-acid-lime/20 border border-acid-lime/50 text-acid-lime rounded-lg px-4 hover:bg-acid-lime/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Strength Indicator */}
        {password && !password.includes("Select") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-nuted-silver">
                Password Strength
              </label>
              <span
                className={`text-xs font-semibold ${strength.color === "bg-red-500" ? "text-red-400" : strength.color === "bg-yellow-500" ? "text-yellow-400" : strength.color === "bg-acid-lime" ? "text-acid-lime" : "text-bright-cyan"}`}
              >
                {strength.text}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(strength.level / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${strength.color} rounded-full`}
              />
            </div>
          </div>
        )}

        {/* Length Slider */}
        <div>
          <label className="block text-sm font-semibold text-bright-cyan mb-3">
            Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-pink"
          />
          <div className="flex justify-between text-xs text-muted-silver mt-2">
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        {/* Options */}
        <div>
          <p className="text-sm font-semibold text-electric-violet mb-4">
            Include:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Option
              label="Uppercase (A-Z)"
              value={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
            />
            <Option
              label="Lowercase (a-z)"
              value={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
            />
            <Option
              label="Numbers (0-9)"
              value={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
            <Option
              label="Symbols (!@#$%)"
              value={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePassword}
          className="w-full bg-gradient-primary text-white rounded-lg py-3 font-semibold hover:shadow-neon-pink transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          Generate Password
        </motion.button>
      </div>
    </div>
  );
}

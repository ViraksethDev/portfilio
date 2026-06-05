import { useState } from "react";
import { Delete } from "lucide-react";
import { motion } from "framer-motion";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      case "%":
        return (prev * current) / 100;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
        <div className="mb-6">
          <div className="text-right text-muted-silver text-sm mb-2">
            {operation &&
              previousValue !== null &&
              `${previousValue} ${operation}`}
          </div>
          <div className="text-5xl font-bold text-neon-pink text-right break-words">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {buttons.map((row, i) => (
            <div key={i} className="contents">
              {row.map((btn) => (
                <motion.button
                  key={btn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (btn === "=") handleEquals();
                    else if (["+", "-", "×", "÷", "%"].includes(btn))
                      handleOperation(btn);
                    else if (btn === ".") handleDecimal();
                    else handleNumber(btn);
                  }}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    ["+", "-", "×", "÷", "%"].includes(btn)
                      ? "bg-neon-pink/20 border border-neon-pink/50 text-neon-pink hover:bg-neon-pink/30"
                      : btn === "="
                        ? "bg-electric-violet/20 border border-electric-violet/50 text-electric-violet hover:bg-electric-violet/30"
                        : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  {btn}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClear}
          className="w-full bg-acid-lime/20 border border-acid-lime/50 text-acid-lime rounded-lg py-3 font-semibold hover:bg-acid-lime/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Delete size={18} />
          Clear
        </motion.button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";

import Boy from "../images/img-tools/boy-along.jpg";
import BoyGirl from "../images/img-tools/boy-with-girls.png";

export default function SendToCrush() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x: randomX, y: randomY });
    setAttempts(attempts + 1);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div className="space-y-4 flex flex-col items-center justify-center min-h-96">
      {!accepted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 text-center"
        >
          {/* Animation boy image */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <img
              src={Boy}
              alt="Boy"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </motion.div>

          {/* Question Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Do you love me?
            </h2>
            <p className="text-muted-silver text-sm">
              {attempts > 0 &&
                `(You tried ${attempts} time${attempts > 1 ? "s" : ""} to click No 😄)`}
            </p>
          </motion.div>

          {/* Buttons Container */}
          <div className="flex gap-6 justify-center items-center relative h-16">
            {/* No Button - Runs away */}
            <motion.button
              animate={{
                x: noButtonPos.x,
                y: noButtonPos.y,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              className="px-8 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition-all duration-300 absolute"
            >
              No
            </motion.button>

            {/* Yes Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
              className="px-8 py-3 bg-acid-lime/20 border border-acid-lime/50 text-acid-lime rounded-lg font-semibold hover:bg-acid-lime/30 transition-all duration-300"
            >
              Yes
            </motion.button>
          </div>

          <p className="text-xs text-muted-silver">Try to click "No" 😏</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-md space-y-8 text-center"
        >
          {/* Celebration image - couple */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <img
              src={BoyGirl}
              alt="Couple"
              className="w-40 h-40 object-cover rounded-lg"
            />
          </motion.div>

          {/* Floating hearts */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              animate={{
                opacity: 0,
                y: -100,
                x: (Math.random() - 0.5) * 100,
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
              className="absolute left-1/2 top-1/2 text-2xl"
            >
              ❤️
            </motion.div>
          ))}

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-3">Yay! 🎉</h2>
              <p className="text-xl text-white font-semibold mb-2">
                U បាននិយាយ Yes!
              </p>
              <p className="text-lg text-acid-lime mb-4">
                ✨ You're in love with me! ✨
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3"
            >
              <p className="text-muted-silver text-sm">
                You tried to click "No"{" "}
                <span className="text-neon-pink font-bold">{attempts}</span>{" "}
                time{attempts !== 1 ? "s" : ""}
              </p>
              <p className="text-sm text-bright-cyan">
                But your heart led you to the right choice! 💫
              </p>
            </motion.div>
          </motion.div>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setAccepted(false);
              setNoButtonPos({ x: 0, y: 0 });
              setAttempts(0);
            }}
            className="w-full px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-neon-pink transition-all"
          >
            Ask Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

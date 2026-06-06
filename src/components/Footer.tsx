"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import CV from "../images/CV.jpg";

interface CursorPosition {
  x: number;
  y: number;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHoveringFooter, setIsHoveringFooter] = useState(false);
  const [isCyberMode, setIsCyberMode] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cursor tracking for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/ViraksethDev",
      icon: <Github size={20} />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Linkedin size={20} />,
    },
    {
      name: "ReadCV",
      url: CV,
      icon: <ExternalLink size={20} />,
    },
  ];

  const techStack = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Vite",
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringFooter(true)}
      onMouseLeave={() => setIsHoveringFooter(false)}
    >
      {/* Animated Background Gradient Blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isHoveringFooter && (
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{
              background: isCyberMode
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)"
                : "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)",
              left: cursorPos.x - 192,
              top: cursorPos.y - 192,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        )}
      </div>

      {/* Running Ticker */}
      <div className="relative z-10 overflow-hidden bg-gradient-to-b from-black via-transparent to-black py-12">
        <div className="relative h-24 flex items-center">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center px-8">
                <h2
                  className={`text-7xl md:text-8xl font-black tracking-tighter ${
                    isCyberMode
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  }`}
                >
                  VIRAKSETH HOY WEB DEVELOPER •
                </h2>
                <span
                  className={`text-7xl md:text-8xl font-black mx-8 ${
                    isCyberMode ? "text-purple-500" : "text-pink-500"
                  }`}
                >
                  •
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Clock & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-start space-y-6"
        >
          <div className="space-y-3">
            <h3
              className={`text-sm font-semibold uppercase tracking-widest ${
                isCyberMode ? "text-purple-400" : "text-pink-400"
              }`}
            >
              Local Time
            </h3>
            <p className="text-4xl font-mono font-bold text-white">{time}</p>
          </div>

          <div className="space-y-3 pt-8 border-t border-gray-800">
            <h3
              className={`text-sm font-semibold uppercase tracking-widest ${
                isCyberMode ? "text-purple-400" : "text-pink-400"
              }`}
            >
              Status
            </h3>
            <motion.div
              className="flex items-center space-x-3"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  isCyberMode ? "bg-purple-500" : "bg-pink-500"
                } animate-pulse`}
              />
              <p className="text-sm text-gray-300">
                អាចធ្វើការឯករាជ្យ និងពេញម៉ោងបានទាក់ទងបាន
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Center/Right Column: Social Links */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex flex-col items-start space-y-2 text-left"
                >
                  {/* Magnetic Hover Container */}
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className={`${
                        isCyberMode
                          ? "text-purple-500 group-hover:text-purple-300"
                          : "text-pink-500 group-hover:text-pink-300"
                      } transition-colors duration-300`}
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.icon}
                    </motion.div>
                    <span className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors duration-300">
                      {link.name}
                    </span>
                  </motion.div>

                  {/* Animated Underline Strike-through */}
                  <motion.div
                    className={`h-0.5 origin-left ${
                      isCyberMode ? "bg-purple-500" : "bg-pink-500"
                    }`}
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: 100, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Copyright & Tech Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 border-t border-gray-800 px-6 md:px-8 py-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} — Crafted with passion and pixels.
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                  isCyberMode
                    ? "border-purple-500/30 text-purple-300 bg-purple-500/5 hover:bg-purple-500/10"
                    : "border-pink-500/30 text-pink-300 bg-pink-500/5 hover:bg-pink-500/10"
                } transition-all duration-300 hover:scale-110`}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D Toggle Button - Floating */}
      <motion.button
        onClick={() => setIsCyberMode(!isCyberMode)}
        className="fixed bottom-8 right-8 z-30 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`relative p-4 rounded-full backdrop-blur-xl border-2 transition-all duration-500 ${
            isCyberMode
              ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/50"
              : "border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/50"
          }`}
          animate={{
            rotateX: [0, 10, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${
              isCyberMode
                ? "text-purple-300 bg-purple-500/30"
                : "text-pink-300 bg-pink-500/30"
            }`}
          >
            {isCyberMode ? "◆" : "●"}
          </div>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className={`absolute bottom-16 right-0 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap backdrop-blur-xl border ${
            isCyberMode
              ? "border-purple-500/50 bg-purple-500/20 text-purple-300"
              : "border-pink-500/50 bg-pink-500/20 text-pink-300"
          }`}
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          pointerEvents="none"
        >
          {isCyberMode ? "Cyber Mode" : "Standard Mode"}
        </motion.div>
      </motion.button>
    </footer>
  );
};

export default Footer;

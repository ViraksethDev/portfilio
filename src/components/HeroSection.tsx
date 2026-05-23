import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Facebook } from "lucide-react";

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 50 };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [5, -5]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-5, 5]),
    springConfig,
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformPerspective: 1000,
        }}
        className="relative z-10 perspective-1000"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full border border-white/10 text-muted-silver text-sm uppercase tracking-widest">
              Creative Developer & Designer
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          >
            <span className="block text-white">Virakseth Hoy</span>
            <span className="block text-gradient">Frontend Developer</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-silver text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            ខ្ញុំរចនា និងបង្កើតបទពិសោធន៍គេហទំព័រដ៏សម្បូរបែប
            ដែលជំរុញព្រំដែននៃអ្វីដែលអាចធ្វើទៅបាននៅក្នុងកម្មវិធីរុករកតាមអ៊ីនធឺណិត។
            ចាប់ពីគំនិតរហូតដល់ការដាក់ពង្រាយ
            ខ្ញុំបង្កើតផលិតផលឌីជីថលដែលមិនអាចបំភ្លេចបាន។
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="/projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-primary rounded-full text-white font-medium overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:border-neon-pink hover:shadow-neon-pink"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com/ViraksethDev" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Facebook, href: "https://www.facebook.com/virakseth.hoy.2025" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/10 text-muted-silver transition-all duration-300 hover:border-neon-pink hover:text-neon-pink hover:shadow-neon-pink"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <FloatingShapes mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-silver"
        >
          <span className="text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

interface FloatingShapesProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  isMobile: boolean;
}

function FloatingShapes({ mouseX, mouseY, isMobile }: FloatingShapesProps) {
  const springConfig = { damping: 50, stiffness: 100 };

  const shape1X = useSpring(
    useTransform(mouseX, (v) => v * 0.05),
    springConfig,
  );
  const shape1Y = useSpring(
    useTransform(mouseY, (v) => v * 0.05),
    springConfig,
  );
  const shape2X = useSpring(
    useTransform(mouseX, (v) => v * -0.08),
    springConfig,
  );
  const shape2Y = useSpring(
    useTransform(mouseY, (v) => v * -0.08),
    springConfig,
  );
  const shape3X = useSpring(
    useTransform(mouseX, (v) => v * 0.1),
    springConfig,
  );
  const shape3Y = useSpring(
    useTransform(mouseY, (v) => v * 0.1),
    springConfig,
  );
  const shape4X = useSpring(
    useTransform(mouseX, (v) => v * -0.06),
    springConfig,
  );
  const shape4Y = useSpring(
    useTransform(mouseY, (v) => v * -0.06),
    springConfig,
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x: isMobile ? 0 : shape1X, y: isMobile ? 0 : shape1Y }}
        className="absolute top-[20%] left-[10%] w-64 h-64 md:w-80 md:h-80"
      >
        <FloatingTorus />
      </motion.div>

      <motion.div
        style={{ x: isMobile ? 0 : shape2X, y: isMobile ? 0 : shape2Y }}
        className="absolute top-[15%] right-[15%] w-32 h-32 md:w-48 md:h-48"
      >
        <FloatingSphere />
      </motion.div>

      <motion.div
        style={{ x: isMobile ? 0 : shape3X, y: isMobile ? 0 : shape3Y }}
        className="absolute bottom-[30%] left-[20%] w-24 h-24 md:w-36 md:h-36"
      >
        <FloatingCube />
      </motion.div>

      <motion.div
        style={{ x: isMobile ? 0 : shape4X, y: isMobile ? 0 : shape4Y }}
        className="absolute bottom-[25%] right-[10%] w-40 h-40 md:w-56 md:h-56"
      >
        <FloatingRing />
      </motion.div>
    </div>
  );
}

function FloatingTorus() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-full h-full relative"
    >
      <div className="absolute inset-0 rounded-full border-4 border-neon-pink/30 animate-pulse-glow" />
      <div className="absolute inset-4 rounded-full border-4 border-electric-violet/30" />
      <div className="absolute inset-8 rounded-full border-4 border-bright-cyan/20" />
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-neon-pink/20 to-electric-violet/20 backdrop-blur-sm" />
    </motion.div>
  );
}

function FloatingSphere() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="w-full h-full relative"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-acid-lime/20 to-bright-cyan/20 backdrop-blur-md shadow-neon-cyan" />
      <div className="absolute inset-2 rounded-full border border-acid-lime/30" />
      <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-white/20 blur-sm" />
    </motion.div>
  );
}

function FloatingCube() {
  return (
    <motion.div
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="w-full h-full relative preserve-3d"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-electric-violet/30 to-neon-pink/30 border border-white/10 shadow-neon-pink" />
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-bright-cyan/50" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-neon-pink/50" />
    </motion.div>
  );
}

function FloatingRing() {
  return (
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="w-full h-full relative"
    >
      <div className="absolute inset-0 rounded-full border-8 border-transparent bg-gradient-to-r from-neon-pink/30 via-electric-violet/30 to-bright-cyan/30 bg-clip-border" />
      <div className="absolute inset-4 rounded-full border-2 border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 rounded-full bg-gradient-primary shadow-neon-pink"
        />
      </div>
    </motion.div>
  );
}

export default HeroSection;

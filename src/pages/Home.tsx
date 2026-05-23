import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "../components/PageTransition";
import HeroSection from "../components/HeroSection";
import BentoGrid from "../components/BentoGrid";
import FeaturedWork from "../components/FeaturedWork";
import About from "./About";

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative">
        <motion.div
          style={{ y: backgroundY }}
          className="fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl" />
        </motion.div>

        <HeroSection />
        <About />
        <FeaturedWork />
        <BentoGrid />
      </div>
    </PageTransition>
  );
}

export default Home;

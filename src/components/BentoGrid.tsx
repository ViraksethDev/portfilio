import { motion } from "framer-motion";
import { Code2, Palette, Sparkles, Layers, Zap, Globe } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, TypeScript, Next.js, Tailwind CSS",
    size: "large",
    gradient: "from-neon-pink to-electric-violet",
    glow: "shadow-neon-pink",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Design Systems, Prototyping",
    size: "medium",
    gradient: "from-electric-violet to-neon-pink",
    glow: "shadow-neon-pink",
  },
  {
    icon: Sparkles,
    title: "Motion & Animation",
    description: "Framer Motion, GSAP, Lottie",
    size: "medium",
    gradient: "from-bright-cyan to-acid-lime",
    glow: "shadow-neon-cyan",
  },
  {
    icon: Layers,
    title: "3D & WebGL",
    description: "Three.js, React Three Fiber, Shaders",
    size: "small",
    gradient: "from-acid-lime to-bright-cyan",
    glow: "shadow-neon-lime",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Core Web Vitals, Optimization",
    size: "small",
    gradient: "from-neon-pink to-bright-cyan",
    glow: "shadow-neon-pink",
  },
  {
    icon: Globe,
    title: "Full Stack",
    description: "Node.js, Supabase, PostgreSQL",
    size: "small",
    gradient: "from-electric-violet to-acid-lime",
    glow: "shadow-neon-pink",
  },
];

function BentoGrid() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-bright-cyan text-sm uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            What I Do
          </h2>
          <p className="text-muted-silver text-lg max-w-2xl mx-auto">
            ការលាយបញ្ចូលគ្នារវាងជំនាញបច្ចេកទេស និងចក្ខុវិស័យច្នៃប្រឌិត
            ដើម្បីបង្កើតបទពិសោធន៍ឌីជីថលដ៏អស្ចារ្យ ការអភិវឌ្ឍន៍ Frontend React,
            TypeScript, Next.js, Tailwind CSS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Skill {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  size: "large" | "medium" | "small";
  gradient: string;
  glow: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-2 md:row-span-1",
    small: "md:col-span-1 md:row-span-1",
  };

  const isLarge = skill.size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-2xl glass ${sizeClasses[skill.size]}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div
        className={`relative h-full flex ${isLarge ? "flex-col justify-between" : "flex-col"} p-6 md:p-8`}
      >
        <div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${skill.gradient} bg-opacity-20 w-fit ${isLarge ? "mb-auto" : "mb-4"}`}
        >
          <skill.icon size={isLarge ? 32 : 24} className="text-white" />
        </div>

        <div className={isLarge ? "mt-auto" : ""}>
          <h3
            className={`font-display font-bold text-white mb-2 ${isLarge ? "text-3xl" : "text-xl"}`}
          >
            {skill.title}
          </h3>
          <p className={`text-muted-silver ${isLarge ? "text-lg" : "text-sm"}`}>
            {skill.description}
          </p>
        </div>

        {/* Animated border */}
        <div
          className={`absolute inset-0 rounded-2xl ${skill.glow} opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300`}
        />
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

export default BentoGrid;

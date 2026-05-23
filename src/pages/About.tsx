import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Rocket, Award } from "lucide-react";
import PageTransition from "../components/PageTransition";
import MrSeth from "../images/mr-seth.jpg";

const timeline = [
  {
    year: "2024",
    title: "Lead Creative Developer",
    company: "NexGen Studios",
    description:
      "Leading a team of 8 developers building immersive web experiences for Fortune 500 clients. Pioneered the adoption of Three.js and WebGL across all digital products.",
    icon: Rocket,
    gradient: "from-neon-pink to-electric-violet",
  },
  {
    year: "2022",
    title: "Senior Frontend Engineer",
    company: "Quantum Labs",
    description:
      "Architected the frontend infrastructure for a real-time collaboration platform serving 2M+ users. Reduced load times by 60% through code splitting and lazy loading.",
    icon: Briefcase,
    gradient: "from-bright-cyan to-acid-lime",
  },
  {
    year: "2020",
    title: "UI/UX Developer",
    company: "Creative Agency Co",
    description:
      "Designed and developed 50+ client websites and web applications. Established the design system that increased team efficiency by 40%.",
    icon: Award,
    gradient: "from-electric-violet to-neon-pink",
  },
  {
    year: "2018",
    title: "Computer Science Degree",
    company: "Tech University",
    description:
      "Graduated with honors. Specialized in Human-Computer Interaction and Graphics Programming. Led the university web development club.",
    icon: GraduationCap,
    gradient: "from-acid-lime to-bright-cyan",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "8+", label: "Years Experience" },
  { value: "2M+", label: "Users Impacted" },
  { value: "15+", label: "Awards Won" },
];

function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="min-h-screen pt-32 pb-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-neon-pink text-sm uppercase tracking-widest mb-4 block">
              About Me
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              My <span className="text-gradient">Story</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                <img
                  src={MrSeth}
                  alt="About"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-neon-pink/50 transition-colors duration-300" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Hey, I&apos;m <span className="text-gradient">Seth</span>
              </h2>
              <div className="space-y-4 text-muted-silver text-lg leading-relaxed mb-8">
                <p>
                  ខ្ញុំជាអ្នកអភិវឌ្ឍន៍ប្រកបដោយភាពច្នៃប្រឌិត
                  ដែលមានចំណង់ចំណូលចិត្តក្នុងការបង្កើតបទពិសោធន៍ឌីជីថលដ៏សម្បូរបែប
                  ដែលជំរុញព្រំដែននៃអ្វីដែលអាចធ្វើទៅបាននៅក្នុងកម្មវិធីរុករកតាមអ៊ីនធឺណិត។
                </p>
                <p>
                  ដោយមានបទពិសោធន៍ជាង ៨ ឆ្នាំ
                  ខ្ញុំបានបំពេញចន្លោះប្រហោងរវាងការរចនា និងវិស្វកម្ម
                  ដោយប្រែក្លាយចក្ខុវិស័យដ៏មហិច្ឆតាទៅជាការពិតដែលអាចអនុវត្តបាន
                  និងអាចចូលដំណើរការបាន។
                </p>
                <p>
                  នៅពេលដែលខ្ញុំមិនសរសេរកូដ
                  អ្នកនឹងឃើញខ្ញុំកំពុងស្វែងយល់ពីសិល្បៈបង្កើតថ្មី
                  ចូលរួមចំណែកដល់កម្មវិធីប្រភពបើកចំហ
                  ឬណែនាំអ្នកអភិវឌ្ឍន៍ជំនាន់ក្រោយ។
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="text-3xl font-display font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-silver text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Career Journey
            </h2>
            <p className="text-muted-silver text-lg">
              A timeline of growth and achievements
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-neon-pink via-electric-violet to-bright-cyan"
              />
            </div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    company: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    gradient: string;
  };
  index: number;
}

function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-8"
    >
      <div className="relative z-10">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
        >
          <item.icon size={18} className="text-white" />
        </div>
      </div>

      <div className="flex-1 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-bright-cyan text-sm font-medium">
            {item.year}
          </span>
          <span className="text-muted-silver/50">—</span>
          <span className="text-muted-silver text-sm">{item.company}</span>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-3">
          {item.title}
        </h3>
        <p className="text-muted-silver leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default About;

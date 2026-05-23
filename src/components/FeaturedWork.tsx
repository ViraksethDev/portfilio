import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    category: 'Web Application',
    description: 'AI-powered analytics platform with real-time data visualization',
    image: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-neon-pink to-electric-violet',
  },
  {
    id: 2,
    title: 'Quantum Finance',
    category: 'Mobile App',
    description: 'Next-gen banking experience with seamless crypto integration',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-bright-cyan to-acid-lime',
  },
  {
    id: 3,
    title: 'Echo Social',
    category: 'Platform Design',
    description: 'Reimagining social connection through immersive audio spaces',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-electric-violet to-neon-pink',
  },
];

function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-neon-pink text-sm uppercase tracking-widest mb-4 block">Featured</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Selected Work</h2>
          </div>
          <a
            href="/projects"
            className="hidden md:flex items-center gap-2 text-muted-silver hover:text-white transition-colors"
          >
            <span>View all projects</span>
            <ArrowUpRight size={20} />
          </a>
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <FeatureCard key={project.id} project={project} index={index} y={y} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  gradient: string;
}

interface FeatureCardProps {
  project: Project;
  index: number;
  y: ReturnType<typeof useTransform>;
}

function FeatureCard({ project, index, y }: FeatureCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ y }}
      className={`group relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:direction-rtl'}`}
    >
      <div className={`relative overflow-hidden rounded-2xl aspect-[4/3] ${isEven ? '' : 'md:order-2'}`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
        <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-neon-pink/50 transition-colors duration-300" />
      </div>

      <div className={`${isEven ? '' : 'md:order-1 md:text-right'}`}>
        <span className="text-bright-cyan text-sm uppercase tracking-widest mb-4 block">{project.category}</span>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-muted-silver text-lg mb-8">{project.description}</p>
        <a
          href="/projects"
          className={`inline-flex items-center gap-2 text-white group-hover:text-neon-pink transition-colors ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
          <span>View Case Study</span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: isEven ? 5 : -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={20} />
          </motion.span>
        </a>
      </div>
    </motion.div>
  );
}

export default FeaturedWork;

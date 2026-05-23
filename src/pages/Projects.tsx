import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const categories = ['All', 'Web App', 'Mobile', 'Design', 'Experiment'];

const projects = [
  {
    id: 'nebula',
    title: 'Nebula Dashboard',
    category: 'Web App',
    year: '2024',
    description: 'AI-powered analytics platform with real-time data visualization and predictive insights.',
    image: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-neon-pink to-electric-violet',
    tags: ['React', 'TypeScript', 'D3.js', 'Python'],
  },
  {
    id: 'quantum',
    title: 'Quantum Finance',
    category: 'Mobile',
    year: '2024',
    description: 'Next-gen banking experience with seamless crypto integration and DeFi protocols.',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-bright-cyan to-acid-lime',
    tags: ['React Native', 'Web3', 'Node.js'],
  },
  {
    id: 'echo',
    title: 'Echo Social',
    category: 'Design',
    year: '2024',
    description: 'Reimagining social connection through immersive audio spaces and spatial sound.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-electric-violet to-neon-pink',
    tags: ['Figma', 'Design System', 'Prototyping'],
  },
  {
    id: 'flux',
    title: 'Flux Studio',
    category: 'Web App',
    year: '2023',
    description: 'Collaborative design tool for creating immersive 3D web experiences.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-acid-lime to-bright-cyan',
    tags: ['Three.js', 'WebGL', 'Collaboration'],
  },
  {
    id: 'synthwave',
    title: 'Synthwave Player',
    category: 'Experiment',
    year: '2023',
    description: 'Audio visualizer with reactive 3D graphics and procedural animations.',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-neon-pink to-bright-cyan',
    tags: ['WebAudio', 'Three.js', 'GLSL'],
  },
  {
    id: 'terra',
    title: 'Terra Metrics',
    category: 'Mobile',
    year: '2023',
    description: 'Environmental impact tracking app with gamification and community challenges.',
    image: 'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-acid-lime to-electric-violet',
    tags: ['React Native', 'Firebase', 'AR'],
  },
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-neon-pink text-sm uppercase tracking-widest mb-4 block">Projects</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              Selected <span className="text-gradient">Work</span>
            </h1>
            <p className="text-muted-silver text-lg max-w-2xl">
              បណ្តុំគម្រោងដែលបានរៀបចំយ៉ាងល្អិតល្អន់ រួមមានការអភិវឌ្ឍគេហទំព័រ កម្មវិធីទូរស័ព្ទ ប្រព័ន្ធរចនា និងការពិសោធន៍ច្នៃប្រឌិត។
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  relative px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider
                  transition-all duration-300
                  ${activeCategory === category
                    ? 'text-white bg-white/10 border border-white/20'
                    : 'text-muted-silver bg-transparent border border-white/10 hover:border-white/30 hover:text-white'}
                `}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gradient-primary opacity-50 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </motion.div>

          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onHover={() => setHoveredProject(project.id)}
                    onLeave={() => setHoveredProject(null)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </PageTransition>
  );
}

interface ProjectType {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  gradient: string;
  tags: string[];
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative"
    >
      <a href={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
          <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-neon-pink/50 transition-colors duration-300" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
          >
            <ArrowUpRight size={20} className="text-white" />
          </motion.div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-bright-cyan text-sm uppercase tracking-widest">{project.category}</span>
              <span className="text-muted-silver/50 text-sm">{project.year}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-muted-silver text-sm line-clamp-2">{project.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs text-muted-silver bg-white/5 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </motion.div>
  );
}

export default Projects;

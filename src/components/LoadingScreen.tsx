import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-obsidian flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto mb-4 relative"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-neon-pink border-r-transparent border-b-transparent border-l-transparent" />
        </motion.div>
        <p className="text-muted-silver text-sm uppercase tracking-widest">Loading</p>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;

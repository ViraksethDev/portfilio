import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/projects" },
  { name: "Story", path: "/about" },
  { name: "Connect", path: "/contact" },
  { name: "Tools", path: "/tools" },
];

function MagneticLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isTouching, setIsTouching] = useState(false);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isTouching) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    if (!isTouching) {
      x.set(0);
      y.set(0);
    }
  };

  const handleTouchStart = () => {
    setIsTouching(true);
    x.set(0);
    y.set(0);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  const handleClick = () => {
    navigate(to);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      className="relative block bg-transparent border-0 cursor-pointer p-0"
      type="button"
    >
      {children}
    </motion.button>
  );
}

function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="relative z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl font-display font-bold text-gradient"
            >
              HV.
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <MagneticLink key={link.path} to={link.path}>
                <motion.div
                  className={`
                    relative px-6 py-3 font-medium text-sm uppercase tracking-wider
                    transition-colors duration-300
                    ${location.pathname === link.path ? "text-neon-pink" : "text-muted-silver hover:text-white"}
                  `}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </MagneticLink>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, transition: { staggerChildren: 0.1 } },
          closed: {
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
        className={`fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-xl md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 20 },
              }}
            >
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  text-4xl font-display font-bold uppercase tracking-wider
                  ${location.pathname === link.path ? "text-gradient" : "text-white"}
                `}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Navigation;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  X,
  CalculatorIcon,
  Code2,
  Palette,
  Zap,
  Type,
  Lock,
  BookOpen,
  Heart,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import Calculator from "../components/tools/Calculator";
import JSONFormatter from "../components/tools/JSONFormatter";
import ColorPicker from "../components/tools/ColorPicker";
import UnitConverter from "../components/tools/UnitConverter";
import TextCaseConverter from "../components/tools/TextCaseConverter";
import PasswordGenerator from "../components/tools/PasswordGenerator";
import MarkdownPreview from "../components/tools/MarkdownPreview";
import SendToCrush from "../components/tools/SendToCrush";

const tools = [
  {
    routeId: 1,
    id: "calculator",
    name: "Calculator",
    description: "Advanced calculator with basic operations",
    icon: CalculatorIcon,
    color: "from-neon-pink to-electric-violet",
    component: Calculator,
  },
  {
    routeId: 2,
    id: "json",
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON",
    icon: Code2,
    color: "from-bright-cyan to-acid-lime",
    component: JSONFormatter,
  },
  {
    routeId: 3,
    id: "color",
    name: "Color Picker",
    description: "Convert colors between formats (HEX, RGB, HSL)",
    icon: Palette,
    color: "from-acid-lime to-neon-pink",
    component: ColorPicker,
  },
  {
    routeId: 4,
    id: "units",
    name: "Unit Converter",
    description: "Convert length, weight, volume, temperature",
    icon: Zap,
    color: "from-electric-violet to-bright-cyan",
    component: UnitConverter,
  },
  {
    routeId: 5,
    id: "text",
    name: "Text Case Converter",
    description: "Convert text between different cases",
    icon: Type,
    color: "from-neon-pink to-bright-cyan",
    component: TextCaseConverter,
  },
  {
    routeId: 6,
    id: "password",
    name: "Password Generator",
    description: "Generate secure random passwords",
    icon: Lock,
    color: "from-acid-lime to-electric-violet",
    component: PasswordGenerator,
  },
  {
    routeId: 7,
    id: "markdown",
    name: "Markdown Preview",
    description: "Preview and convert markdown to HTML",
    icon: BookOpen,
    color: "from-bright-cyan to-neon-pink",
    component: MarkdownPreview,
  },
  {
    routeId: 8,
    id: "sendtoCrush",
    name: "Send to Crush",
    description: "Ask your crush with an unclickable No button",
    icon: Heart,
    color: "from-neon-pink to-electric-violet",
    component: SendToCrush,
  },
];

function Tools() {
  const { id } = useParams();
  const navigate = useNavigate();

  const routeId = id ? parseInt(id, 10) : null;
  const selected = routeId
    ? tools.find((t) => t.routeId === routeId)
    : undefined;
  const selectedTool = selected?.id ?? null;
  const SelectedComponent = selected?.component;

  useEffect(() => {
    if (id && !selected) {
      navigate("/tools", { replace: true });
    }
  }, [id, selected, navigate]);

  return (
    <PageTransition>
      <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-violet/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-pink/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-gradient">Developer Tools</span>
            </h1>
            <p className="text-xl text-muted-silver max-w-2xl mx-auto">
              A collection of useful utilities to boost your productivity
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/tools/${tool.routeId}`)}
                  className="group relative w-full glass hover:glass-strong transition-all duration-300 rounded-xl p-6 text-left cursor-pointer touch-manipulation"
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${tool.color} transition-opacity duration-300 -z-10`}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} bg-clip-text`}
                    >
                      <IconComponent className="w-6 h-6 text-neon-pink" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-muted-silver">
                      Tool
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                    {tool.name}
                  </h3>
                  <p className="text-muted-silver text-sm">
                    {tool.description}
                  </p>

                  <div className="mt-4 flex items-center text-neon-pink text-sm font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    Open Tool →
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => navigate("/tools")}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-obsidian-light border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative glass-strong"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/tools")}
                className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all"
              >
                <X size={20} />
              </motion.button>

              {/* Tool Header */}
              <div className="border-b border-white/10 p-8 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {selected && (
                    <>
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${selected.color}`}
                        >
                          <selected.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">
                            {selected.name}
                          </h2>
                          <p className="text-muted-silver mt-1">
                            {selected.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Tool Content */}
              <div className="p-8">
                <motion.div
                  key={selectedTool}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {SelectedComponent && <SelectedComponent />}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}

export default Tools;

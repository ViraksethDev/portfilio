import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import PageTransition from "../components/PageTransition";

function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 50 };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [3, -3]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-3, 3]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
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
            <span className="text-neon-pink text-sm uppercase tracking-widest mb-4 block">
              Contact
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-muted-silver text-lg max-w-2xl">
              មានគម្រោងណាមួយនៅក្នុងចិត្ត ឬគ្រាន់តែចង់ជជែកគ្នា?
              ខ្ញុំតែងតែបើកចំហចំពោះការពិភាក្សាអំពីឱកាសថ្មីៗ និងគំនិតច្នៃប្រឌិត។
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 to-electric-violet/20 blur-3xl opacity-50" />
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-8">
                <ContactInfo
                  icon={Mail}
                  label="Email"
                  value="learncodekhmer@gmail.com"
                  href="mailto:learncodekhmer@gmail.com"
                />
                <ContactInfo
                  icon={MapPin}
                  label="Location"
                  value="Phnom Penh, Cambodia"
                  href="#"
                />
                <ContactInfo
                  icon={Phone}
                  label="Phone"
                  value="088 27 58 385"
                  href="tel:+855882758385"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 p-8 rounded-2xl glass border-l-4 border-l-neon-pink"
              >
                <p className="text-muted-silver leading-relaxed">
                  ជាធម្មតាខ្ញុំឆ្លើយតបក្នុងរយៈពេល 24-48 ម៉ោង។
                  សម្រាប់បញ្ហាបន្ទាន់ សូមទាក់ទងមកខ្ញុំតាមទូរស័ព្ទ។
                  ទន្ទឹងរង់ចាំទទួលព័ត៌មានពីអ្នក!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "subject", label: "Subject", type: "text" },
  ];

  return (
    <form onSubmit={handleSubmit} className="relative p-8 rounded-2xl glass">
      <div className="absolute inset-0 rounded-2xl shadow-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="space-y-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FloatingInput
              {...field}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              isFocused={focused === field.name}
              onFocus={() => setFocused(field.name)}
              onBlur={() => setFocused(null)}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-muted-silver text-sm mb-2">
            Message
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              rows={5}
              className="input-neon resize-none"
              placeholder="Tell me about your project..."
              required
            />
            <div
              className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                focused === "message" ? "opacity-100" : "opacity-0"
              }`}
              style={{
                boxShadow:
                  "0 0 20px rgba(255, 46, 147, 0.3), 0 0 40px rgba(255, 46, 147, 0.1)",
              }}
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full px-8 py-4 rounded-xl bg-gradient-primary text-white font-medium
                     transition-all duration-300 hover:shadow-neon-pink disabled:opacity-50 overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Sending...
              </>
            ) : isSubmitted ? (
              "Message Sent!"
            ) : (
              <>
                Send Message
                <Send size={18} />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
    </form>
  );
}

interface FloatingInputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function FloatingInput({
  name,
  label,
  type,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
}: FloatingInputProps) {
  return (
    <div>
      <label className="block text-muted-silver text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="input-neon"
          placeholder={`Enter your ${label.toLowerCase()}`}
          required
        />
        <div
          className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow:
              "0 0 20px rgba(255, 46, 147, 0.3), 0 0 40px rgba(255, 46, 147, 0.1)",
          }}
        />
      </div>
    </div>
  );
}

interface ContactInfoProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
}

function ContactInfo({ icon: Icon, label, value, href }: ContactInfoProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div className="text-muted-silver text-sm mb-1">{label}</div>
        <div className="text-white font-medium group-hover:text-gradient transition-colors duration-300">
          {value}
        </div>
      </div>
    </a>
  );
}

export default Contact;

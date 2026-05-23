/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0F19',
        'obsidian-light': '#111827',
        'neon-pink': '#FF2E93',
        'electric-violet': '#8A2BE2',
        'acid-lime': '#CCFF00',
        'bright-cyan': '#00F5FF',
        'muted-silver': '#94A3B8',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF2E93 0%, #8A2BE2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00F5FF 0%, #CCFF00 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 46, 147, 0.5), 0 0 40px rgba(255, 46, 147, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)',
        'neon-lime': '0 0 20px rgba(204, 255, 0, 0.5), 0 0 40px rgba(204, 255, 0, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 46, 147, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 46, 147, 0.6)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

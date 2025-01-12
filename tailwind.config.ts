import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'metallic-black': '#1A1A1A',
        'metallic-dark': '#888888',
        'metallic-mid': '#C0C0C0',
        'metallic-light': '#FFFFFF',
        'silver': '#C0C0C0',
        'neon-blue': '#00A3FF',
        'neon-green': '#00FF85',
        'bright-red': '#FF4B4B',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      keyframes: {
        'shimmer': {
          '0%, 100%': {
            'background-position': '200% center'
          },
          '50%': {
            'background-position': '-100% center'
          }
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(0,163,255,0.3)',
            textShadow: '0 0 8px rgba(0,163,255,0.3)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0,163,255,0.6)',
            textShadow: '0 0 16px rgba(0,163,255,0.6)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'portal-spin': {
          '0%': {
            transform: 'rotate(0deg) scale(1)'
          },
          '50%': {
            transform: 'rotate(180deg) scale(1.1)'
          },
          '100%': {
            transform: 'rotate(360deg) scale(1)'
          }
        }
      },
      animation: {
        'shimmer': 'shimmer 8s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'portal-spin': 'portal-spin 8s linear infinite'
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
      fontFamily: {
        'exo': ['var(--font-exo2)'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
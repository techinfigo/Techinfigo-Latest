import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#001d21',
        brandSurface: '#002a2f',
        brandYellow: '#fcb632',
        brandBg: '#faf6ed',
        brandText: '#001d21'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 12px 40px -8px rgba(252, 182, 50, 0.45)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 50px 100px -20px rgba(0, 0, 0, 0.15)',
        'card': '0 20px 45px -28px rgba(0, 29, 33, 0.4)',
        'big': '0 50px 90px -40px rgba(0, 0, 0, 0.55)',
        'inner-glow': 'inset 0 0 20px rgba(252, 182, 50, 0.05)'
      }
    },
  },
  plugins: [],
};
export default config;

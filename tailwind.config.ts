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
        'glow': '0 0 30px -5px rgba(252, 182, 50, 0.3)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.1)',
        '4xl': '0 50px 100px -20px rgba(0, 0, 0, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(252, 182, 50, 0.05)'
      }
    },
  },
  plugins: [],
};
export default config;

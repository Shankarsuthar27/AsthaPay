/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: "#FF5733",
          "coral-hover": "#FF5A43",
          "coral-dark": "#E03E1D",
          "coral-light": "#FFF2EF",
          navy: "#0A1931",
          "navy-dark": "#071224",
          "navy-card": "#0C2340",
          "navy-deep": "#0D1B3E",
          "navy-active": "#0B2447",
          "pastel-blue": "#EEF5FF",
          "card-blue": "#F2F7FC",
          slate: "#64748B",
          dark: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -1px rgba(10, 25, 49, 0.05)',
        'soft-md': '0 8px 24px -4px rgba(10, 25, 49, 0.08)',
        'soft-lg': '0 16px 36px -6px rgba(10, 25, 49, 0.12)',
        'soft-xl': '0 24px 48px -10px rgba(10, 25, 49, 0.16)',
        'coral-glow': '0 8px 25px -4px rgba(255, 87, 51, 0.35)',
        'card-hover': '0 20px 35px -10px rgba(13, 27, 62, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

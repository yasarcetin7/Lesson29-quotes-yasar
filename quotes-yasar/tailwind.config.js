/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        purple: "#d53232", //light mode metin rengi//
        midnight: "#6f0531", //dark mode arkaplan//
        tahiti: "#c8c8c8", //dark mode metin rengi//
        silver: "#6a0041", //light mode arkaplan//
        
      },
    },
  },
  plugins: [
    require("daisyui"), 
  ],
};

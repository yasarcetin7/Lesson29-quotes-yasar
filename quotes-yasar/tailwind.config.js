/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Artık DaisyUI kullandığımız için manuel renkleri buradan sildik
    },
  },
  plugins: [
    require("daisyui"),
  ],
  // DAISYUI TEMA AYARLARI BURAYA YAZILIR
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#d53232",      // (Senin purple rengin) Butonlar ve ana vurgular için
          "base-100": "#6a0041",     // (Senin silver rengin) Gündüz modu ana arka planı
          "base-content": "#d53232", // Gündüz modu standart metin rengi
          // İstersen secondary, accent, neutral gibi diğer DaisyUI renklerini de buraya ekleyebilirsin
        },
        dark: {
          "primary": "#c8c8c8",      // (Senin tahiti rengin) Gece modu buton/vurgu
          "base-100": "#6f0531",     // (Senin midnight rengin) Gece modu ana arka planı
          "base-content": "#c8c8c8", // Gece modu standart metin rengi
        },
      },
    ],
  },
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6600",
        secondary: "#B7AB98",
      },
      backgroundImage: {
        menuGradient:
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 77%, rgba(255,255,255,0) 100%, rgba(255,255,255,0) 100%)",
      },
    },
  },
  plugins: [],
};

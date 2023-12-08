/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary_clr: "#90EE90",
      secondary_clr: "#D70040",
    },
  },
  plugins: [require("daisyui")],
};

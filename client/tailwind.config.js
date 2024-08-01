/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc", // Example: a blue color
        danger: {
          DEFAULT: "#e3342f", // This color will be used for 'text-danger'
          600: "#cc1f1a", // This color will be used for 'hover:text-danger-600' and 'focus:text-danger-600'
          700: "#b21e18", // This color will be used for 'active:text-danger-700'
          // You can add more shades as needed
        },
      },
    },
  },
  plugins: [],
};

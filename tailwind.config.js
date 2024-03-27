/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-indigo-500',
    'bg-gray-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-red-500',
    'bg-purple-500',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "rgba(var(--border))",
        background: "rgba(var(--background))",
        text: "rgba(var(--text))",
        section1: "rgba(var(--section1))",
        section2: "rgba(var(--section2))",
        section3: "rgba(var(--section3))",
        section4: "rgba(var(--section4))",
        button: "rgba(var(--button))",
        hoverButton: "rgba(var(--hoverButton))",
        
      }
    },
  },
  plugins: [require("daisyui")],
};

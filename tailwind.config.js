/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        ps: "0px 2px 8px rgba(0, 0, 0, 0.15);",
      },
      colors: {
        ps_blue: "#1890FF",
        ps_neutral: {
          50: "#fafafa",
          100: "#f0f0f0",
          200: "#D9D9D9",
        },
      },
      maxWidth: {
        ps: "940px",
      },
    },
  },
  plugins: [],
};

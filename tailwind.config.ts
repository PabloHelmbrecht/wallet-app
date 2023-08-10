import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#21ab7b',
        secondary: '#24BC87',
        primarylighter: '#43DBA6',
        azure: '#1E87FF',
        eerieblack: '#1E2328',
        emerald: '#28D296',
        saffron: '#FAC346',
        coral: '#FA874B',
        brightpink: '#FA5F69',
        tropicalindigo: '#8C7DFA',
      },
    },
  },
  plugins: [],
} satisfies Config;

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#21ab7b',
        secondary: '#426a5a',
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

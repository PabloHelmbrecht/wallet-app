import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#21ab7b',
        secondary: '#DB3069',
        terciary: '#114b5f',
        win:'#21ab7b',
        loss:'#D12839'
      },
    },
  },
  plugins: [],
} satisfies Config;

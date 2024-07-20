/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pageDarkColor": "#13181e",
        "pageLightColor": "#ff6723"
      },
      fontFamily: {
        playwright: "Playwrite PL",
        poppins: "Poppins",
      }
    }
  },
  plugins: [],
}
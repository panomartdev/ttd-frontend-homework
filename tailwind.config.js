/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       fontFamily: {
          poppins: ['Poppins', 'sans-serif']
       },
       boxShadow: {
        '3xl': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
       },
       backgroundImage: {
        "hero": "url('/hero.webp')"
       },
       lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      }
    },
  },
  plugins: [],
}
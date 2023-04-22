/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
			backgroundImage: {
				bgImage: "url('/dist/images/bg.jpg')"
			}
		}
  },
  plugins: [],
}


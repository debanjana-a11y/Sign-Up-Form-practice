/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
			backgroundImage: {
				bgImage: "url('/public/images/bg.jpg')"
			}
		}
  },
  plugins: [],
}


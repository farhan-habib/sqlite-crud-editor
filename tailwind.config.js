module.exports = {
	mode: "jit",
	purge: ["./public/index.html", "./public/404.html", "./src/**/*.{vue,js}"],
	darkMode: true,
	theme: {
		extend: {},
	},
	content: ["./node_modules/flowbite/**/*.js"],
	plugins: [require("flowbite/plugin")],
};

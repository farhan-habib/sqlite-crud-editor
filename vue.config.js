const { defineConfig } = require("@vue/cli-service");
const { PrimeVueResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
	configureWebpack: {
		plugins: [
			require("unplugin-vue-components/webpack")({
				resolvers: [PrimeVueResolver()],
				extensions: ["vue"],
				dts: false,
				dirs: "",
			}),
		],
	},
	transpileDependencies: true,
	publicPath:
		process.env.NODE_ENV === "production" ? "/sqlite-crud-editor/" : "/",
	pwa: {
		name: "SQLite CRUD Editor",
		themeColor: "#4DBA87",
		msTileColor: "#000000",
		appleMobileWebAppCapable: "no",

		workboxOptions: {
			skipWaiting: true,
		},
	},
});

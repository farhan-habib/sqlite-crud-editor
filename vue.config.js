const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
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

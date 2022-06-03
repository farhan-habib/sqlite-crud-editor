import {
	createRouter,
	// createWebHistory,
	createWebHashHistory,
} from "vue-router";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/HomeView.vue"),
	},
	// {
	// 	path: "/about",
	// 	name: "about",
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () =>
	// 		import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
	// },
	{
		path: "/:catchAll(.*)", // Any unrecognized path will automatically serve the 404 page.
		name: "Page Not Found",
		// redirect: "/404",
		component: () => import("@/views/PageNotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
});

export default router;

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";

import "flowbite";
// import PrimeVue from "primevue/config";

// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";

// import "bootstrap/dist/css/bootstrap-grid.css";
// import "bootstrap";

createApp(App).use(router).mount("#app");

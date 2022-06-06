import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/tailwind.css";

import "flowbite";
// import PrimeVue from "primevue/config";

// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";

// import "bootstrap/dist/css/bootstrap-grid.css";
// import "bootstrap";


import 'splitpanes/dist/splitpanes.css';




import {Splitpanes, Pane} from "splitpanes"
createApp(App)

.component("Splitpanes", Splitpanes)
.component("Pane", Pane)




.use(router).mount("#app");

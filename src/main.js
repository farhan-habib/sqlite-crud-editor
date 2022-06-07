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

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';



import {Splitpanes, Pane} from "splitpanes"
createApp(App)

.component("Splitpanes", Splitpanes)
.component("Pane", Pane)
.component('EasyDataTable', Vue3EasyDataTable)



.use(router).mount("#app");

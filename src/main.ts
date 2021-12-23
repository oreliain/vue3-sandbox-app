import { createApp } from "vue";
import DefaultLayout from "./layouts/default.vue";
import {Router} from  "./router";

const app = createApp(DefaultLayout);
app.use(Router);
app.mount("#sandbox-app");
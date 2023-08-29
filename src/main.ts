import { createApp } from "vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import "./style.scss";
import "./styles/icons.scss";
import "./styles/variables.scss";
import "./styles/inputs.scss";
import "./styles/buttons.scss";
import "./styles/helpers.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { useCommands } from "./store/commands/commands";
import "@vkontakte/vkui/dist/vkui.css";
import { VRipple } from "./common/directives/VRipple";

document.documentElement.style.setProperty("background", "black");

const app = createApp(App).use(createPinia()).use(router);

app.component("EasyDataTable", Vue3EasyDataTable);
app.directive("ripple", VRipple);
app.mount("#app");
useCommands().load().then();

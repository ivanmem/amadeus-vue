import ACommands from "../pages/ACommands/ACommands.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ACommand from "../pages/ACommand/ACommand.vue";
import AAbout from "../pages/AAbout/AAbout.vue";
import ARoles from "../pages/ARoles/ARoles.vue";
import ADon from "../pages/ADon/ADon.vue";
import AEvents from "../pages/AEvents/AEvents.vue";
import bridge from "@vkontakte/vk-bridge";

const routes: RouteRecordRaw[] = [
  { path: "/", component: ACommands },
  {
    path: "/command/:id",
    component: ACommand,
    props: ({ params: { id } }) => {
      return { id };
    },
  },
  { path: "/about", component: AAbout },
  { path: "/roles", component: ARoles },
  { path: "/don", component: ADon },
  { path: "/events", component: AEvents },
];

export const router = createRouter({
  history: createWebHashHistory("https://vk.com/app51547376"),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.query?.vk_app_id && from.fullPath === "/") {
    return { path: to.hash.replace("#", "") || "/", replace: true };
  }
});
router.afterEach((to) => {
  bridge.send("VKWebAppSetLocation", {
    location: to.fullPath,
    replace_state: true,
  });
});
bridge.subscribe((event) => {
  if (event.detail.type === "VKWebAppChangeFragment") {
    router.replace(event.detail.data.location);
  }
});

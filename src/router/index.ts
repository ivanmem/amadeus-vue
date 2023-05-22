import ACommands from "../pages/ACommands/ACommands.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ACommand from "../pages/ACommand/ACommand.vue";
import { computed } from "vue";
import AAbout from "../pages/AAbout/AAbout.vue";
import ARoles from "../pages/ARoles/ARoles.vue";
import ADon from "../pages/ADon/ADon.vue";
import AEvents from "../pages/AEvents/AEvents.vue";

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

export const routerBackExist = computed(() => true);

export const routerBack = () => {
  if (routerBackExist.value) {
    router.back();
    return true;
  }

  return false;
};

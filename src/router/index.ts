import ACommands from "../components/ACommands/ACommands.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ACommand from "../components/ACommand/ACommand.vue";
import { computed } from "vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: ACommands },
  {
    path: "/command/:id",
    component: ACommand,
    props: ({ params: { id } }) => {
      return { id };
    },
  },
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

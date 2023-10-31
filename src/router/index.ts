import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import bridge from "@vkontakte/vk-bridge";

const routes: RouteRecordRaw[] = [
  {
    path: "/command/:id",
    component: () => import("../pages/ACommand/ACommand.vue"),
    props: ({ params: { id } }) => {
      return { id };
    },
  },
  { path: "/", redirect: "/command/" },
  {
    path: "/command/",
    component: () => import("../pages/ACommands/ACommands.vue"),
  },

  { path: "/about", component: () => import("../pages/AAbout/AAbout.vue") },
  { path: "/roles", component: () => import("../pages/ARoles/ARoles.vue") },
  { path: "/don", component: () => import("../pages/ADon/ADon.vue") },
  { path: "/events", component: () => import("../pages/AEvents/AEvents.vue") },
  {
    path: "/top",
    component: () => import("../pages/ATops/ATop.vue"),
  },
  {
    path: "/top/conversations/today",
    component: () => import("../pages/ATops/ATopConversationsToday.vue"),
  },
  {
    path: "/top/conversations",
    component: () => import("../pages/ATops/ATopConversations.vue"),
  },
  {
    path: "/top/conversations/catalog",
    component: () => import("../pages/ATops/ATopConversationsCatalog.vue"),
  },
  {
    path: "/top/users",
    component: () => import("../pages/ATops/ATopUsers.vue"),
  },
  {
    path: "/top/users/today",
    component: () => import("../pages/ATops/ATopUsersToday.vue"),
  },
  {
    path: "/top/commands",
    component: () => import("../pages/ATops/ATopCommands.vue"),
  },
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

import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Item from "../views/TagItem.vue"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    name: "Home",
    meta: { transition: false },
    component: () => import("../views/Home.vue"),
  },

  {
    path: "/money",
    name: "Money",
    meta: { transition: true },
    component: () => import("../views/Money.vue"),
  },

  {
    path: "/statistics",
    name: "Statistics",
    meta: { transition: false },
    component: () => import("../views/Statistics.vue"),
  },

  {
    path: "/tags",
    name: "Tags",
    meta: { transition: false },
    component: () => import("../views/Tags.vue"),
    children: [
      {
        path: ":id",
        name: "TagItem",
        component: () => import("../views/TagItem.vue"),
      },
      {
        path: "add",
        name: "add",
        component: () => import("../views/AddTags.vue"),
      },
    ],
  },
  {
    path: "/details",
    name: "Details",
    meta: { transition: false },
    component: () => import("../views/Details.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    meta: { transition: false },
    component: () => import("../views/NotFound.vue"),
  },
]

const router = new VueRouter({
  routes,
})

export default router

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
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/money",
    name: "Money",
    component: () => import("../views/Money.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue"),
  },
  {
    path: "/tags",
    name: "Tags",
    component: () => import("../views/Tags.vue"),
    children: [
      {
        path: ":id",
        name: "TagItem",
        component: () => import("../views/TagItem.vue"),
      },
    ],
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../views/Details.vue"),
  },
]

const router = new VueRouter({
  routes,
})

export default router

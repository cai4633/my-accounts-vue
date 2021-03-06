import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "@/common/stylus/index.styl"
import "mint-ui/lib/style.css"
import ECharts from "vue-echarts"
import "echarts/lib/chart/line"
import 'echarts/lib/component/tooltip'

Vue.component("v-chart", ECharts)

// TODO 声明第三方库
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

import Vue from 'vue'
import VueRouter from "vue-router"
import routes from "./router"
import EleUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue"

const router=new VueRouter({
    mode:"history",
    routes
})

Vue.use(EleUI)
Vue.use(VueRouter)

Vue.config.productionTip=false

new Vue({
    el:"#app",
    router,
    render:h=>h(App)
})

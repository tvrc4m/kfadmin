import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from "vuex"
import EleUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue"

// 注册组件 
Vue.use(EleUI)
Vue.use(Vuex)
Vue.use(VueRouter)

import routes from "./config/router"
const router=new VueRouter({
    mode:"hash",
    routes
})

import states from "./config/store"
console.log(states)
const store=new Vuex.Store(states)

Vue.config.productionTip=false

// 全局导航
router.beforeEach((to,from,next)=>{
    if(to.requireAuth){
        if(store.state.user.auth_key){
            next()
        }else{
            next({
                path:"/login",
                query:{redirect:to.fullPath}
            })
        }
    }else{
        next()
    }
})

console.log(this)
console.log(Vue.$route)

new Vue({
    el:"#app",
    router,
    store,
    render:h=>h(App)
})

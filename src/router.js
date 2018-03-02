
import DashboardView from "./components/dashboard/index.vue"
import OrderView from "./components/order/index.vue"
import LoginView from "./components/login/index.vue"

export default [
    {
        path:"/",
        components:{
            default:DashboardView
        }
    },
    {
        path:"/dashboard",
        component:OrderView
    },{
        path:"/login",
        component:LoginView
    }
]
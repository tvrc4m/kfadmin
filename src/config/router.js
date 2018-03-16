
import DashboardView from "../components/dashboard/index.vue"
import LoginView from "../components/login/index.vue"
import LawHomeView from "../components/law/home.vue"
import LawAddView from "../components/law/add.vue"

export default [
    {
        path:"/",
        requireAuth:true,
        components:{
            default:DashboardView
        }
    },
    {
        path:"/dashboard",
        requireAuth:true,
        components:{
            default:DashboardView
        }
    },
    {
        path:"/login",
        component:LoginView
    },{
        path:"/law",
        component:LawHomeView
    },{
        path:"/law/add",
        component:LawAddView
    }
]
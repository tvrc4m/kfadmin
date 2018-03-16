import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {//法规列表
    path:"/law/rule",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("law/rule/index"),name:"lawRule",meta:{title:"lawRule",icon:"404"}}]
  },
  {//添加法规
    path:"/law/rule/add",
    component:Layout,
    name:"lawRuleAdd",
    hidden: true,
    children:[{path:"",component:_import("law/rule/form"),name:"lawRuleAdd",meta:{title:"lawRuleAdd"}}]
  },
  {//编辑法规
    path:"/law/rule/edit/:law_rule_id",
    component:Layout,
    name:"lawRuleEdit",
    hidden: true,
    children:[{path:"",component:_import("law/rule/form"),name:"lawRuleEdit",meta:{title:"lawRuleEdit"}}]
  },
   {//法律列表
    path:"/law/",
    component:Layout,
    name:"law",
    hidden: true,
    children:[{path:"",component:_import("law/index"),name:"law",meta:{title:"law"}}]
  },
  {//添加法律
    path:"/law/add",
    component:Layout,
    name:"lawAdd",
    hidden: true,
    children:[{path:"",component:_import("law/form"),name:"lawAdd",meta:{title:"lawAdd"}}]
  },
  {//编辑法律
    path:"/law/edit/:id",
    component:Layout,
    hidden: true,
    children:[{path:"",component:_import("law/form"),name:"lawEdit",meta:{title:"lawEdit"}}]
  },
  {//情感问题库
    path:"/question",
    component:Layout,
    name:"question",
    alwaysShow: false,
    children:[{path:"",component:_import("question/index"),name:"question",meta:{title:"question",icon:"404"}}]
  },
  {//添加情感问题
    path:"/question/add",
    component:Layout,
    name:"questionAdd",
    hidden: true,
    children:[{path:"",component:_import("question/form"),name:"questionAdd",meta:{title:"questionAdd"}}]
  },
  {//专家库
    path:"/expert",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("expert/index"),name:"expert",meta:{title:"expert",icon:"404"}}]
  },{//添加专家
      path:"/expert/add",
      component:Layout,
      children:[{path:"",component:_import("expert/form"),name:"expertAdd",meta:{title:"expertAdd"}}],
      hidden: true
  },
  {//编辑专家
      path:"/expert/edit/:id",
      component:Layout,
      children:[{path:"",component:_import("expert/form"),name:"expertEdit",meta:{title:"expertEdit"}}],
      hidden: true
  },
  {//案例库
    path:"/case",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("case/index"),name:"case",meta:{title:"case",icon:"404"}}]
  },{//添加案例库
      path:"/case/add",
      component:Layout,
      hidden: true,
      children:[{path:"",component:_import("case/form"),name:"caseAdd",meta:{title:"caseAdd"}}]
  },
  {//编辑案例库
      path:"/case/edit/:case_id",
      component:Layout,
      hidden: true,
      children:[{path:"",component:_import("case/form"),name:"caseEdit",meta:{title:"caseEdit"}}]
  },
  {//后台账户列表
    path:"/admin/user",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("adminUser/index"),name:"adminUser",meta:{title:"adminUser",icon:"404"}}]
  },{//添加案例库
      path:"/admin/user/add",
      component:Layout,
      hidden: true,
      children:[{path:"",component:_import("adminUser/form"),name:"adminUserAdd",meta:{title:"adminUserAdd",icon:"404"}}]
  },
  {//添加案例库
      path:"/admin/user/edit/:admin_user_id",
      component:Layout,
      name:'adminUserEdit',
      hidden: true,
      children:[{path:"",component:_import("adminUser/form"),name:"adminUserEdit",meta:{title:"adminUserEdit",icon:"404"}}]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    hidden: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  { path: '*', redirect: '/404', hidden: true }
]

console.log(asyncRouterMap)

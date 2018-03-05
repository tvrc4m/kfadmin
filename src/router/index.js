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
  { path: '/401', component: _import('errorPage/401'), hidden: true },
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
  {
    path:"/law",
    component:Layout,
    redirect:"law",
    name:"law",
    meta:{
      title:"law",
      icon:"404"
    },
    children:[
        {
          path:"",
          component:_import("law/index"),
          name:"law",
          meta:{
            title:"law",
            icon:"404"
          }
        },
        {
          path:"add",
          component:_import("law/add"),
          name:"lawAdd",
          meta:{
            title:"lawAdd",
            icon:"404"
          }
        },
        {
          path:"cat/add",
          component:_import("law/cat/index"),
          name:"lawCatAdd",
          meta:{
            title:"lawCatAdd",
            icon:"404"
          }
        }
    ]
  },
  {//情感问题库
    path:"/emotion",
    component:Layout,
    name:"emotion",
    alwaysShow: false,
    children:[{path:"",component:_import("emotion/index"),name:"emotion",meta:{title:"emotion",icon:"404"}}]
  },
  {//添加情感问题
    path:"/emotion/add",
    component:Layout,
    name:"emotionAdd",
    hidden: true,
    children:[{path:"",component:_import("emotion/add"),name:"emotionAdd",meta:{title:"emotionAdd"}}]
  },
  {//专家库
    path:"/professional",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("professional/index"),name:"professional",meta:{title:"professional",icon:"404"}}]
  },{//添加专家
      path:"/professional/add",
      component:Layout,
      children:[{path:"",component:_import("professional/add"),name:"professionalAdd",meta:{title:"professionalAdd"}}],
      hidden: true
  },
  {//案例库
    path:"/case",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("case/index"),name:"case",meta:{title:"case",icon:"404"}}]
  },{//添加案例库
      path:"/case/add",
      component:_import("case/add"),
      hidden: true
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

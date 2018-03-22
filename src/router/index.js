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
    children:[{path:"",component:_import("law/index"),name:"lawlist",meta:{title:"law"}}]
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
    path:"/emotion/question/collection",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("question/index"),name:"emotion",meta:{title:"emotion",icon:"404"}}]
  },
  {//法律问题库
    path:"/law/question/collection",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("question/index"),name:"law",meta:{title:"lawQuestion",icon:"404"}}]
  },
  {//添加情感问题集
    path:"/:type(emotion|law)/question/collection/add",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{
              base:_import("question/base_form"),
            },
            name:"questionCollectionAdd",
            meta:{title:"questionCollectionAdd"},
            props:(route)=>({type_name:route.params.type})
          }
        ]

      }
    ]
  },
  {//编辑情感问题集
    path:"/:type(emotion|law)/question/collection/edit/:question_collection_id",
    component:Layout,
    name:"questionCollectionEdit",
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{base:_import("question/base_form")},
            name:"questionCollectionEdit",
            meta:{title:"questionCollectionEdit"},
          }
        ]

      }
    ]
  },
  {//查看情感问题集
    path:"/:type(emotion|law)/question/collection/:question_collection_id",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{
              base:_import("question/base_view_form"),
            },
            name:"questionCollectionView",
            meta:{title:"questionCollectionView"},
          }
        ]

      }
    ]
  },
  {//添加情感问题-问题
    path:"/:type(emotion|law)/question/add/:question_collection_id/question",
    component:Layout,
    name:"questionAddQuestion",
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{
              question:_import("question/question_form"),
            },
            name:"questionCollectionAddQuestion",
            meta:{title:"questionCollectionAddQuestion"},
          }
        ]

      }
    ]
  },
  {//编辑情感问题集-问题
    path:"/:type(emotion|law)/question/edit/:question_collection_id/question/:question_id",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{question:_import("question/question_form")},
            name:"questionCollectionEditQuestion",
            meta:{title:"questionCollectionEditQuestion"},
            props:(route)=>({type_name:route.params.type})
          }
        ]

      }
    ]
  },
  {//查看情感问题-问题列表
    path:"/:type(emotion|law)/question/view/:question_collection_id/question",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{
              question:_import("question/question_view_form"),
            },
            name:"questionCollectionViewQuestion",
            meta:{title:"questionCollectionViewQuestion"},
          }
        ]

      }
    ]
  },
  {//添加情感问题-建议
    path:"/:type(emotion|law)/question/add/:question_collection_id/advise",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{
              advise:_import("question/advise_form"),
            },
            name:"questionCollectionAddAdvise",
            meta:{title:"questionCollectionAddAdvise"},
            props:(route)=>({type_name:route.params.type})
          }
        ]

      }
    ]
  },
  {//编辑情感问题集-建议
    path:"/:type(emotion|law)/question/edit/:question_collection_id/advise/:advise_id",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{advise:_import("question/advise_form")},
            name:"questionCollectionEditAdvise",
            meta:{title:"questionCollectionEditAdvise"},
          }
        ]

      }
    ]
  },
  {//查看情感问题集-建议
    path:"/:type(emotion|law)/question/view/:question_collection_id/advise",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{advise:_import("question/advise_view_form")},
            name:"questionCollectionViewAdvise",
            meta:{title:"questionCollectionViewAdvise"},
            // props:(route)=>({type_name:route.params.type})
            props:{type_name:"emotion"}
          }
        ]
      }
    ]
  },

  {//添加情感问题-匹配关系
    path:"/:type(emotion|law)/question/add/:question_collection_id/relation",
    component:Layout,
    name:"questionAddRelation",
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{
              relation:_import("question/relation_form"),
            },
            name:"questionCollectionAddRelation",
            meta:{title:"questionCollectionAddRelation"},
          }
        ]

      }
    ]
  },
  {//编辑情感问题集-匹配关系
    path:"/:type(emotion|law)/question/edit/:question_collection_id/advise/:relation_id",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{relation:_import("question/relation_form")},
            name:"questionCollectionEditRelation",
            meta:{title:"questionCollectionEditRelation"},
          }
        ]

      }
    ]
  },
  {//查看情感问题集-匹配关系
    path:"/:type(emotion|law)/question/view/:question_collection_id/relation",
    component:Layout,
    hidden: true,
    children:[
      {
        path:"",
        component:_import("question/form"),
        children:[
          {
            path:"",
            components:{relation:_import("question/relation_view_form")},
            name:"questionCollectionViewRelation",
            meta:{title:"questionCollectionViewRelation"},
          }
        ]
      }
    ]
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
      children:[
        {
          path:"",
          component:_import("case/form"),
          children:[
            {
              path:"",
              components:{
                case_info:_import("case/case_form"),
              },
              name:"caseAdd",
              meta:{title:"caseAdd"},
            }
          ]
        }
      ]
  },
  {//编辑案例库
      path:"/case/edit/:case_id",
      component:Layout,
      hidden: true,
      children:[{
          path:"",
          component:_import("case/form"),
          children:[
            {
              path:"",
              components:{
                case_info:_import("case/case_form"),
              },
              name:"caseEdit",
              meta:{title:"caseEdit"},
            }
          ]
      }]
  },
  {//编辑案例库
      path:"/case/edit/:case_id/factor",
      component:Layout,
      hidden: true,
      children:[{
          path:"",
          component:_import("case/form"),
          children:[
            {
              path:"",
              components:{
                case_factor:_import("case/case_factor_form")
              },
              name:"caseFactorEdit",
              meta:{title:"caseFactorEdit"},
            }
          ]
      }]
  },
  {//管理案例要素
      path:"/case/factor",
      component:Layout,
      name:"case_factor",
      hidden: true,
      children:[{path:"",component:_import("case/factor/index"),name:"caseFactor",meta:{title:"caseFactor"}}]
  },
  {//管理案例分类
      path:"/case/cate",
      component:Layout,
      name:"case_cate",
      hidden: true,
      children:[{path:"",component:_import("case/cate/index"),name:"caseCate",meta:{title:"caseCate"}}]
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
  {//用户帖子
      path:"/admin/user/topic",
      component:Layout,
      alwaysShow: false,
      children:[{path:"",component:_import("topic/index"),name:"userTopic",meta:{title:"userTopic",icon:"404"}}]
  },
  {//关键词
    path:"/keyword",
    component:Layout,
    alwaysShow: false,
    children:[{path:"",component:_import("keyword/index"),name:"keyword",meta:{title:"keyword",icon:"404"}}]
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

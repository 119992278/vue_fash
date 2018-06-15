import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/', //默认界面
        component: Layout,
        redirect: '/UserInfo',
        name: 'UserInfo',
        hidden: true,
        children: [{
            path: 'UserInfo',
            component: () =>
                import ('@/views/Club/Dashboard/index'),
        }]
    },
    {
        path: '/SuperManager',
        component: Layout,
        redirect: '/SuperManager',
        name: '超级管理员',
        children: [{
            path: 'index',
            name: '超级管理员',
            component: () =>
                import ('@/views/Club/Dashboard/index'),
            meta: { title: '超级管理员' }
        }]
    },
    {
        path: '/Dashboard',
        component: Layout,
        redirect: 'Club/Dashboard',
        name: '俱乐部',
        meta: { title: '俱乐部', icon: 'example' },
        children: [{
            path: 'Dashboard',
            name: '仪表盘',
            component: () =>
                import ('@/views/Club/Dashboard'),
            meta: { title: '仪表盘' }
        }, {
            path: 'ClubInfo',
            name: '俱乐部信息',
            component: () =>
                import ('@/views/Club/ClubInfo'),
            meta: { title: '俱乐部信息' }
        }, {
            path: 'UserInfo',
            name: '个人信息',
            component: () =>
                import ('@/views/Club/UserInfo'),
            meta: { title: '个人信息' }
        }]
    },
    {
        path: '/PeopleManagement',
        component: Layout,
        redirect: '/PeopleManagement/member',
        name: '人员管理',
        meta: { title: '人员管理', icon: 'people' },
        children: [{
                path: 'member',
                name: '会员管理',
                component: () =>
                    import ('@/views/PeopleManagement/member'),
                meta: { title: '会员管理' }
            }, {
                path: 'card',
                name: '卡种管理',
                component: () =>
                    import ('@/views/PeopleManagement/card'),
                meta: { title: '卡种管理' }
            }, {
                path: 'worker',
                name: '工作人员',
                component: () =>
                    import ('@/views/PeopleManagement/worker'),
                meta: { title: '工作人员' }
            },
            {
                path: 'all',
                name: '全部人员',
                component: () =>
                    import ('@/views/PeopleManagement/member'),
                meta: { title: '全部人员' }
            },
        ]
    },
    {
        path: '/APPManagement',
        component: Layout,
        redirect: '/APPManagement/user',
        name: 'APP管理',
        meta: { title: 'APP管理', icon: 'dashboard' },
        children: [{
            path: 'user',
            name: 'app用户列表',
            component: () =>
                import ('@/views/APPManagement/user'),
            meta: { title: 'app用户列表' }
        }, {
            path: 'trainingPlan',
            name: '健身计划',
            component: () =>
                import ('@/views/APPManagement/trainingPlan'),
            meta: { title: '健身计划' }
        }, {
            path: '3',
            name: '课程管理',
            component: () =>
                import ('@/views/PeopleManagement/member'),
            meta: { title: '课程管理' }
        }, {
            path: '4',
            name: '团课管理',
            component: () =>
                import ('@/views/PeopleManagement/member'),
            meta: { title: '团课管理' }
        }, {
            path: '5',
            name: '俱乐部课程预约',
            component: () =>
                import ('@/views/PeopleManagement/member'),
            meta: { title: '俱乐部课程预约' }
        }, {
            path: '6',
            name: '私教预约',
            component: () =>
                import ('@/views/PeopleManagement/member'),
            meta: { title: '私教预约' }
        }]
    }, {
        path: '/Dashboard',
        component: Layout,
        redirect: '/Dashboard/index',
        name: '设备器械管理',
        meta: { title: '设备器械管理', icon: 'excel' },
        children: [{
            path: '7',
            name: '门禁管理',
            component: () =>
                import ('@/views/Club/Dashboard/index'),
            meta: { title: '门禁管理' }
        }, {
            path: '8',
            name: '门卡管理',
            component: () =>
                import ('@/views/tree/index'),
            meta: { title: '门卡管理' }
        }]
    }, {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form' }
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
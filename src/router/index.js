import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
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
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },

    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/table',
    //     name: 'Example',
    //     meta: { title: 'Example', icon: 'el-icon-s-help' },
    //     children: [{
    //             path: 'table',
    //             name: 'Table',
    //             component: () =>
    //                 import ('@/views/table/index'),
    //             meta: { title: 'Table', icon: 'table' }
    //         },
    //         {
    //             path: 'tree',
    //             name: 'Tree',
    //             component: () =>
    //                 import ('@/views/tree/index'),
    //             meta: { title: 'Tree', icon: 'tree' }
    //         }
    //     ]
    // },

    // {
    //     path: '/form',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         name: 'Form',
    //         component: () =>
    //             import ('@/views/form/index'),
    //         meta: { title: 'Form', icon: 'form' }
    //     }]
    // },

    // {
    //     path: '/nested',
    //     component: Layout,
    //     redirect: '/nested/menu1',
    //     name: 'Nested',
    //     meta: {
    //         title: 'Nested',
    //         icon: 'nested'
    //     },
    //     children: [{
    //             path: 'menu1',
    //             component: () =>
    //                 import ('@/views/nested/menu1/index'), // Parent router-view
    //             name: 'Menu1',
    //             meta: { title: 'Menu1' },
    //             children: [{
    //                     path: 'menu1-1',
    //                     component: () =>
    //                         import ('@/views/nested/menu1/menu1-1'),
    //                     name: 'Menu1-1',
    //                     meta: { title: 'Menu1-1' }
    //                 },
    //                 {
    //                     path: 'menu1-2',
    //                     component: () =>
    //                         import ('@/views/nested/menu1/menu1-2'),
    //                     name: 'Menu1-2',
    //                     meta: { title: 'Menu1-2' },
    //                     children: [{
    //                             path: 'menu1-2-1',
    //                             component: () =>
    //                                 import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //                             name: 'Menu1-2-1',
    //                             meta: { title: 'Menu1-2-1' }
    //                         },
    //                         {
    //                             path: 'menu1-2-2',
    //                             component: () =>
    //                                 import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //                             name: 'Menu1-2-2',
    //                             meta: { title: 'Menu1-2-2' }
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     path: 'menu1-3',
    //                     component: () =>
    //                         import ('@/views/nested/menu1/menu1-3'),
    //                     name: 'Menu1-3',
    //                     meta: { title: 'Menu1-3' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'menu2',
    //             component: () =>
    //                 import ('@/views/nested/menu2/index'),
    //             name: 'Menu2',
    //             meta: { title: 'menu2' }
    //         }
    //     ]
    // },
    {
        path: '/codemirror',
        component: Layout,
        redirect: '/codemirror/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/codemirror/index'),
            name: 'Codemirror',
            meta: { title: 'codemirror', icon: 'el-icon-edit-outline' }
        }]
    },
    {
        path: '/fileReader',
        component: Layout,
        redirect: '/fileReader/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/fileReader/index'),
            name: 'FileReader',
            meta: { title: 'fileReader', icon: 'el-icon-reading' }
        }]
    },
    {
        path: '/flowChart',
        component: Layout,
        redirect: '/flowChart/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/flowChart/index'),
            name: 'FlowChart',
            meta: { title: 'flowChart', icon: 'flow' }
        }]
    },
    {
        path: '/selectTree',
        component: Layout,
        redirect: '/selectTree/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/selectTree/index'),
            name: 'SelectTree',
            meta: { title: 'selectTree', icon: 'selectTree' }
        }]
    },
    {
        path: '/fullyDisplay',
        component: Layout,
        redirect: '/fullyDisplay/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/fullyDisplay/index'),
            name: 'FullyDisplay',
            meta: { title: 'fullyDisplay', icon: 'el-icon-document' }
        }]
    },
    {
        path: '/elscroll',
        component: Layout,
        redirect: '/elscroll/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/elscroll/index'),
            name: 'Elscroll',
            meta: { title: 'elscroll', icon: 'el-icon-sort' }
        }]
    },
    {
        path: '/virtualList',
        component: Layout,
        redirect: '/virtualList/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/virtualList/index'),
            name: 'VirtualList',
            meta: { title: 'virtualList', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/elselect',
        component: Layout,
        redirect: '/elselect/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/elselect/index'),
            name: 'elselect',
            meta: { title: 'elselect', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/dottedLineAnimation',
        component: Layout,
        redirect: '/dottedLineAnimation/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/dottedLineAnimation/index'),
            name: 'dottedLineAnimation',
            meta: { title: 'dottedLineAnimation', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/splitPane',
        component: Layout,
        redirect: '/splitPane/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/splitPane/index'),
            name: 'splitPane',
            meta: { title: 'splitPane', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/histogram',
        component: Layout,
        redirect: '/histogram/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/histogram/index'),
            name: 'histogram',
            meta: { title: 'histogram', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/commonLeftArea',
        component: Layout,
        redirect: '/commonLeftArea/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/commonLeftArea/index'),
            name: 'commonLeftArea',
            meta: { title: 'commonLeftArea', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/editable',
        component: Layout,
        redirect: '/editable/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/editable/index'),
            name: 'editable',
            meta: { title: 'editable', icon: 'el-icon-tickets' }
        }]
    },
    // {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [{
    //         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //         meta: { title: 'External Link', icon: 'link' }
    //     }]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
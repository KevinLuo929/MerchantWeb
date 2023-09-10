import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/management",
    component: Layout,
    redirect: "",
    name: "management",
    meta: { title: "管理后台", icon: "el-icon-s-help" },
    children: [
      {
        path: "management",
        name: "management",
        component: () => import("@/views/management/index"),
        meta: { title: "后台管理", icon: "dashboard" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/management/dashboard"),
        meta: { title: "平台数据看板", icon: "dashboard" },
      },
      {
        path: "announcement",
        name: "announcement",
        component: () => import("@/views/management/announcement"),
        meta: { title: "编辑公告", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/purchase",
    component: Layout,
    redirect: "",
    name: "purchase",
    meta: { title: "付费购买", icon: "el-icon-s-help" },
    children: [
      {
        path: "purchase",
        name: "purchase",
        component: () => import("@/views/purchase/index"),
        meta: { title: "对公转账", icon: "dashboard" },
      },
      {
        path: "success",
        name: "success",
        component: () => import("@/views/purchase/success"),
        meta: { title: "下单成功", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/service",
    component: Layout,
    redirect: "/service",
    children: [
      {
        path: "service",
        name: "service",
        component: () => import("@/views/service/index"),
        meta: { title: "客服", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/setting",
    component: Layout,
    redirect: "",
    name: "setting",
    meta: { title: "设置模块", icon: "el-icon-s-help" },
    children: [
      {
        path: "setting",
        name: "setting",
        component: () => import("@/views/setting/documentprinter"),
        meta: { title: "文档打印机设置", icon: "dashboard" },
      },
      {
        path: "pictureprinter",
        name: "pictureprinter",
        component: () => import("@/views/setting/pictureprinter"),
        meta: { title: "证照打印机设置", icon: "dashboard" },
      },
      {
        path: "shopcollection",
        name: "shopcollection",
        component: () => import("@/views/setting/shopcollection"),
        meta: { title: "店铺&收款设置", icon: "dashboard" },
      },
      {
        path: "price",
        name: "price",
        component: () => import("@/views/setting/price"),
        meta: { title: "打印价格设置", icon: "dashboard" },
      },
      {
        path: "download",
        name: "download",
        component: () => import("@/views/setting/download"),
        meta: { title: "宣传物料下载", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/data",
    component: Layout,
    redirect: "/data",
    children: [
      {
        path: "data",
        name: "data",
        component: () => import("@/views/data/index"),
        meta: { title: "数据", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/print",
    component: Layout,
    redirect: "",
    name: "print",
    meta: { title: "打印", icon: "el-icon-s-help" },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/print/index"),
        meta: { title: "未完成订单", icon: "dashboard" },
      },
      {
        path: "printing",
        name: "printing",
        component: () => import("@/views/print/printing"),
        meta: { title: "正在打印订单", icon: "dashboard" },
      },
      {
        path: "printed",
        name: "printed",
        component: () => import("@/views/print/printed"),
        meta: { title: "已完成订单", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/install",
    component: Layout,
    redirect: "",
    name: "install",
    meta: { title: "安装&登录", icon: "el-icon-s-help" },
    children: [
      {
        path: "install",
        name: "install",
        component: () => import("@/views/install/index"),
        meta: { title: "安装", icon: "dashboard" },
      },
      {
        path: "loginbyid",
        name: "loginbyid",
        component: () => import("@/views/install/loginbyid"),
        meta: { title: "登录_门店ID注册", icon: "dashboard" },
      },
      {
        path: "loginbyqrcode",
        name: "loginbyqrcode",
        component: () => import("@/views/install/loginbyqrcode"),
        meta: { title: "登录_店主微信登录", icon: "dashboard" },
      },
    ],
  },

  // {
  //   path: "/form",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       name: "Form",
  //       component: () => import("@/views/form/index"),
  //       meta: { title: "Form", icon: "form" },
  //     },
  //   ],
  // },

  // {
  //   path: "/nested",
  //   component: Layout,
  //   redirect: "/nested/menu1",
  //   name: "Nested",
  //   meta: {
  //     title: "Nested",
  //     icon: "nested",
  //   },
  //   children: [
  //     {
  //       path: "menu1",
  //       component: () => import("@/views/nested/menu1/index"), // Parent router-view
  //       name: "Menu1",
  //       meta: { title: "Menu1" },
  //       children: [
  //         {
  //           path: "menu1-1",
  //           component: () => import("@/views/nested/menu1/menu1-1"),
  //           name: "Menu1-1",
  //           meta: { title: "Menu1-1" },
  //         },
  //         {
  //           path: "menu1-2",
  //           component: () => import("@/views/nested/menu1/menu1-2"),
  //           name: "Menu1-2",
  //           meta: { title: "Menu1-2" },
  //           children: [
  //             {
  //               path: "menu1-2-1",
  //               component: () =>
  //                 import("@/views/nested/menu1/menu1-2/menu1-2-1"),
  //               name: "Menu1-2-1",
  //               meta: { title: "Menu1-2-1" },
  //             },
  //             {
  //               path: "menu1-2-2",
  //               component: () =>
  //                 import("@/views/nested/menu1/menu1-2/menu1-2-2"),
  //               name: "Menu1-2-2",
  //               meta: { title: "Menu1-2-2" },
  //             },
  //           ],
  //         },
  //         {
  //           path: "menu1-3",
  //           component: () => import("@/views/nested/menu1/menu1-3"),
  //           name: "Menu1-3",
  //           meta: { title: "Menu1-3" },
  //         },
  //       ],
  //     },
  //     {
  //       path: "menu2",
  //       component: () => import("@/views/nested/menu2/index"),
  //       name: "Menu2",
  //       meta: { title: "menu2" },
  //     },
  //   ],
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

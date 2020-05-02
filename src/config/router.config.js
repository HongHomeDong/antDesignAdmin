// eslint-disable-next-line
import {UserLayout, BasicLayout, RouteView, BlankLayout, PageView} from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表台', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: 'workplace',
            name: 'Workplace',
            redirect: '/dashboard/workplace/Customer',
            hideChildrenInMenu: true,
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true },
            children: [
              {
                path: 'Customer',
                name: 'Customer',
                hidden: true,
                component: () => import('@/views/dashboard/Customer'),
                meta: { keepAlive: false }
              },
              {
                path: 'Bank',
                name: 'Bank',
                hidden: true,
                component: () => import('@/views/dashboard/Bank'),
                meta: { keepAlive: false }
              },
              {
                path: 'ReceivePerson',
                name: 'ReceivePerson',
                hidden: true,
                component: () => import('@/views/dashboard/ReceivePerson'),
                meta: { keepAlive: false }
              },
              {
                path: 'City',
                name: 'City',
                hidden: true,
                component: () => import('@/views/dashboard/City'),
                meta: { keepAlive: false }
              }
            ]
          },
          {
            path: 'cardDetail',
            name: 'cardDetail',
            hidden: true,
            component: () => import('@/views/dashboard/CardDetail'),
            meta: { keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]

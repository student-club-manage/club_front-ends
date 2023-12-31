import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* eslint-disable */
export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      base: '/club',
      name: 'Home',
      component: resolve => require(['@/components/home/Home'], resolve)
    },
    {
      name: 'Passage',
      path: '/passages/:id/detail.html',
      component: resolve => require(['@/components/passage/Passage'], resolve)
    },
    {
      name: 'PassageList',
      path: '/passages',
      component: resolve =>
        require(['@/components/passage/PassageList'], resolve)
    },
    {
      name: 'Club',
      path: '/clubs/:num',
      component: resolve => require(['@/components/club/Club'], resolve)
    },
    {
      name: 'ClubList',
      path: '/clubs',
      component: resolve => require(['@/components/club/ClubList'], resolve)
    },

    {
      path: '/activities/:id/detail.html',
      name: 'Activity',
      component: resolve => require(['@/components/activity/Activity'], resolve)
    },
    {
      name: 'ActivityList',
      path: '/activities',
      component: resolve =>
        require(['@/components/activity/ActivityList'], resolve)
    },
    {
      name: 'File',
      path: '/files/:id/detail.html',
      component: resolve => require(['@/components/file/File'], resolve)
    },
    {
      name: 'FileList',
      path: '/files',
      component: resolve => require(['@/components/file/FileList'], resolve)
    },
    {
      name: 'SiginPage',
      path: '/sigin',
      component: resolve => require(['../pages/Sigin'], resolve)
    },
    {
      name: 'LogInPage',
      path: '/login',
      component: resolve => require(['../pages/LogIn'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

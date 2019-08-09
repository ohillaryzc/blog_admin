import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/index'
import blogList from '@/components/article/blogList'
import newBlog from '@/components/article/newBlog'
import classify from '@/components/setting/classify'
import about from '@/components/setting/about'
import saying from '@/components/saying'
import userList from '@/components/setting/userList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/article/blogList',
          name: 'blogList',
          component: blogList
        },
        {
          path: '/article/newBlog',
          name: 'newBlog',
          component: newBlog
        },
        {
          path: '/setting/classify',
          name: 'classify',
          component: classify
        },
        {
          path: '/setting/about',
          name: 'about',
          component: about
        },
        {
          path: '/setting/userList',
          name: 'userList',
          component: userList
        },
        {
          path: '/day/saying',
          name: 'saying',
          component: saying
        }
      ],
      redirect: '/article/blogList'
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'iview/dist/styles/iview.css'
import '@/assets/css/cover.css'
import {Button, Layout, Header, Menu, MenuItem, Icon, Sider, Submenu, Breadcrumb, BreadcrumbItem, Content, Upload, Form, FormItem, Input, Row, Col, Tag, Modal, Message, Table, LoadingBar, Page} from 'iview'
import myBreadcrumb from '@/components/common/myBreadcrumb.vue'
import breadcrumbs from '@/config/breadcrumb'

// 注册iview组件
Vue.component('Button', Button)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)
Vue.component('Sider', Sider)
Vue.component('Submenu', Submenu)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Content', Content)
Vue.component('Upload', Upload)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Row', Row)
Vue.component('i-col', Col)
Vue.component('Tag', Tag)
Vue.component('Modal', Modal)
Vue.component('Table', Table)
Vue.component('Page', Page)

// 注册全局组件
Vue.component('myBreadcrumb', myBreadcrumb)

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
Vue.prototype.axios = axios
Vue.prototype.Message = Message
Vue.prototype.loadBar = LoadingBar

axios.interceptors.request.use(config => {
  LoadingBar.start()
  return config
}, err => {
  LoadingBar.error()
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  if (response.data.error_code === 10001) {
    Message.destroy()
    Message.error(response.data.message)
    router.push('/')
  }
  LoadingBar.finish()
  return response
}, err => {
  LoadingBar.error()
  return Promise.reject(err)
})

Message.config({
  duration: 2,
  top: 80
})
Vue.use(mavonEditor)

Vue.prototype.breadcrumbs = breadcrumbs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

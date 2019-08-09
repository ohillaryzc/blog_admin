<template>
  <div style="height: 100%;">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', zIndex: '1501'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <Menu-item name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </Menu-item>
            <Menu-item name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </Menu-item>
            <Menu-item name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </Menu-item>
            <Menu-item name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </Menu-item>
          </div>
        </Menu>
      </Header>
      <Layout :style="{marginTop: '64px'}">
        <Sider hide-trigger  :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto', background: '#fff'}">
          <Menu theme="light" width="auto">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                文章管理
              </template>
              <Menu-item name="1-1" :to="{path: '/article/blogList'}">文章列表</Menu-item>
              <Menu-item name="1-2" :to="{path: '/article/newBlog'}">文章发布</Menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                通用设置
              </template>
              <Menu-item name="2-1" :to="{path: '/setting/classify'}">分类标签</Menu-item>
              <Menu-item name="2-2" :to="{path: '/setting/about'}">关于页面</Menu-item>
              <Menu-item name="2-3" :to="{path: '/setting/userList'}">用户列表</Menu-item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                每日操作
              </template>
              <Menu-item name="3-1" :to="{path: '/day/saying'}">每日格言</Menu-item>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px', marginLeft: '200px'}">
          <Content :style="{padding: '24px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {},
  created () {
  }
}
</script>

<style scoped>

</style>

<template>
  <div style="margin-bottom: 16px;">
    <Breadcrumb>
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem v-for="(item, index) in items" :key="index" :to="item.path">{{item.title}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'my-breadcrumb',
  data () {
    return {}
  },
  methods: {},
  props: ['items'],
  created () {
  }
}
</script>

<style scoped>

</style>

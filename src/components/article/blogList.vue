<template>
  <div>
    <my-breadcrumb :items="breadcrumbs.blogList"></my-breadcrumb>
    <Table :data="blog" :columns="cols"></Table>
    <div class="page">
      <Page :total="page.total" :current="page.pageNum" :page-size="page.pageSize" @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-list',
  data () {
    return {
      blog: [],
      cols: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('div', '简介：' + params.row.description)
          }
        },
        {
          title: '标题',
          key: 'title',
          width: 300
        },
        {
          title: '更新时间',
          key: 'last_time'
        },
        {
          title: '添加时间',
          key: 'add_time'
        },
        {
          title: '浏览次数',
          key: 'views',
          width: 100
        },
        {
          title: '分类',
          key: 'clazz',
          width: 90
        },
        {
          title: '标签',
          key: 'tags',
          render: (h, params) => {
            return params.row.tags.map(item => {
              return h('Tag', {
                props: {
                  color: item.color
                }
              }, item.name)
            })
          }
        }
      ],
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    getList () {
      this.axios.all([this.axios.post('/get/article/list', {pageNum: this.page.pageNum, pageSize: this.page.pageSize}), this.axios.post('/get/classify/list'), this.axios.post('/get/tag/list')])
        .then(this.axios.spread((listR, classifyR, tagsR) => {
          let list = listR.data.list
          this.page.total = listR.data.count
          let classify = classifyR.data
          let tags = tagsR.data
          let cs = []
          classify.forEach(item => {
            cs['id' + item.id] = item
          })
          let ts = []
          tags.forEach(item => {
            ts['id' + item.id] = item
          })
          list.forEach(item => {
            item.clazz = cs['id' + item.classify].name
            item.tags = []
            item.tag.split(',').forEach(t => {
              item.tags.push(ts['id' + t])
            })
          })
          this.blog = list
        }))
    },
    pageChange (pageNum) {
      this.page.pageNum = pageNum
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
  .page{
    margin-top: 16px;
    text-align: right;
  }
</style>

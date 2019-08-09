<template>
  <div>
    <my-breadcrumb :items="breadcrumbs.saying"></my-breadcrumb>
    <div class="add-btn"><Button type="primary" @click="toAdd">今日添加+</Button></div>
    <div class="tab-box">
      <Table :columns="tableColumn" :data="tableData"></Table>
    </div>
    <div class="model-box">
      <Modal :title="isAdd ? '说句话' : '收回说过的话'" v-model="showAdd">
        <Form :model="addForm" :label-width="90">
          <FormItem label="句子内容：">
            <Input v-model="addForm.content" placeholder="你想说点什么"/>
          </FormItem>
          <FormItem label="是谁写的：">
            <Input v-model="addForm.author" placeholder="这句话谁说的"/>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="addSub" :loading="loading">添加</Button>
          <Button type="error" @click="cancel">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      showAdd: false,
      isAdd: true, // 有添加和更新两种模式，默认添加

      tableColumn: [
        {
          type: 'index',
          width: 60
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '添加时间',
          key: 'add_date'
        },
        {
          title: '更新时间',
          key: 'update_date'
        },
        {
          title: 'by',
          key: 'author'
        }
      ], // 表头配置
      tableData: [], // 表格数据

      addForm: {
        content: '',
        author: 'O丶Hillary'
      },
      loading: false // 按钮加载，防止重复提交
    }
  },
  methods: {
    // 显示添加的弹窗，初始化数据
    toAdd () {
      this.showAdd = true
      this.addForm.content = ''
    },

    // 添加数据
    addSub () {
      this.loading = true
      let params = {
        ...this.addForm,
        update_date: new Date()
      }
      this.axios.post('/add/saying', params)
        .then(res => {
          if (res.data.affectedRows) {
            this.getList()
            this.showAdd = false
            this.Message.success('添加成功')
          }
          this.loading = false
        })
    },

    // 取消添加
    cancel () {
      this.showAdd = false
    },

    // 获取表格数据
    getList () {
      this.axios.post('/get/saying/list')
        .then(res => {
          if (res.data) {
            // res.data.forEach(item => {
            //   item.add_date = new Date(item.add_date).toLocaleString()
            //   item.update_date = new Date(item.update_date).toLocaleString()
            // })
            this.tableData = res.data
          } else {
            this.Message.error('请求出错了')
          }
        })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
.add-btn{
  margin-bottom: 16px;
}
</style>

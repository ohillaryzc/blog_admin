<template>
  <div>
    <my-breadcrumb :items="breadcrumbs.classify"></my-breadcrumb>
    <Row>
      <i-col span="12">
        <h3>标签</h3>
        <Tag v-for="(item, index) in tags" :key="index" :color="item.color ? item.color : 'primary'"><span @click="clickTag('tags', false, index)">{{item.name}}</span></Tag>
        <Tag><span @click="clickTag('tags', true)">New* +</span></Tag>
      </i-col>
      <i-col span="12">
        <h3>分类</h3>
        <Tag v-for="(item, index) in classifies" :key="index" :color="item.color ? item.color : 'primary'"><span @click="clickTag('classifies', false, index)">{{item.name}}</span></Tag>
        <Tag><span @click="clickTag('classifies', true)">New* +</span></Tag>
      </i-col>
    </Row>
    <Modal v-model="showAdd" :title="formStatus.type">
      <Form :model="add" ref="form" :label-width="50">
        <FormItem label="名称" prop="name">
          <Input v-model="add.name" placeholder="输入名称"/>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="add.description" placeholder="输入描述（可以为空）"/>
        </FormItem>
        <FormItem label="颜色" prop="color">
          <Input v-model="add.color" placeholder="输入颜色（可以为空）"/>
        </FormItem>
      </Form>
      <div slot="footer" class="modal-footer">
        <Button type="primary" @click="toAdd">提交</Button>
        <Button type="error" v-if="!formStatus.isAdd">禁用</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'classify',
  data () {
    return {
      add: {
        name: '',
        description: '',
        color: ''
      },
      addJSON: '',
      addId: null,
      // 表单状态
      formStatus: {
        type: 'tag',
        isAdd: true
      },
      tags: [],
      classifies: [],

      showAdd: false
    }
  },
  methods: {
    clickTag (type, isAdd, index) {
      // type类型（标签、分类），isAdd是否是添加（添加，更新）
      this.formStatus.type = type
      this.formStatus.isAdd = isAdd
      if (isAdd) {
        this.$refs.form.resetFields()
      }
      if (index || index === 0) {
        let obj = {}
        for (let i in this.add) {
          obj[i] = this[type][index][i]
          this.add[i] = obj[i]
        }
        this.addJSON = JSON.stringify(obj)
        this.addId = this[type][index].id
      }
      this.showAdd = true
    },
    toAdd () {
      let type = this.formStatus.type
      let isAdd = this.formStatus.isAdd
      let url = ''
      if (type === 'tags') {
        if (isAdd) {
          // 添加标签
          url = '/add/tag'
        } else {
          // 更新标签
          if (JSON.stringify(this.add) !== this.addJSON) {
            url = '/update/tag'
          }
        }
      } else if (type === 'classifies') {
        if (isAdd) {
          // 添加分类
          url = '/add/classify'
        } else {
          // 更新分类
          if (JSON.stringify(this.add) !== this.addJSON) {
            url = '/update/classify'
          }
        }
      }

      let params = this.addJSON ? JSON.parse(this.addJSON) : {}
      for (let i in this.add) {
        if (params[i] === this.add[i]) {
          delete params[i]
        } else {
          params[i] = this.add[i]
        }
      }

      if (!isAdd) {
        params.id = this.addId
      }

      if (url) {
        this.axios.post(url, params)
          .then(res => {
            this.showAdd = false
            if (type === 'tags') {
              this.getAllTag()
            } else if (type === 'classifies') {
              this.getAllClassify()
            }
          })
      }
    },
    getAllTag () {
      this.axios.post('/get/tag/list')
        .then(res => {
          this.tags = res.data
        })
    },
    getAllClassify () {
      this.axios.post('/get/classify/list')
        .then(res => {
          this.classifies = res.data
        })
    }
  },
  created () {
    this.getAllTag()
    this.getAllClassify()
  }
}
</script>

<style scoped>
.add{
  display: inline-block;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  padding: 0 4px;
  background-color: #f8f8f9;
  border: 1px solid #dcdee2;
  border-radius: 3px;
}
</style>

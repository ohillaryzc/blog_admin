<template>
  <div>
    <my-breadcrumb :items="breadcrumbs.newBlog"></my-breadcrumb>
    <h3>编辑基本信息</h3>
    <Form :model="base" :label-width="70">
      <Row :gutter="16">
        <i-col span="12">
          <FormItem label="标题：" prop="title">
            <Input v-model="base.title" placeholder="文章一级标题"/>
          </FormItem>
          <FormItem label="简介：" prop="description">
            <Input v-model="base.description" type="textarea" :rows="6" placeholder="文章列表显示的描述，简短文字"/>
          </FormItem>
          <div class="selected">
            <span class="label">分类：</span><Tag v-for="(item, index) in base.classify" :key="index" closable :color="item.color" @on-close="removeTag('classify', index)">{{item.name}}</Tag>
            <span v-if="!base.classify[0]">请在右侧选择...</span>
          </div>
          <div class="selected">
            <span class="label">标签：</span><Tag v-for="(item, index) in base.tag" :key="index" closable :color="item.color" @on-close="removeTag('tag', index)">{{item.name}}</Tag>
            <span v-if="!base.tag[0]">请在右侧选择...</span>
          </div>
        </i-col>
        <i-col span="12">
          <FormItem label="分类：" prop="classify">
            <span class="my-tag" v-for="(item, index) in classifies" :key="index" @click="selectTag({type : 'classify', item : item})" :style="{color: item.color ? item.color : '#515a6e'}">{{item.name}}</span>
          </FormItem>
          <FormItem label="标签：" prop="tag">
            <span class="my-tag" v-for="(item, index) in tags" :key="index" @click="selectTag({type : 'tag', item : item})" :style="{color: item.color ? item.color : '#515a6e'}">{{item.name}}</span>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <h3>编辑主要内容</h3>
    <Upload
      :style="{display: 'inline-block'}"
      :before-upload="handleUpload"
      action="">
      <Button icon="ios-cloud-upload-outline">选择一个.md文件编辑，也可以直接上传</Button>
    </Upload>
    <Button type="primary" @click="toAddBlog" :disabled="base.content ? false : true"> 发布 </Button>
    <mavon-editor v-model="mdText" :islhjs="true" @change="editChange" :style="{maxHeight: '600px'}" ref="md"></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'new-blog',
  data () {
    return {
      base: {
        title: '',
        description: '',
        classify: [],
        tag: [],
        content: ''
      },
      classifies: [],
      tags: [],
      mdText: ''
    }
  },
  methods: {
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
    },

    selectTag (parameters) {
      let {type, item} = parameters
      if (this.base[type].indexOf(item) === -1) {
        this.base[type].push(item)
      }
    },

    removeTag (type, index) {
      this.base[type].splice(index, 1)
    },

    editChange (value, html) {
      this.base.content = html
    },

    toAddBlog () {
      this.axios.post('/add/article', JSON.stringify(this.base))
        .then(res => {
          console.log(res)
        })
    },

    handleUpload (file) {
      let reader = new FileReader()
      reader.onload = (events) => {
        this.mdText = events.target.result
      }
      reader.readAsText(file)
      return false
    }
  },
  created () {
    this.getAllTag()
    this.getAllClassify()
  }
}
</script>

<style scoped>
  .my-tag{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 6px;
    margin: 0 3px;
    border: 1px solid #dcdee2;
    min-width: 40px;
    text-align: center;
    border-radius: 4px;
  }
  .selected{
    margin-bottom: 16px;
  }
  .selected .label{
    display: inline-block;
    width: 50px;
  }
  h3{
    margin-bottom: 16px;
  }
</style>

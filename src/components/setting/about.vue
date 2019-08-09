<template>
  <div>
    <my-breadcrumb :items="breadcrumbs.about"></my-breadcrumb>
    <div class="page">
      <div class="page-des">
        编辑关于页面的信息，包括一些全局显示的title、subtitle、name、motto...等，可编辑富文本，暂缺图片上传功能。
      </div>
      <Upload action="#" :before-upload="upload">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
      <Form :model="about" :label-width="90">
        <FormItem label="首页LOGO">
          <Input v-model="about.logo" placeholder="输入首页LOGO大标题"/>
        </FormItem>
        <FormItem label="副标题logo">
          <Input v-model="about.subtitle" placeholder="输入简短描述"/>
        </FormItem>
        <FormItem label="昵称name">
          <Input v-model="about.name" placeholder="输入昵称名字"/>
        </FormItem>
        <FormItem label="状态motto">
          <Input v-model="about.motto" placeholder="输入近期状态"/>
        </FormItem>
        <FormItem label="昵称position">
          <Input v-model="about.position" placeholder="输入职位方向"/>
        </FormItem>
        <FormItem label="地址address">
          <Input v-model="about.address" placeholder="输入暂住地址"/>
        </FormItem>
        <FormItem label="简介introduction" :label-width="113">
          <Input v-model="about.introduction" placeholder="输入个人简介"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="subInfo">提交</Button>
        </FormItem>
      </Form>
      <quill-editor
        :options="textOptions"
        v-model="about.page">
      </quill-editor>
    </div>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'about',
  data () {
    return {
      oldValue: {},
      about: {
        logo: '', // 大logo
        subtitle: '', // logo副标题
        name: '', // 名字
        motto: '', // 名字下面的text
        page: '', // 富文本页面
        position: '', // 职位
        address: '', // 地址
        introduction: '' // 简介
      },
      textOptions: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],

            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],
            [{'font': []}],
            [{'align': []}],

            ['link', 'image'],
            ['clean']
          ]
        }
      }
    }
  },
  methods: {
    /**
     * 表单提交，判断修改的部分，仅仅提交修改的部分加id
     * */
    subInfo () {
      let params = {}
      let count = false // 记录是否有修改,默认没有修改
      Object.keys(this.about).forEach(item => {
        if (this.about[item] !== this.oldValue[item]) {
          count = true
          params[item] = this.about[item]
        }
      })
      if (count) {
        // 有修改
        params.id = this.oldValue.id
        this.axios.post('/update/about', params)
          .then(res => {
            if (res.data.affectedRows) {
              Object.keys(params).forEach(key => {
                this.oldValue[key] = params[key]
              })
              this.Message.success({
                content: '修改成功'
              })
            }
          })
      } else {
        // 没有修改
        this.Message.warning({
          content: '内容没有修改！'
        })
      }
    },

    upload (e) {
      let formData = new FormData()
      formData.append('image', e)
      this.axios.post('/upload', formData, {headers: {'Content-Type': 'multiple/form-data'}})
      return false
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.axios.post('/get/about')
      .then(res => {
        if (res.data[0]) {
          let result = res.data[0]
          this.oldValue = result
          Object.keys(this.about).forEach(item => {
            this.about[item] = result[item]
          })
        }
      })
  }
}
</script>

<style scoped>
  .page{
    width: 600px;
    margin: 0 auto;
    font-size: 16px;
  }
  .page-des{
    line-height: 2;
    margin-bottom: 20px;
  }
</style>

<template>
  <div>
    <my-breadcrumb :items="breadcrumbs.userList"></my-breadcrumb>
    <div class="form">
      <Form :model="user">
        <FormItem label="密码" :label-width="70">
          <Input v-model="user.password" />
        </FormItem>
        <FormItem label="确认密码" :label-width="70">
          <Input v-model="user.password2" />
        </FormItem>
        <FormItem label="有效天数" :label-width="70">
          <Input v-model="user.expire" />
        </FormItem>
        <FormItem :label-width="0">
          <Button type="primary" @click="addUser">添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-list',
  data () {
    return {
      user: {
        password: '',
        password2: '',
        expire: ''
      }
    }
  },
  methods: {
    addUser () {
      if (this.user.password === this.user.password2) {
        let params = {
          password: this.user.password,
          expire_time: this.user.expire,
          type: 1
        }
        this.axios.post('/add/login', params)
          .then(res => {
            if (res.data.error) {
              this.Message.error(res.data.message)
            } else if (res.data.affectedRows === 1) {
              this.Message.success('添加成功')
            }
          })
      } else {
        this.Message.error('两次密码不一致')
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .form{
    width: 500px;
  }
</style>

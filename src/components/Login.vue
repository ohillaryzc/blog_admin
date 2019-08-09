<template>
  <div>
    <div class="logo">
      <div class="line"></div>
      <div class="logo-box">
        <p>O丶Hillary`s BLOG</p>
        <p>Background management system</p>
      </div>
      <div class="line"></div>
    </div>
    <div class="login-box">
      <div class="title">登录后台管理系统</div>
      <div class="input">
        <Input v-model="password" type="password" placeholder="输入登录码"/>
      </div>
      <Button type="primary" @click="login" long>登录</Button>
    </div>
    <div class="footer">
      <p>
        <a href="#">博客首页</a>
        <span>联系管理员</span>
      </p>
      <p>Copyright © 2019 小白开发，请不要搞我...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.password) {
        this.Message.error('请填写登录码！')
        return
      }
      this.axios.post('/login', {password: this.password})
        .then(res => {
          if (res.data.error) {
            this.Message.error(res.data.message)
          } else {
            this.$router.push({name: 'index'})
          }
        })
    }
  },
  created () {
    this.axios.post('/token/login')
      .then(res => {
        if (!res.data.error) {
          this.$router.push({name: 'index'})
        }
      })
  }
}
</script>

<style scoped>
  .logo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
  }
  .logo .line{
    height: 2px;
    background-color: #409EFF;
    /*width: 40%;*/
    flex-grow: 1;
  }
  .logo .logo-box{
    height: 40px;
    margin: 0 16px;
    text-align: center;
  }
  .logo .logo-box p:nth-child(1){
    font-weight: bold;
    font-size: 18px;
    color: #409EFF;
  }
  .logo .logo-box p:nth-child(2){
    font-size: 12px;
    color: #409EFF;
  }
  .login-box{
    width: 340px;
    height: 340px;
    margin: 100px auto 0;
    padding: 16px;
    box-sizing: border-box;
  }
  .input{
    margin: 16px 0;
  }
  .login-box .title{
    font-size: 18px;
    text-align: center;
  }
  .footer{
    text-align: center;
    color: rgba(0,0,0,0.45);
    font-size: 12px;
  }
  .footer a{
    color: rgba(0,0,0,0.45);
  }
  .footer a:hover{
    color: rgba(0,0,0,0.6);
  }
  .footer p{
    line-height: 30px;
  }
  .footer p span{
    margin: 0 12px;
  }
</style>

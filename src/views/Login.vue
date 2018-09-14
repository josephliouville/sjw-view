<template>
  <div class="yl-login">
    <login-header/>
    <login-main/>
    <login-footer/>
  </div>
</template>
<script>
import { LoginHeader, LoginMain } from '@/components/Login'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginMain,
    LoginFooter: {
      name: 'LoginFooter',
      render() {
        return (
          <div class="yl-login__footer">
            中共陕西省纪律检查委员会 陕西省监察委员会版权所有 陕西纪检监察信息中心运行维护 陕ICP备05006790号
          </div>
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .yl-login {
    .yl-login__footer {
      text-align: center;
      padding: 50px 0;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>

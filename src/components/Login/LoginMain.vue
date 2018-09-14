<template>
  <main class="yl-login__main">
    <!-- <i class="yl-icon yl-icon-user"></i> -->
    <section class="yl-login__box">
      <h2>廉政信息采集系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username" class="login-user">
          <el-input v-model="ruleForm.username"  prefix-icon="yl-icon yl-icon-user" placeholder="请输入用户名" @focus="handleChange"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-password">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="yl-icon yl-icon-password" placeholder="请输入密码" @focus="handleChange"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading"><span v-if="!isLoading">登录</span><span v-else>正在登录中</span></el-button>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>
<script>
// import { on, off } from '@/utils/assist'
import { mapActions } from 'vuex'
import session from '@/utils/session'

export default {
  name: 'LoginMain',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.isSumbited && this.ruleForm.username) {
        this.isLoading = true
        this.handleLogin()
          .catch(_ => callback(new Error('用户名或密码错误')))
          .finally(() => {
            this.isSumbited = false
            this.isLoading = false
          })
      }
    }
    return {
      isLoading: false,
      isSumbited: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }]
      }
    }
  },

  methods: {
    ...mapActions({
      _setToken: 'setToken'
    }),
    ...mapActions({
      setPermissions: 'setPermissions'
    }),

    assemble(data) {
      const { token, buttons, menus } = data
      session.set(token)
      this._setToken(token)
      this.setPermissions({ buttons, menus })
    },

    handleChange() {
      this.isSumbited = false
    },

    handleResize() {},

    handleLogin() {
      return new Promise((resolve, reject) => {
        const { username, password } = this.ruleForm
        this.$post('/login', {
          userName: username,
          password
        }).then(resp => {
          if (resp.data.code === this.request.SUCCESS) {
            this.assemble(resp.data.data)
            this.$router.addRoutes(this.$store.getters.routes)
            console.log(this.$route.query.redirect)
            this.$router.push('/')
            resolve()
          } else {
            reject(new Error())
          }
        }).catch(err => reject(new Error(err)))
      })
    },
    submitForm(formName) {
      this.isSumbited = true
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    // on(window, 'resize', this.handleResize)
  },
  beforeDestroy() {
    // off(window, 'resize', this.handleResize)
  }
}
</script>
<style lang="scss">
.yl-login__main {
  position: relative;
  z-index: 2;
  height: 590px;
  background: url('./login_bg.jpg') center center no-repeat;
  background-size: cover;
  .yl-login__box {
    width: 550px;
    height: 670px;
    position: absolute;
    top: -30px;
    right: 20%;
    background-color: #fff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    border: solid 1px #e5e5e5;
    padding: 50px 90px;
    box-sizing: border-box;
    h2 {
      text-align: center;
      font-weight: normal;
      margin-bottom: 60px;
    }
    .yl-icon {
      font-size: 20px;
      position: relative;
      top: 3px;
      &.yl-icon-user {
        font-size: 24px;
      }
    }
    .el-input__inner {
      height: 48px;
      border-radius: 0;
      background-color: #fafafa;
      box-shadow: 0px 1px 1px 0px rgba(121,121,121,0.3);
    }
    .el-button {
      width: 100%;
      height: 50px;
      border-radius: 0;
      font-size: 20px;
      font-weight: bold;
    }
    .el-form-item {
      margin-bottom: 50px;
      &.login-password {
        margin-bottom: 80px;
      }
    }
    .el-form-item__error {
      font-size: 14px;
    }
  }
}
</style>

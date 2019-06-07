<template>
<div>
  <div class="wrapper">
    <el-row>
      <el-col :span="4" :offset="7">
        <img src="../assets/logo.png" height="50px"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="4">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="userForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="3" :offset="0">
              <el-form-item>
                <el-checkbox checked class="remember">记住密码</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="16">
              <el-button type="text" @click="forgetPassword">忘记密码？</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-col :span="24" :offset="7">
          <el-button type="primary" style="width:70%;" @click="Signin">登录</el-button>
        </el-col>
        <el-col :offset="10">
          没有账号？去 <el-button type="text" @click="goToSignup">注册</el-button>
        </el-col>

      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      userForm: {
        email: '',
        password: '',

      },
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '请输入合法的邮箱',
          trigger: 'blur'
        }],
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }

    }
  },
  mounted: function () {

  },
  methods: {
    Signin: function () {
      this.$message({
        message: '登录成功',
        type: 'success'
      })
      this.$router.push('/')
    },
    goToSignup: function () {
      this.$router.push('/signup')
    },
    forgetPassword:function () {
      
    }
  }
}
</script>

<style scoped>
.wrapper {
  left: 106px;
  top: 202px;
  width: 555px;
  height: 665px;
  line-height: 20px;
  opacity: 0.48;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 0px 0px 0px rgba(170, 170, 170, 1);
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>

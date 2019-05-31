<template>
  <div id="sign-wrap">
    <h1 class="signup-title">注册</h1>
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" placeholder="请设置密码" type="password"></el-input>
      </el-form-item>
       <el-form-item label="确认密码" prop="confirm_password">
        <el-input v-model="userForm.password" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="email">
        <el-input v-model="userForm.email" placeholder="请选择类别"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userForm.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signup">注册</el-button>
        <el-button @click="signin">去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'signup',
  data() {
    return {
      userForm: {
        username: '',
        telephone: '',
        email: '',
        password: '',
        nickname:'',

      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, {
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '请输入合法的邮箱',
          trigger: 'blur'
        }],
        password: [{ required: true, message: '请设置密码', trigger: 'blur' }, { min: 6, max: 12, message: '长度在 6 到 18 个字符', trigger: 'blur' }]
      }
    }
  },
  mounted: function() {
    
  },
  methods: {
    Signup: function() {
    },
    Signin: function() {
    }
  }
}
</script>



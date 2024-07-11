<template>
  <div style="width: 85vw;">
  
    <div v-if="this.sessionData">
      <br>
      <br>
      <header style="font-size: 40px; text-align: center">您已成功登录</header>
      <br><br>
      <div style="text-align: center">要修改密码或提权，请联系馆长</div>
      <br>
    <br>
    <el-button type="warning" @click="logout" style="
    width: 25vw; margin-left: 35%"> 登出</el-button>
  </div>
  <div v-else style="width: 85vw;">
    <header style="font-size: 40px; text-align: center">登陆</header>
    <br>
    <br>
    <el-form :model="ruleForm" 
    status-icon :rules="rules" 
    ref="ruleForm" 
    label-width="100px" 
    class="demo-ruleForm"
    style="margin-left: 20%; margin-right: 20%;">
    
    <el-form-item label="管理员ID" prop="number">
        <el-input  type="number" v-model="ruleForm.number" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" 
      style="width: 25vw; margin-left: 20%;">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</div>
</template>


  <script>
import axios from 'axios';
    export default {
        data() {
    return {
      ruleForm: {
        pass: '',
        number: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      sessionData: false,
      username: ''
    };
  },
  mounted() {
    console.log("登录页面已加载")
    if(sessionStorage.getItem("token")) {
      this.sessionData = true
    }
  },
  methods: {
    logout(){
      sessionStorage.clear()
      this.username = ''
      this.sessionData = false
      alert("你已成功登出")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loginData = {
            id: this.ruleForm.number,
            password: this.ruleForm.pass
          }
          let config = null
            axios.post(
            "/api/login",
            loginData,
            config
          ).then(
            (resp)=>{
              if(resp.data.code != 200){
                alert(resp.data.msg)
              }
              else{
                sessionStorage.setItem("token", resp.data.data)
                console.log(resp.data)
                alert("登录成功")
                location.reload()
              }
            }
          ).catch(()=>{
            alert("网络错误，请联系维护人员")
          })

        } else {
          console.log('错误提交!!')
          
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
  </script>

  <style>
  
  </style>
<template>
  <div style="width: 85vw; background-color: aquamarine;">
    <header>登陆</header>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    
    <el-form-item label="管理员ID" prop="number">
        <el-input  v-model="ruleForm.number" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>


  <script>
// import axios from 'axios';
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //     axios.post('/user', {
        //         id : this.ruleForm.number,
        //         password : this.ruleForm.pass
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        //   alert('提交成功！');
          // 在这里处理提交逻辑，例如调用后端API
        } else {
          console.log('错误提交!!');
          return false;
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
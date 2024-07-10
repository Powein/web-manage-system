<template>
  <div style=" align-items: center; background-color: aquamarine; width:85vw;">
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="120px" -->
         
      <el-form ref="form" :model="form"
            :rules="rules" label-width="120px"
      style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
          <br/>
          <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">修改图书</header>
          <br/>
          <div style="text-align: center">未填写的项默认不改变</div>   
          <br/>
        <el-form-item label="图书ID" prop="bookId">
          <el-input v-model="form.bookId"></el-input>
        </el-form-item>

        <el-form-item label="图书名称" prop="name">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="条形码"  prop="barCode">
          <el-input v-model="form.barCode"></el-input>
        </el-form-item>
        <el-form-item label="译者">
          <el-input v-model="form.translator"></el-input>
        </el-form-item>
        <el-form-item label="ISBN码">
          <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
        </el-form>


        <el-switch style="margin-left: 50%;"
        v-model="isDelete"
        active-text="删除"
        inactive-text="不删除">
        </el-switch>
        <br>
        <br>
        <br>
        <el-button type="primary" @click="updateBook" style="width: 35vw; margin-left: 33%;">
          提交删改</el-button>

      </div>
    </template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      rules:{
        bookId:[{//此处需要输入一个条形码
              required:true, message:"请输入图书ID", trigger: 'blur'
            }],
      },
      form:{
        bookName:null,
        author:null,
        barCode:null,
        translator:null,
        ISBN:null,
        press:null,
        bookId:null
      },
      isDelete:false
    }
  },
  methods:{
    updateBook(){
      axios({
            method: 'post',
            url: 'api/book/update',
            data:{
              id:this.form.bookId,
              bookName: this.form.bookName,
              author: this.form.author,
              barCode: this.form.barCode,
              translator: this.form.translator,
              ISBN: this.form.ISBN,
              press: this.form.press,
              del:this.isDelete
            },
            headers:{
              'token':sessionStorage.getItem("token")
            }
          }).then(response => {
            if(response.data.code != 0){
              console.log(response.data)
              this.bookData=response.data.data
            } else {
              alert(response.data.msg)
            }
      })
      this.form = {
        bookName:null,
        author:null,
        barCode:null,
        translator:null,
        ISBN:null,
        press:null,
        bookId:null
      }
    }
  }
}
</script>

<style>

</style>

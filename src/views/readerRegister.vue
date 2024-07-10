<template>
<div style=" align-items: center; background-color: aquamarine; width:85vw;">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px"
        style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
        <br/>
        <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">读者注册</header>
        <br/>
        <br/>
        <el-form-item label="读者名称" prop="name">
        <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="读者" prop="author">
        <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="条形码"  prop="barCode">
        <el-input v-model="form.barCode"></el-input>
        </el-form-item>
        <el-form-item label="译者" prop="translator">
        <el-input v-model="form.translator"></el-input>
        </el-form-item>
        <el-form-item label="ISBN码" prop="ISBN">
        <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
        <el-input v-model="form.press"></el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary" @click="addBook" style="width: 35vw; margin-left: 33%;">增添书籍</el-button>
    </div>
</template>
    
    
<script>
import axios from 'axios';
export default {
    data() {
        return {
            rules:{
            barCode:[{//此处需要输入一个条形码
                required:true, message:"请输入条形码", trigger: 'blur'
            }],
            },

            form: {
                bookId:'',
                bookName:'',
                author:'',
                barCode:'',
                translator:'',
                ISBN:'',
                press:''
            },
        }
    },
    methods: {
        addBook() {
            axios({
                    method:'post',
                    url: 'api/reader/insert',
                    data:{
            id:null,
            barCode:this.form.barCode,
            bookName:this.form.bookName,
            translator:this.form.translator,
            press:this.form.press,
            ISBN:this.form.ISBN,
            author:this.form.author
            },
                    headers:{
                    'token':sessionStorage.getItem("token")
                    }
                }).then(
                (resp)=>{
                    if(resp.data.code != 200){
                    alert(resp.data.msg)
                    } else {
                    alert("成功增添图书")
                    }
                }
                ).catch(()=>{
                alert("图书信息非法")
                })
        }
    }
}
    </script>
    
    <style>
    
    </style>
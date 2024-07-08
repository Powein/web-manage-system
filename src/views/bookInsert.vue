<template>
<div style=" align-items: center; background-color: aquamarine; width:85vw;">
    <el-form ref="form" :model="form" label-width="120px"
      style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
        <br/>
        <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">插入图书</header>
        <br/>
        <br/>
        <el-form-item label="图书ID">
          <el-input v-model="form.bookId"></el-input>
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addBook" style="width: 35vw; margin-left: 33%;">增添书籍</el-button>
  </div>
  </template>
  

<script>
export default {
    data() {
        return {
            form: {
                bookName:'',
                bookId:'',
                author:'',
                press:''
            }
        }
    },
    methods: {
        addBook() {
            console.log("ADDBOOK triggered")
        }
    }
}
</script>

<style>

</style>
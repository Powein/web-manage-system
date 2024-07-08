<template>
<div style=" align-items: center; background-color: aquamarine; width:85vw;">
  <el-form ref="form" :model="form" label-width="120px"
    style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
      <br/>
      <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">图书借阅</header>
      <br/>
      <br/>
      
      <el-form-item label="读者ID">
        <el-input v-model="form.readerId"></el-input>
      </el-form-item>
      <el-form-item label="要借阅的书籍ID">
        <el-input v-model="form.bookId"></el-input>
      </el-form-item>

    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        form:{
          readerId:'',
          bookId:''
        }
      }
    }
  }
</script>

<style>

</style>
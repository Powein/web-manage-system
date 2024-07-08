<template>
<div style=" align-items: center; background-color: aquamarine; width:85vw;">
  <el-form ref="form" :model="form" label-width="120px"
    style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
      <br/>
      <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">图书查询</header>
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
    <template>
  <el-table
    :data="bookData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="书名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="出版社">
    </el-table-column>
    <el-table-column
      prop="address"
      label="图书ID">
    </el-table-column>
    <el-table-column
      prop="address"
      label="译者">
    </el-table-column>
  </el-table>
</template>
</div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                bookId: '',
                bookName: ''
            },
            bookData:[

            ]
        }
    }
}
</script>

<style>

</style>
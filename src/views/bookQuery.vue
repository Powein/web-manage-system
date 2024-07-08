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
        <el-button type="primary" @click="addBook" style="width: 35vw; margin-left: 33%;">查询</el-button>
        <br>
        <br>
        <!-- 分割线 -->
          <el-divider></el-divider>
        <header style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; text-align: center;">单击图书以借阅</header>
        <br>
        <br>
  <el-table
    :data="bookData"
    @row-click="handleClick"
    stripe
    style="width: 100%">
    <el-table-column
      prop="bookName"
      label="书名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="press"
      label="出版社">
    </el-table-column>
    <el-table-column
      prop="bookId"
      label="图书ID">
    </el-table-column>
    <el-table-column
      prop="translator"
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
                bookName: '',
                author: '',
                press: ''
            },
            bookData:[
                {
                    bookId: 1,
                    bookName: 'Java从入门到放弃',
                    author:'郭林',
                    press:'机械工业出版社',
                    translator: '高斯林'
                },
                {
                    bookId: 2,
                    bookName: 'Python从入门到实践',
                    author:'马云',
                    press:'人民邮电出版社',
                }
            ]
        }
    },
    methods: {
        handleClick(row) {
            let index = this.bookData.indexOf(row)
            if(index !== -1){
                console.log(this.bookData[index])
                let result = prompt("请键入读者ID")
                //查询是否有此人
                console.log(result)
            }
        }
    }
}
</script>

<style>

</style>
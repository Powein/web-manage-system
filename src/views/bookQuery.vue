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
      <el-form-item label="条形码">
        <el-input v-model="form.barCode"></el-input>
      </el-form-item>
      <el-form-item label="ISBN码">
        <el-input v-model="form.ISBN"></el-input>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="form.press"></el-input>
      </el-form-item>
    </el-form>
    <template>
        <el-button type="primary" @click="queryBook" style="width: 35vw; margin-left: 33%;">查询</el-button>
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
      prop="id"
      label="图书ID">
    </el-table-column>
    <el-table-column
      prop="inTime"
      label="入馆时间">
    </el-table-column>
    <el-table-column
      prop="avail"
      label="是否在馆" :formatter="formatAvail">
    </el-table-column>
  </el-table>
</template>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            form:{
                bookId: null,
                bookName: null,
                author: null,
                press: null,
                barCode: null,
                translator: null,
            },
            bookData:[
                // {
                //     bookId: 1,
                //     bookName: 'Java从入门到放弃',
                //     author:'郭林',
                //     press:'机械工业出版社',
                //     translator: '高斯林'
                // },
                // {
                //     bookId: 2,
                //     bookName: 'Python从入门到实践',
                //     author:'马云',
                //     press:'人民邮电出版社',
                // }
            ],
        }
    },
    methods: {
      formatAvail(row, column, avail){
        return avail? "在馆" :"不在馆"
      },
        handleClick(row) {
            let index = this.bookData.indexOf(row)
            if(index !== -1){
              if(!this.bookData[index].avail){
                return;
              }
                console.log(this.bookData[index])
                let result = prompt("请键入读者ID")
                let borrowDays = prompt("请键入借阅时间")
                let borrowData = {
                  bookId: this.bookData[index].id,
                  readerId: result,
                  id:null,
                  borrowTime:null,
                  backTime:null,
                  operator:null,
                  ifBack:null,
                }
                console.log("正在借阅")
                console.log(borrowData)
                axios({
                  method:'post',
                  url: 'api/borrow/borrowBook/' + borrowDays,
                  data:borrowData,
                  headers:{
                    'token':sessionStorage.getItem("token")
                  }
                }).then((resp)=>{
                  console.log(resp.data)
                  if(resp.data.code != 200){
                    alert(resp.data.msg)
                  } else {
                    alert("操作成功")
                  }
                }).catch((resp)=>{
                  console.log(resp.data)
                })
                console.log(result)
            }
        },
        queryBook(){
          let queryData={
            id:this.form.bookId,
            barCode:this.form.barCode,
            name:this.form.bookName,
            author:this.form.author,
            press:this.form.press,
          }

          axios({
            method: 'post',
            url: 'api/book/query',
            data:queryData,
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
        }
    }
}
</script>

<style>

</style>
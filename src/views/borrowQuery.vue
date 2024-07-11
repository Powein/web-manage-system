<template>
    <div style="width: 85vw;">
    
    <el-form ref="form" :model="form" label-width="80px" 
    style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
      <br/>
      <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">图书借阅查询</header>
      <br/>
      <br/>
      
      <el-form-item label="读者ID">
        <el-input v-model="form.readerId"></el-input>
      </el-form-item>
      <el-form-item label="书籍ID">
        <el-input v-model="form.bookId"></el-input>
      </el-form-item>


      <br/>
        <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-left: 25%;">
        </el-date-picker>
        <br>
        <br>
      <el-form-item style="width: max-content;">
        <el-button type="primary" @click="queryBorrow" style="width: 35vw; margin-left: 5%;">查询</el-button>
      </el-form-item>
    </el-form>


  <el-table :data="borrowData" @row-click="handleClick">
    <el-table-column property="readerName" label="读者" width="150"></el-table-column>
    <el-table-column property="borrow.readerId" label="读者ID" width="150"></el-table-column>
    <el-table-column property="bookName" label="借阅书籍" width="200"></el-table-column>
    <el-table-column property="borrow.bookId" label="书籍ID"></el-table-column>
    <el-table-column property="borrow.borrowTime" label="借出日期"></el-table-column>
    <el-table-column property="borrow.backTime" label="归还日期"></el-table-column>
    <el-table-column property="borrow.ifBack" label="是否归还">
    
        <template v-slot:default="{ row }">
      {{ row.borrow.ifBack === true ? '已归还' : '未归还' }}
    </template>
    </el-table-column>
    <el-table-column property="borrow.operator" label="操作者"></el-table-column>
    <el-table-column property="borrow.id" label="借阅ID"></el-table-column>
  </el-table>

</div>
    </template>
    
    <script>
import axios from 'axios';

      export default {
        data() {
          return {
            form: {
              fromTime:null,
              toTime:null,
              readerId:null,
              bookId:null,
            },
            value1: '',


        borrowData: [],
          }
        },
        methods: {
          queryBorrow(){
            axios({
              method:'post',
              url: 'api/borrow/query',
              data: {
                fromTime: this.value1[0],
                toTime:this.value1[1],
                readerId:this.form.readerId,
                bookId:this.form.bookId,
                borrowId:null,
                ifBack:null,
              },
              headers:{
              'token':sessionStorage.getItem("token")
              }
            }).then((resp)=>{
              if(resp.data.code != 200){
                alert("权限不足或输入不合法")
                this.form = {
                  fromTime:null,
                  toTime:null,
                  readerId:null,
                  bookId:null,
                }
                return
              }
              this.borrowData = resp.data.data
              for(let i = 0; i < this.borrowData.length; i++) {
                if(this.borrowData[i].borrow.borrowTime != undefined){
                  this.borrowData[i].borrow.borrowTime = this.borrowData[i].borrow.borrowTime.substr(0,10)
                }
                  
                if(this.borrowData[i].borrow.backTime != undefined)
                  this.borrowData[i].borrow.backTime = this.borrowData[i].borrow.backTime.slice(0,10)
              }
              console.log(this.borrowData)
            }).catch((error)=>{
              console.log(error)
              alert("服务器不在线，请联系网络维护人员")
            })
          },

      handleClick(row) {//点击即可归还图书
        if(row.borrow.ifBack) 
          return
        let result = confirm("确定归还？")
        if(!result)
          return

        console.log("开始归还");
          axios({
          method: 'post',
          url: 'api/borrow/returnBook',
          data: row.borrow,
          headers:{
            'token':sessionStorage.getItem("token")
          }
        })
        row.borrow.ifBack = true
        row.borrow.backTime = new Date().toISOString().slice(0,10)
        return
    }
  }
}
    </script>
    
    <style>
      .my-label {
    background: #E1F3D8;
  }

  .my-content {
    background: #FDE2E2;
  }
    </style>
<template>
    <div style="width: 85vw;">
    
    <el-form ref="form" :model="form" label-width="80px" 
    style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
      <br/>
      <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">图书借阅查询</header>
      <br/>
      <br/>
      
      <el-form-item label="读者ID">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="书籍ID">
        <el-input v-model="form.name"></el-input>
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
        <el-button type="primary" @click="onSubmit" style="width: 35vw; margin-left: 5%;">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
<el-dialog title="借阅记录" :visible.sync="dialogTableVisible" >
  <el-table :data="borrowData" @row-click="handleClick">
    <el-table-column property="reader" label="读者" width="150"></el-table-column>
    <el-table-column property="readerId" label="读者ID" width="150"></el-table-column>
    <el-table-column property="book" label="借阅书籍" width="200"></el-table-column>
    <el-table-column property="bookId" label="书籍ID"></el-table-column>
    <el-table-column property="date" label="借出日期"></el-table-column>
    <el-table-column property="isReturn" label="是否归还">
        <template v-slot:default="{ row }">
      {{ row.isReturn === true ? '已归还' : '未归还' }}
    </template>
    </el-table-column>
  </el-table>
</el-dialog>

</div>
    </template>
    
    <script>
      export default {
        data() {
          return {
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            value1: '',
        borrowData: [{
            date:'2022-2-22',
            reader:'雾雨魔理沙1',
            readerId:'123456',
            book:"C primer plus",
            bookId:"10000",
            borrowId:1,
            isReturn: true,
        }, {
            date:'2022-2-22',
            reader:'雾雨魔理沙2',
            readerId:'123456',
            book:"C primer plus",
            borrowId:2,
            bookId:"10000",
            isReturn: false,
        },{
            date:'2022-2-22',
            reader:'雾雨魔理沙3',
            readerId:'123456',
            book:"C primer plus",
            borrowId:3,
            bookId:"10000",
            isReturn: false,
        }, {
            date:'2022-2-22',
            reader:'雾雨魔理沙4',
            readerId:'123456',
            book:"C primer plus",
            borrowId:4,
            bookId:"10000",
            isReturn: false,
        }],
            dialogTableVisible: false,
          }
        },
        methods: {
          onSubmit() {
            console.log('submit!');
            console.log({
              fromtime:this.form.date1,
              totime:this.form.date2
            });
            this.dialogTableVisible = true;
          },
          
          handleClose(done) {
        this.$confirm('确认关闭？')
        //eslint-disable-next-line
          .then(_ => {
            done();
          })
          //eslint-disable-next-line
          .catch(_ => {});
      },
      handleClick(row) {
        const index = this.borrowData.findIndex(item => item.borrowId === row.borrowId);
        if (index !== -1) {
        console.log(this.borrowData[index])
        let result = confirm("确认还书？");
        if (result) {
        // 用户点击了确定按钮，执行相应的操作
        console.log("用户选择了确定");
            this.borrowData[index].isReturn = true;
        } else {
        // 用户点击了取消按钮
        console.log("用户选择了取消");
        }
    }
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
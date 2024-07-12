<template>
  <div>
    <header style="background-color: #B3C0D1; color: #333; border-radius: 5px; text-align: center;;"><img src="./assets/lms.png" height="90px" ></header>
    <el-container style="height: 830px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- <el-menu :default-openeds="['1', '2']"> -->
    <el-menu >
      <el-submenu index="1">

        <template slot="title"><i class="el-icon-message"></i>图书业务</template>


        <el-menu-item-group>
          <template slot="title">图书管理</template>
          <el-menu-item index="1-1" ><router-link to="/book/query" class="jumplink">图书查询 </router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/book/insert" class="jumplink">录入图书</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/book/modify" class="jumplink">删改图书</router-link></el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="借阅管理">
          <!-- <el-menu-item index="1-4"><router-link to="/borrow/book" class="jumplink">图书借阅</router-link></el-menu-item>
        <el-menu-item index="1-5"><router-link to="/borrow/return" class="jumplink">图书归还</router-link></el-menu-item> -->
        <el-menu-item index="1-6"><router-link to="/borrow/query" class="jumplink">借阅查询和归还</router-link></el-menu-item>
      </el-menu-item-group>
      </el-submenu>

      
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>用户和权限管理</template>

        <el-menu-item-group title="管理员管理">
          <template slot="title">管理员模块</template>
          <el-menu-item index="2-1"><router-link to="/admin/pass" class="jumplink">管理员密码管理</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/admin/groups" class="jumplink">管理员组管理</router-link></el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="读者管理">
          <template slot="title">读者管理模块</template>
          <el-menu-item index="2-3"><router-link to="/reader/register" class="jumplink">读者注册</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link to="/reader/modify" class="jumplink">读者信息修改</router-link></el-menu-item>
          <el-menu-item index="2-5"><router-link to="/reader/query" class="jumplink">查询读者信息</router-link></el-menu-item>
          <el-menu-item index="2-6"><router-link to="/reader/groups" class="jumplink">读者组管理</router-link></el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-menu-item index="2-7" v-if="notLogin"><router-link to="/login" class="jumplink">登录&登出</router-link></el-menu-item>
    </el-menu>
  </el-aside>
  
  <!-- <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-main> -->
    <div>
      <router-view></router-view>

      
    </div>
  <!-- </el-container> -->
</el-container>
<footer style="
  background-color: #f5f5f5;
  color: #666;
  padding: 15px 0;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #ddd;
">
  <div style="margin-bottom: 10px;">
    <a href="#" style="color: inherit; text-decoration: none;">作者: Powein@github.com</a>
  </div>
  <div>
    <a href="https://github.com/Powein/web-manage-system" style="color: blue;">Open Source, </a><a style="color: inherit; text-decoration: none;">MIT License Copyright (c) 2024 Powei, ChongQing University</a>
  </div>
</footer>
  </div>

</template>
<script>
// import ManageView from './views/elements/ManageView.vue'

// import DialogFormView from './views/elements/DialogFormView.vue'
// import DialogView from './views/elements/DialogView.vue'
// import ElementView from './views/elements/ElementView.vue'
// import PageView from './views/elements/PageView.vue'
// 控制模板的数据来源和行为
// import TestView from './views/elements/TestView.vue'
export default {
  // components : { TestView },
  // components: { ManageView },
  // components: {ElementView, PageView, DialogView, DialogFormView },
  data() {
      
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        notLogin:true,
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

<style>
/* 控制css样式代码 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.jumplink {
  display: block;
  padding: 10px 20px;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.3s;
}

.jumplink:hover {
  color: #0056b3; /* Darker blue text on hover */
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

</style>

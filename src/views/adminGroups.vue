<template>
    <div style="width: 85vw">
        <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif; margin: 5%">权限组策略</header>
    <div style="text-align: center;">
        <header style="font-size: medium; text-align: center; font-family: Arial, Helvetica, sans-serif;">单击任意项以删改</header>
        <el-button @click="newAdminVisible = true" style="margin: 1%; font-size: large;" type="primary">添加权限组</el-button>

    </div>
    <div style="display: flex">
    <el-table
    :data="adminItems"
    @row-click="prepareUpdate"
    stripe
    style="width: 100%">
    <el-table-column
        prop="name"
        label="组名">
    </el-table-column>

    <el-table-column
        prop="id"
        label="组ID">
    </el-table-column>
    
    <el-table-column
        prop="borrowBack"
        label="借还权限" >
    </el-table-column>

    <el-table-column
        prop="sysQuery"
        label="系统查询权限" >
    </el-table-column>
    <el-table-column
        prop="sysSet"
        label="超级管理员权限" >
    </el-table-column>
    <el-table-column
        prop="readerSet"
        label="读者设置权限" >
    </el-table-column>
    <el-table-column
        prop="bookSet"
        label="图书设置权限" >
    </el-table-column>
    </el-table>
    </div>
    
<div style="display: flex; justify-content: flex-end;">
    <el-dialog
    title="添加权限组"
    :visible.sync="newAdminVisible"
    width="30%">

    <template>
    <el-checkbox-group v-model="checkList">
        <el-checkbox label="借还权限"></el-checkbox>
        <el-checkbox label="系统查询权限"></el-checkbox>
        <el-checkbox label="超级管理员权限"></el-checkbox>
        <el-checkbox label="读者设置权限" ></el-checkbox>
        <el-checkbox label="图书设置权限" ></el-checkbox>
    </el-checkbox-group>
    </template>

    <template>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px"
        style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
        <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif; margin: 5%">读者注册</header>
        <el-form-item label="读者姓名" prop="name">
        <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="读者邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
        </el-form-item>
        </el-form>
    </template>

    <div style="text-align: center">
    <el-button type="primary" @click="addAdmin" class="inDialogBtn">提 交</el-button>
    <el-button  type = "danger" @click="newAdminVisible = false" class="inDialogBtn">关 闭</el-button>
    </div>   

    </el-dialog>

<el-dialog
title="修改权限组(留空项不更改)"
:visible.sync="updateAdminVisible"
width="30%">

    <div style="text-align: center">
    <el-button type="primary" @click="updateAdmin" class="inDialogBtn">提 交</el-button>
    <el-button  type = "danger" @click="updateAdminVisible = false" class="inDialogBtn">关 闭</el-button>
    </div>   
</el-dialog>


</div>


</div>

</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        var adminQuerySuc = false
        var purViewQuerySuc = false
        var showedMess = false
        axios({
            method:'get',
            url: 'api/admin/query',//this step is going to query all the items
                headers:{
                'token':sessionStorage.getItem("token")
                }
            }).then(
            (resp)=>{
                if(resp.data.code != 200){
                alert(resp.data.msg)
                } else {
                    console.log("管理员列表查询成功！")
                    // this.menuItems = resp.data.data
                    for(var j = 0; j < resp.data.data.length; j++) {
                        resp.data.data[j].groupName = '待查询'
                    }
                    this.adminItems = resp.data.data
                    console.log(this.adminItems)
                    adminQuerySuc = true
                    if(adminQuerySuc && purViewQuerySuc && !showedMess){
                        console.log("超级管理员页面挂载成功")
                        showedMess = true
                        this.addNameForAdmin()
                    }
                }
            }).catch(()=>{
            alert("服务器内部错误，请联系网络管理员！")
        }),

        axios({
            method:'get',
            url: 'api/authority/queryall',
                headers:{
                'token':sessionStorage.getItem("token")
                }
            }).then(
            (resp)=>{
                if(resp.data.code != 200){
                alert(resp.data.msg)
                } else {
                    console.log("权限表查询成功！")
                    console.log(resp.data)
                    this.menuItems = resp.data.data
                    purViewQuerySuc = true
                    if(adminQuerySuc && purViewQuerySuc && !showedMess){
                        console.log("超级管理员页面挂载成功")
                        showedMess = true
                        this.addNameForAdmin()
                    }
                }
            }
                ).catch(()=>{
            alert("服务器内部错误，请联系网络管理员！")
        })
    },
    data() {
        return{
            updateAdminVisible: false,
            checked:false,
            rules:{
            name:[{
                required:true, message:"请输入姓名", trigger: 'blur',
            }],
            password:[{
                    required:true, message:"请输入密码", trigger: 'blur',
                },],
            },


            adminItems: [],
            currentChar:'未选中权限组',
            menuItems:[],
            newAdminVisible: false,

            checkList: ['选中且禁用','复选框 A']
        }
    },
    methods:{
        updateAdmin() {
            console.log({
                id: this.adminToUpdate.id,
                    name: (this.updateForm.updateName=='') ? this.adminToUpdate.name : this.updateForm.updateName,
                    password: (this.updateForm.updatePassword=='') ? this.adminToUpdate.password : this.updateForm.updatePassword,
                    group: (this.checked) ? (this.menuItems.find(item => item.name === this.currentChar).id) : null,
            })
            axios({
                method:'post',
                url: 'api/admin/update',
                data:{
                    id: this.adminToUpdate.id,
                    name: (this.updateForm.updateName=='') ? this.adminToUpdate.name : this.updateForm.updateName,
                    password: (this.updateForm.updatePassword=='') ? this.adminToUpdate.password : this.updateForm.updatePassword,
                    group: (this.checked) ? (this.menuItems.find(item => item.name === this.currentChar).id) : null,
                },
                headers:{
                'token':sessionStorage.getItem("token")
                }
            })
            this.updateForm = {
                updateName:null,
                updatePassword:null,
            }
            location.reload()
        },
        addNameForAdmin() {
            for(var i = 0; i < this.adminItems.length; i++) {
                var groupId = this.adminItems[i].group
                var groupName = this.menuItems.find((item)=> item.id === groupId).name
                this.adminItems[i].groupName = groupName
            }
        },
        prepareUpdate(row){
            this.adminToUpdate = row
            this.updateAdminVisible = true
            console.log("当前要修改的行")
            console.log(this.adminToUpdate)
        },
        handleCommand(value){
            console.log("test")
            console.log(value)
            this.currentChar = value
        },
        addAdmin(){
            this.$refs["form"].validate((valid) => {
            if (valid) {
                alert('成功添加！');
                
                    if(this.currentChar === '未选中权限组'){
                alert("未选择权限组！")
                return;
            }
            console.log({
                        name:this.form.name,
                        password:this.form.password,
                        userGroup:this.menuItems.find(item => item.name === this.currentChar).id
                    },)
            axios({
                    method:'post',
                    url: 'api/admin/add',
                    data:{
                        name:this.form.name,
                        password:this.form.password,
                        group:this.menuItems.find(item => item.name === this.currentChar).id
                    },
                    headers:{
                    'token':sessionStorage.getItem("token")
                    }
                }).then(
                (resp)=>{
                    if(resp.data.code != 200){
                    alert(resp.data.msg)
                    } else {
                    alert("成功增添管理员")
                    }
                }
                ).catch(()=>{
                alert("网络错误，请联系网络管理员！")
            })
            this.form = {
                name:null,
                password:null,
                }
                location.reload()
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
 
    }
}
</script>

<style>
.inDialogBtn{
    margin: 2%;
}
</style>
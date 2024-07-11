<template>
    <div style="width: 85vw">
        <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif; margin: 5%">权限组策略</header>
    <div style="text-align: center;">
        <header style="font-size: medium; text-align: center; font-family: Arial, Helvetica, sans-serif;">单击任意项以删改</header>
        <el-button @click="addGroupVisible = true" style="margin: 1%; font-size: large;" type="primary">添加权限组</el-button>

    </div>
    <div style="display: flex">
    <el-table
    :data="menuItems"
    @row-click="prepareUpdate"
    stripe
    style="width: 100%; width: auto;">
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
        <template v-slot:default="{ row }">{{ row.borrowBack === true ? '有权限' : '无权限' }}</template>
    </el-table-column>

    <el-table-column
        prop="sysQuery"
        label="系统查询权限" >
        <template v-slot:default="{ row }">{{ row.sysQuery === true ? '有权限' : '无权限' }}</template>
    </el-table-column>
    <el-table-column
        prop="sysSet"
        label="超级管理员权限" >
        <template v-slot:default="{ row }">{{ row.sysSet === true ? '有权限' : '无权限' }}</template>
    </el-table-column>
    <el-table-column
        prop="readerSet"
        label="读者设置权限" >
        <template v-slot:default="{ row }">{{ row.readerSet === true ? '有权限' : '无权限' }}</template>
    </el-table-column>
    <el-table-column
        prop="bookSet"
        label="图书设置权限" >
        <template v-slot:default="{ row }">{{ row.bookSet === true ? '有权限' : '无权限' }}</template>
    </el-table-column>
    </el-table>
    </div>
    
<div style="display: flex; justify-content: flex-end;">
    <el-dialog
    title="添加权限组"
    :visible.sync="addGroupVisible"
    width="30%">


<template>
    <div style="display: flex;">
        <el-checkbox-group v-model="checkList" style="display: flex;">
        <el-checkbox label="借还权限"></el-checkbox>
        <el-checkbox label="系统查询权限"></el-checkbox>
        <el-checkbox label="超级管理员权限"></el-checkbox>
        <el-checkbox label="读者设置权限"></el-checkbox>
        <el-checkbox label="图书设置权限"></el-checkbox>
        </el-checkbox-group>
    </div>
</template>

    <template>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px"
        style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
        <el-form-item label="权限组名" prop="name">
        <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-form>
    </template>

    <div style="text-align: center">

    <el-button type="primary" @click="addGroup" class="inDialogBtn">提 交</el-button>
    <el-button  type = "danger" @click="addGroupVisible = false" class="inDialogBtn">关 闭</el-button>
    </div>   

    </el-dialog>

<el-dialog
title="修改权限组(留空项不更改)"
:visible.sync="updateGroupVisible"
style="width: auto; text-align: center; justify-items: center;">

    <div style="text-align: center; margin-left: 15%; margin-right: 15%">
    <el-checkbox-group v-model="checkList" style="display: flex; text-align: center">
        <el-checkbox label="借还权限"></el-checkbox>
        <el-checkbox label="系统查询权限"></el-checkbox>
        <el-checkbox label="超级管理员权限"></el-checkbox>
        <el-checkbox label="读者设置权限" ></el-checkbox>
        <el-checkbox label="图书设置权限" ></el-checkbox>
    </el-checkbox-group>
    </div>

    <template style="text-align: center;">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px"
        style="display: flexbox; ">
        <el-form-item label="权限组名" prop="name" style="margin: 5%;">
        <el-input v-model="form.name" style="width: auto"></el-input>
        </el-form-item>
        </el-form>
    </template>




    <div style="text-align: center">

    <el-button type="primary" @click="updateGroup" class="inDialogBtn">提 交</el-button>
    <el-button  type = "danger" @click="updateGroupVisible = false" class="inDialogBtn">关 闭</el-button>
    <el-button  type = "warning" @click="deleteGroup" class="inDialogBtn">删 除</el-button>
    </div>   

</el-dialog>


</div>


</div>

</template>

<script>
import axios from 'axios';
export default {
    mounted(){
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
                    console.log("管理员权限组挂载成功")
                }
            }
                ).catch(()=>{
            alert("服务器内部错误，请联系网络管理员！")
            })
    },
    data() {
        return{
            updateGroupVisible:false,
            checkedItems:{
                borrowBack: false,
                sysQuery: false,
                sysSet: false,
                readerSet: false,
                bookSet :false,
                name: null,
                id: null,
            },

            rules:{
            name:[{
                required:true, message:"必须输入权限组名", trigger: 'blur',
            }]
            },
            form:{
                //填写权限组名字
                name:null,
            },
            adminItems: [],
            currentChar:'未选中权限组',
            menuItems:[],
            addGroupVisible: false,

            checkList: []
        }
    },
    methods:{
        getCheckedItems() {
            console.log(this.checkList)
            this.checkedItems = {
                borrowBack: false,
                sysQuery: false,
                sysSet: false,
                readerSet: false,
                bookSet :false,
            }
            for(var i = 0; i < this.checkList.length; i++) {
                if (this.checkList[i] === '借还权限')
                    this.checkedItems.borrowBack = true
                if (this.checkList[i] === '超级管理员权限')
                    this.checkedItems.sysSet = true
                if (this.checkList[i] === '系统查询权限')
                    this.checkedItems.sysQuery = true
                if (this.checkList[i] === '图书设置权限')
                    this.checkedItems.bookSet = true
                if (this.checkList[i] === '读者设置权限')
                    this.checkedItems.readerSet = true
            }
            
            console.log(this.checkedItems)
            console.log(this.form)
        },

        addGroup() {
            this.getCheckedItems()
            axios({
                url:"api/authority/add",
                method:'post',
                data:{
                    name: this.form.name,
                    id: null,
                    borrowBack: this.checkedItems.borrowBack,
                    sysQuery: this.checkedItems.sysQuery,
                    sysSet: this.checkedItems.sysSet,
                    readerSet: this.checkedItems.readerSet,
                    bookSet: this.checkedItems.bookSet
                },
                headers:{
                    'token':sessionStorage.getItem("token")
                },
            })
            this.form.name = null
            location.reload()
        },
        //更新组
        deleteGroup(){
            this.getCheckedItems()
            if(this.groupToUpdate.id == 1) {
                alert("无法删除初始超级管理员组")
                return
            }
            axios({
                url:"api/authority/delete/" + this.groupToUpdate.id,
                method:"get",
                data:{},
                headers:{
                'token':sessionStorage.getItem("token")
                }
            }).then((resp) => {
                if(resp.data.code==200){
                    alert("成功地删除了组")
                } else {
                    alert(resp.data.msg)
                }
            }).catch(() =>{
                alert("服务器出错, 请联系网络管理员")
            })
            location.reload()

        },
        updateGroup(){
            this.getCheckedItems()
            this.groupToUpdate.id
            if(this.groupToUpdate.id == 1){
                alert("无法对初始超级管理员进行更改")
                return
            }
            axios({
                url:"api/authority/update",
                method:"post",
                data:{
                    name: this.form.name,
                    id: this.groupToUpdate.id,
                    borrowBack: this.checkedItems.borrowBack,
                    sysQuery: this.checkedItems.sysQuery,
                    sysSet: this.checkedItems.sysSet,
                    readerSet: this.checkedItems.readerSet,
                    bookSet: this.checkedItems.bookSet,
                },
                headers:{
                'token':sessionStorage.getItem("token")
                }
            }).then((resp) => {
                if(resp.data.cod==200){
                    alert("成功地更新了组")
                } else {
                    alert(resp.data.msg)
                }
            }).catch(() =>{
                alert("服务器出错, 请联系网络管理员")
            })
            location.reload()
            this.form.name = null
        },
        
        prepareUpdate(row){
            this.updateGroupVisible = true
            this.groupToUpdate = row
            console.log("当前要修改的行")
            console.log(this.groupToUpdate)
        },
    }
}
</script>

<style>
.inDialogBtn{
    margin: 2%;
}
</style>
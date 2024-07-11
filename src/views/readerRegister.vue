<template>
<div style=" align-items: center;  width:85vw;">
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
        <div style="margin-left: 23%; display: flex; align-items: center;">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    选择角色<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item v-for="item in menuItems": key = "item">{{item.name}}</el-dropdown-item> -->
                    <el-dropdown-item v-for="(item, index) in menuItems" :key="index" :command = item.name >{{ item.name }}</el-dropdown-item>
                    
                </el-dropdown-menu>
            </el-dropdown>
            <div style="font-size: medium">当前角色：{{ currentChar }}</div>
        </div>


        <el-button type="primary" @click="addReader" style="width: 35vw; margin-left: 33%; margin-top: 5%">注册读者</el-button>

</div>

</template>
    
    
<script>
import axios from 'axios';
export default {
    data() {
        return {
            currentChar:'未选择角色',
            menuItems: [
                {id: 1, name:"嘉然"},
                {id: 2,name:"皮套狗"},
                {id: 3,name:"乐子人"},
                {id: 4,name:"纯牛马"},
            ],
            rules:{
            name:[{//此处需要输入一个条形码
                required:true, message:"请输入姓名", trigger: 'blur'
            }],
            email:[{//此处需要输入一个条形码
                    required:true, message:"输入读者邮箱", trigger: 'blur',
                },
                {
                    type: 'email',
                    message: '请输入合法的电子邮件地址',
                    trigger: ['blur', 'change']
                }],
            },

            form: {
                name : null,
                email: null,
            },
        }
    },
    mounted() {
                axios({
                    method:'post',
                    url: 'api/chara/list',
                        headers:{
                        'token':sessionStorage.getItem("token")
                        }
                    }).then(
                    (resp)=>{
                        if(resp.data.code != 200){
                        alert(resp.data.msg)
                        } else {
                            console.log("读者增添页面挂载成功,身份列表查询成功！")
                            console.log(resp.data)
                            this.menuItems = resp.data.data
                        }
                    }
                        ).catch(()=>{
                    alert("服务器内部错误，请联系网络管理员！")
                    })
            },
    methods: {
        handleClick() {
            console.log("button clicked")
        },
        handleCommand(value){
            console.log("test")
            console.log(value)
            this.currentChar = value
        },
        addReader() {
            this.$refs["form"].validate((valid) => {
                if(!valid){
                    console.log("未提交表单")
                    return;
                }
                if(this.currentChar === '未选择角色'){
                alert("未分配角色！")
                return;
            }
            axios({
                    method:'post',
                    url: 'api/reader/insert',
                    data:{
                        typeId:this.menuItems.find(item => item.name === this.currentChar).id,
                        name:this.form.name,
                        email:this.form.email
                    },
                    headers:{
                    'token':sessionStorage.getItem("token")
                    }
                }).then(
                (resp)=>{
                    if(resp.data.code != 200){
                    alert(resp.data.msg)
                    } else {
                    alert("成功增添读者")
                    }
                }
                ).catch(()=>{
                alert("网络错误，请联系网络管理员！")
                })
            })
        }
    }
}
    </script>
    
    <style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    </style>
<template>
    <div style=" align-items: center; width:85vw;">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px"
            style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
            <br/>
            <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">读者信息修改</header>
            <br/>
            <br/>
            <el-form-item label="读者ID" prop="id">
            <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="读者邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="读者姓名" prop="name">
            <el-input v-model="form.name"></el-input>
            </el-form-item>
            </el-form>
            <div style="margin-left: 30%; display: flex; align-items: center;">
            <div style="align-items: center; margin-left: 10%">
                <el-checkbox v-model="checked" >修改角色身份， </el-checkbox>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        新的身份 : {{ currentChar }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item v-for="item in menuItems": key = "item">{{item.name}}</el-dropdown-item> -->
                        <el-dropdown-item v-for="(item, index) in menuItems" :key="index" :command = item.name >{{ item.name }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            </div>
    
    
            <el-button type="primary" @click="addReader" style="width: 35vw; margin-left: 33%; margin-top: 5%">提交修改</el-button>
    
    </div>
    
    </template>
        
        
    <script>
    import axios from 'axios';
    export default {
        data() {
            return {
                checked: false,
                currentChar:"未选择角色",
                menuItems: [],
                rules:{
                id:[{
                    required:true, message:"请输入ID", trigger: 'blur'
                }],
                email:[
                    {
                        type: 'email',
                        message: '请输入合法的电子邮件地址',
                        trigger: ['blur', 'change']
                    }],
                },
    
                form: {
                    name : null,
                    email: null,
                    id : null,
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
            handleCommand(value){
                console.log("test")
                console.log(value)
                this.currentChar = value
            },
            addReader() {
                this.$refs["form"].validate((valid) => {
                    if(!valid){
                        return
                    }
                    if(this.currentChar === '未选择角色' && this.checked){
                    alert("未选择角色！")
                    return;
                }
                if(this.checked){
                    axios({
                        method:'post',
                        url: 'api/reader/update',
                        data:{
                            typeId:this.menuItems.find(item => item.name === this.currentChar).id,
                            name:this.form.name,
                            email:this.form.email,
                            readerId: this.form.id,
                            borrowingCount: null,
                            expireDate:null,
                        },
                        headers:{
                        'token':sessionStorage.getItem("token")
                        }
                    }).then(
                    (resp)=>{
                        this.form = {
                        name : null,
                        email: null,
                        id : null,
                        typeId: null,
                    }
                        if(resp.data.code != 200){
                        alert(resp.data.msg)
                        } else {
                        alert("成功修改读者")   
                        }
                    }
                    ).catch((resp)=>{
                        console.log(resp.data)
                        alert("网络错误，请联系网络管理员！")
                    })
                }
                else{
                    axios({
                        method:'post',
                        url: 'api/reader/update',
                        data:{
                            typeId:null,
                            name:this.form.name,
                            email:this.form.email,
                            readerId: this.form.id,
                            borrowingCount: null,
                            expireDate:null,
                        },
                        headers:{
                        'token':sessionStorage.getItem("token")
                        }
                    }).then(
                    (resp)=>{
                        this.form = {
                        name : null,
                        email: null,
                        id : null,
                        typeId: null,
                    }
                        if(resp.data.code != 200){
                        alert(resp.data.msg)
                        } else {
                        alert("成功修改读者")
                        }
                    }
                    ).catch((resp)=>{
                        console.log(resp.data)
                        alert("网络错误，请联系网络管理员！")
                    })
                }
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
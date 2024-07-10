<template>
<div style=" align-items: center; background-color: aquamarine; width:85vw;">
<header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">读者组管理</header>
<el-button @click="newGroupVisible = true">新建组</el-button>

<el-dialog
    title="新建组"
    :visible.sync="newGroupVisible"
    width="30%"
    :before-close="handleClose">
    <div style="display: flex; justify-content: center; align-items: right; height: 100%;">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px"
    style="display: flexbox; align-items: center;">
    <el-form-item label="组名" prop="name">
    <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="最大借出数" prop="maxBorrow">
    <el-input v-model="form.maxBorrow"></el-input>
    </el-form-item>
    <el-form-item label="最长借书天数"  prop="duration">
    <el-input v-model="form.duration"></el-input>
    </el-form-item>
    </el-form>
    <el-button type="primary" @click="addGroup" class="inDialogBtn">提 交</el-button>
    <el-button  type = "danger" @click="newGroupVisible = false" class="inDialogBtn">关 闭</el-button>
</div>

</el-dialog>




</div>
</template>


<script>
import axios from 'axios';
export default {
data() {
    return {
        rules:{
                name:[{//此处需要输入一个条形码
                    required:true, message:"请输入条形码", trigger: 'blur'
                }],
                duration:[{//此处需要输入一个条形码
                    required:true, message:"请输入条形码", trigger: 'blur'
                }],
                maxBorrow:[{//此处需要输入一个条形码
                    required:true, message:"请输入条形码", trigger: 'blur'
                }],
            },
        form: {
                name:null,
                maxBorrow:null,
                duration:null,
        },
        newGroupVisible:false,
    }
},
methods: {
    addGroup() {
        axios({
                method:'post',
                url: 'api/chara/add',
                data:{
                    name: this.form.name,
                    duration: this.form.duration,
                    maxBorrow: this.form.maxBorrow,
                },
                headers:{
                'token':sessionStorage.getItem("token")
                }
            }).then(
            (resp)=>{
                if(resp.data.code != 200){
                alert(resp.data.msg)
                } else {
                alert("成功增添读者组")
                }
            }
            ).catch(()=>{
            alert("输入信息非法或服务器内部错误")
            })
            this.form = {
                name:null,
                maxBorrow:null,
                duration:null,
            }
            return;
    }
}
}
</script>

<style>
.inDialogBtn{
    margin: 2%;
}
</style>
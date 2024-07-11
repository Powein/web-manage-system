<template>
    <div><header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif; margin: 1%">读者组管理</header>
        
        <header style="font-size: medium; text-align: center; font-family: Arial, Helvetica, sans-serif;">单击以删改</header>
<div style=" align-items: center; width:85vw; display: flex; justify-content: center; align-items: right; ">



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

<el-dialog
    title="删改组"
    :visible.sync="updateGroupVisible"
    width="30%"
    :before-close="handleClose">
    <div style=" justify-content: right; align-items: right; height: 100%;">
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
    <div style="margin-left: 5vw;">
    <el-button type="primary" @click="updateGroup" class="inDialogBtn2">提 交</el-button>
    <el-button  type = "danger" @click="updateGroupVisible = false" class="inDialogBtn2">关 闭</el-button>
    <el-button  type = "warning" @click="deleteGroup" class="inDialogBtn2">删除组</el-button>
    </div>
</div>

</el-dialog>


<el-table
    :data="readerGroups"
    @row-click="prepareUpdate"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="组名">
    </el-table-column>
    <el-table-column
      prop="duration"
      label="最大借书时长" >
    </el-table-column>
    <el-table-column
      prop="maxBorrow"
      label="最大借书量">
    </el-table-column>
    <el-table-column
      prop="id"
      label="编号">
    </el-table-column>
  </el-table>


  <el-button @click="newGroupVisible = true" style="margin: 1%; font-size: large">新建组</el-button>
</div>
</div>
</template>


<script>
import axios from 'axios';
export default {
data() {
    return {
        currentUpdateGroup:null,
        updateGroupVisible:false,
        readerGroups: [],
        rules:{
                name:[{//此处需要输入一个条形码
                    required:true, message:"请输入姓名", trigger: 'blur'
                }],
                duration:[{//此处需要输入一个条形码
                    required:true, message:"请输入天数(整数)", trigger: 'blur'
                }],
                maxBorrow:[{//此处需要输入一个条形码
                    required:true, message:"请输入最大借书量(整数)", trigger: 'blur'
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
                    console.log("读者组管理页面挂载成功,身份列表查询成功！")
                    console.log(resp.data)
                    this.readerGroups = resp.data.data
                }
            }
                ).catch(()=>{
            alert("服务器内部错误，请联系网络管理员！")
            })
    },
methods: {
    prepareUpdate(row){
        console.log(row)
        this.currentUpdateGroup = row.id
        this.updateGroupVisible = true
    },
    updateGroup() {
        console.log(                    
                {
                    id: this.currentUpdateGroup,
                    name: this.form.name,
                    duration: this.form.duration,
                    maxBorrow: this.form.maxBorrow,
                })

        axios({
                method:'post',
                url: 'api/chara/update',
                data:{
                    id: this.currentUpdateGroup,
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
                alert("成功修改读者组")
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
            this.currentUpdateGroup = null
            location.reload()
            return;
    },
    deleteGroup(){

        axios({
                method:'post',
                url: 'api/chara/delete/' + this.currentUpdateGroup,
                data:{
                    id: this.currentUpdateGroup,
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
                alert("成功修改读者组")
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
            location.reload()
            this.currentUpdateGroup = null
            return;
    },

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
            location.reload()
            return;
    },
}
}
</script>

<style>
.inDialogBtn{
    margin: 2%;
}
.inDialogBtn{
    margin: 11%;
}
</style>
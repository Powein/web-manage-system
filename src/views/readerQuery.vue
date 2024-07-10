<template>
    <div>
        <div style=" align-items: center; background-color: aquamarine; width:85vw;">
            <el-form ref="form" :model="form" label-width="120px"
                style="display: flexbox; align-items: center; margin-left: 20%; margin-right: 20%;">
                <br/>
                <header style="font-size: 40px; text-align: center; font-family: Arial, Helvetica, sans-serif;">读者查询</header>
                <br/>
                <br/>
                <el-form-item label="读者ID" prop="id">
                <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="读者姓名" prop="name">
                <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="读者邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
                <el-button type="primary" @click="queryReader" style="width: 35vw; margin-left: 33%;">查询读者</el-button>

        </div>
        <br>
        <div>
            <dl>
            <header style="font-size: 30px;text-align: center">查询结果</header>
            <br><br>
                <dt>读者姓名</dt>
                <dd>{{ this.queryed.name }}</dd>
                
                <dt>读者ID</dt>
                <dd>{{ this.queryed.id }}</dd>
                
                <dt>读者邮箱</dt>
                <dd>{{ this.queryed.email }}</dd>

                <dt>借阅数量</dt>
                <dd>{{ this.queryed.borrowingCount }}</dd>

                <dt>读者类型</dt>
                <dd>{{ this.queryed.typeName }}</dd>
            </dl>
        </div>
    </div>
</template>


    <script>
    import axios from 'axios';
    export default {
        data() {
            return {
                queryed:{
                    id:"未查询",
                    name:"未查询",
                    email:"未查询",
                    typeId:null,
                    borrowingCount:"未查询",
                    typeName:"未查询"
                },
                menuItems: [],
                form: {
                    name : null,
                    email : null,
                    id : null,
                },
            }
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
            queryReader() {
                this.queryed = {
                    id:"未查询",
                    name:"未查询",
                    email:"未查询",
                    typeId:null,
                    borrowingCount:"未查询",
                    typeName:"未查询"
                }
                axios({
                        method:'post',
                        url: 'api/reader/query',
                        data:{
                            readerId:this.form.id,
                            name:this.form.name,
                            email:this.form.email
                        },
                        headers:{
                        'token':sessionStorage.getItem("token")
                        }
                    }).then(
                    (resp)=>{
                        if(resp.data.code != 200){
                            alert("查询信息不合法")
                            console.log(resp.data)
                        } else {
                            console.log("成功查询读者")
                            console.log(resp.data.data)
                            if(!resp.data.data){
                                alert("用户不存在")
                                return
                            }
                            this.queryed.id = resp.data.data.readerId
                            this.queryed.borrowingCount = resp.data.data.borrowingCount
                            this.queryed.name = resp.data.data.name
                            this.queryed.email = resp.data.data.email
                            this.queryed.typeId = resp.data.data.typeId
                            
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
                                    console.log("成功查询用户角色表")
                                    console.log("当前查询得到的信息")
                                    console.log(this.queryed)
                                    console.log(resp.data.data)
                                    this.menuItems = resp.data.data
                                    console.log(this.menuItems)
                                    this.queryed.typeName = this.menuItems.find(item => item.id === this.queryed.typeId).name
                                }
                            })
                        }
                    }
                    ).catch(()=>{
                    alert("网络错误，请联系网络管理员！")
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

dl {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

dt {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

dd {
    margin-left: 0;
    margin-bottom: 10px;
    color: #666;
}
    </style>
<template>
    <div class="user-add">
        <el-form :inline="true" label-width="120" ref="user" :show-message="true" :inline-message="false" size="medium" :model="user">
            <el-form-item label="账户" :rules="validate.username" prop="username" class="block">
                <el-input type="text" placeholder="请输入账户名" v-model="user.username" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="密码" :rules="validate.password" prop="password" class="block">
                <el-input type="password" placeholder="请输入密码" v-model="user.password" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :rules="validate.email" prop="email" class="block">
                <el-input type="email" placeholder="请输入邮箱" v-model="user.email" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="" class="block" style="width: 550px;text-align: center;">
                <el-button type="primary" @click="confirm('user')">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {getAdminUserInfo,addAdminUser,editAdminUser} from '@/api/admin'
    export default{
        data(){
            return {
                user:{
                    id:null,
                    username:"",
                    password:"",
                    email:""
                },
                validate:{
                    username:[
                        {
                            required:true,
                            message:"请输入登陆账户名",
                            trigger:"blur"
                        }
                    ],
                    password:[
                        {
                            required:true,
                            message:"请输入登陆密码,且长度不应少于6位",
                            trigger:"blur"
                        },
                        {
                            min:6,
                            max:12,
                            message:"长度应控制在6位到12位",
                            trigger:"blur,change"
                        }
                    ],
                    email:[
                        {
                            required:true,
                            message:"邮箱必填",
                            trigger:"blur"
                        },{
                            type:"email",
                            message:"请输入正确的邮箱地址",
                            trigger:"blur,change"
                        }
                    ]
                },
                add:true,
                confirm_text:'新增',
            }
        },
        created(){
            if(this.$route.params.admin_user_id){
                this.user.id=this.$route.params.admin_user_id
                this.add=false
                this.confirm_text='编辑'
            }
        },
        mounted(){
            if(!this.add){
                getAdminUserInfo(this.user.id).then(data=>{
                    this.user=data
                })
            }
        },
        methods:{
            confirm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.add){
                            addAdminUser(this.user).then(data=>{
                                this.$message({message:"创建成功,即将跳转",type:"success"})
                                this.$router.push({path:"/admin/user"})
                            })
                        }else{
                            editAdminUser(this.user.id,this.user).then(data=>{
                                this.$message({message:"更改成功,即将跳转",type:"success"})
                                this.$router.push({path:"/admin/user"})
                            })
                        }
                    } else {
                        this.$message({message:"提交失败",type:"error"})
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-add{
        height: 500px;
        display: -webkit-box;
        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;
        /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;
        /* 混合版本语法: IE 10 */
        display: -webkit-flex;
        /* 新版本语法: Chrome 21+ */
        display: flex;
        /* 新版本语法: Opera 12.1, Firefox 22+ */
        -webkit-align-items: center;
        -moz-align-items: center;
        align-items: center;
        -webkit-justify-content:center;
        -moz-justify-content:center;
        justify-content:center;

    }
    .block{
        display: block;
        input{
            width:350px !important;
        }
    }
    input{
            width:350px !important;
        }
</style>
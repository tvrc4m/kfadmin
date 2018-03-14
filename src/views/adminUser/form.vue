<template>
    <div class="user-add">
        <el-form :inline="true" label-width="120" :show-message="true" :inline-message="false" size="medium" :model="user">
            <el-form-item label="账户" :rules="validate.name" prop="name" class="block">
                <el-input type="text" placeholder="请输入账户名" v-model="user.name" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="密码" :rules="validate.password" prop="password" class="block">
                <el-input type="password" placeholder="请输入密码" v-model="user.password" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :rules="validate.email" prop="email" class="block">
                <el-input type="email" placeholder="请输入邮箱" v-model="user.email" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="" class="block" style="width: 400px;text-align: center;">
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                user:{
                    name:"",
                    password:"",
                    email:""
                },
                validate:{
                    name:[
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
                }
            }
        },
        mounted(){
            this.user={
                name:"tvrc4m",
                password:"812988018",
                email:"tvrc4m@qq.com"
            }
        }
    }
</script>
<style lang="scss" scoped>
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
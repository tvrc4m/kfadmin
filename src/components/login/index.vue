<template>
    <el-form ref="user" label-position="right" label-width="60px" style="margin-top: 100px">
        <el-row type="flex" justify="center">
            <h1>分手吧后台登陆系统</h1>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span=6>
                <el-form-item label="用户名">
                    <el-input placeholder="用户名" v-model="user.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span=6>
                <el-form-item label="密码">
                    <el-input placeholder="请输入密码" type="password" v-model="user.password"></el-input>
                </el-form-item>
            </el-col>
        </el-row>        
        <el-row type="flex" justify="center">
            <el-col :span=1>
                <el-button type="primary">登陆</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default{
        data(){
            return {
                user:{
                    name:"",
                    password:""
                }
            }
        }
    }
</script>
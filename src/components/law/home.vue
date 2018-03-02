<template>
    <el-container>
        <el-row type="flex">
            <el-col :span=4>
                <span>数据库-法规库</span>
            </el-col>
            <el-col :span="8">
                <el-input clearable placeholder="搜索"></el-input>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-select name="law_type" v-model="law_type" placeholder="选择法规类型">
                <el-option v-for="law in laws" :key="law.alias" :value="law.alias" :label="law.name"></el-option>
            </el-select>
            <el-button type="primary">添加</el-button>
        </el-row>
        <el-row type="flex">
            <router-link to="/law/add">录入新条目</router-link>
        </el-row>
    </el-container>
</template>
<script>
    export default{
        data(){
            return {
                laws:[
                {
                    alias:"law",
                    name:"中国婚姻法"
                },
                {
                    alias:"xingfa",
                    name:"中国刑法"
                }],
                law_type:"law"
            }
        }
    }
</script>
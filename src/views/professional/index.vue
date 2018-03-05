<template>
    <div class="emotion">
        <el-row :span="24" class="emotion-header">
            <el-col :span="6">
                <router-link to="/professional/add">
                    <el-button type="primary">添加新专家</el-button>
                </router-link>
            </el-col>
            <el-col :span="18">
                <div class="right">
                    共<span v-text="total"></span>条数据
                </div>
            </el-col>
        </el-row>
        <el-table :data="professionals" stripe style="width=100%">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="昵称"></el-table-column>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="job" label="职业"></el-table-column>
            <el-table-column prop="remark" label="擅长"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text">删除</el-button>
                    <el-button type="text">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                professionals:[
                    {
                        id:1,
                        name:"tvrc4m",
                        realname:"魏山",
                        job:"PHP技术经理",
                        remark:"php,scala,spark,manager"
                    },
                    {
                        id:2,
                        name:"shengqi",
                        realname:"郑生齐",
                        job:"PHP开发",
                        remark:"php,go"
                    }
                ],
                total:10
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .emotion{
        margin:10px 15px;
    }
    .emotion-header{
        .right{
            text-align:right;
        }
    }
</style>
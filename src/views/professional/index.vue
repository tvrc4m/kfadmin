<template>
    <div class="emotion">
        <el-row :span="24" class="emotion-header">
            <el-col :span="6">
                <router-link to="/professional/add">
                    <el-button type="primary" size="small">添加新专家</el-button>
                </router-link>
            </el-col>
            <el-col :span="18">
                <div class="right">
                    共<span v-text="total"></span>条数据
                </div>
            </el-col>
        </el-row>
        <confirm :confirmSuccess="delPro"></confirm>
        <el-table :data="professionals" stripe style="width=100%">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="昵称"></el-table-column>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="job" label="职业"></el-table-column>
            <el-table-column prop="remark" label="擅长"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="editPro(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    import {mapState} from 'vuex'
    export default{
        components:{confirm},
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
                total:10,
                deleted:false,
                current_id:0
            }
        },
        methods:{
            editPro:function(id){
                this.$router.push({path:"/professional/add",query:{id:id}});
            },
            delPro:function(){
                this.professionals=this.professionals.filter(item=>item.id!=this.current_id);
                this.$store.commit('CONFIRM_DIALOG',false)
            },
            delConfirm:function(id){
                this.current_id=id;
                this.$store.commit('CONFIRM_DIALOG',true)
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
<template>
    <div class="law-container">
        <el-row>
            <router-link to="/law/add">
                <el-button type="primary" size="small">添加法律</el-button>
            </router-link>
        </el-row>
        <confirm ref="confirm" :confirmSuccess="delLaw"></confirm>
        <el-row>
            <el-table :data="laws">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="name" label="法律全称"></el-table-column>
                <el-table-column prop="fullname" label="法律全称"></el-table-column>
                <el-table-column prop="name" label="法律简称"></el-table-column>
                <el-table-column prop="pinyin" label="拼音"></el-table-column>
                <el-table-column label="操作" width="150" header-align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editLaw(scope.row.id)">编辑</el-button>
                        <el-button type="text" size="small" @click="delConfirm(scope.row.id)">删除</el-button>
                        <el-button type="text" size="small" @click="addLawRule(scope.row.id)">新增法规</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    export default{
        components:{confirm},
        data(){
            return {
                laws:[
                    {
                        id:1,
                        name:"婚姻法",
                        fullname:"中国婚姻法",
                        pinyin:"hunyin"
                    }
                ],
                confirm_id:0
            }
        },
        methods:{
            editLaw:function(id){
                this.$router.push({path:"/law/edit",query:{id:id}})
            },
            delLaw:function(){
                this.laws=this.laws.filter(item=>item.id!=this.confirm_id)
                this.$refs.confirm.closeConfirm()
            },
            delConfirm(id){
                this.confirm_id=id
                this.$refs.confirm.showConfirm()
            },
            addLawRule:function(law_id){
                console.log(law_id)
                this.$router.push({path:'/law/rule/add',query:{law_id:law_id}})
            }
        }
    }
</script>
<template>
    <div class="law-container">
        <el-row>
            <router-link to="/law/add">
                <el-button type="primary" size="small">添加法律</el-button>
            </router-link>
        </el-row>
        <el-row>
            <el-table :data="laws">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="name" label="法律全称"></el-table-column>
                <el-table-column prop="fullname" label="法律全称"></el-table-column>
                <el-table-column prop="name" label="法律简称"></el-table-column>
                <el-table-column prop="pinyin" label="拼音"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editLaw(scope.row.id)"></el-button>
                        <el-button type="text" icon="el-icon-plus" @click="addLawRule(scope.row.id)"></el-button>
                        <el-button type="text" icon="el-icon-delete" @click="delLaw(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                laws:[
                    {
                        id:1,
                        name:"婚姻法",
                        fullname:"中国婚姻法",
                        pinyin:"hunyin"
                    }
                ]
            }
        },
        methods:{
            editLaw:function(id){
                this.$router.push({path:"/law/edit",query:{id:id}})
            },
            delLaw:function(id){
                this.laws=this.laws.filter(item=>item.id!=id)
            },
            addLawRule:function(law_id){
                console.log(law_id)
                this.$router.push({path:'/law/rule/add',query:{law_id:law_id}})
            }
        }
    }
</script>
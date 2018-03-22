<template>
    <div class="law-container">
        <confirm :confirmSuccess="delLawRule" ref="confirm"></confirm>
        <el-row>
            <el-select v-model="selected_law" @change="changeLaw">
                <el-option v-for="l in laws" :key="l.id" :value="l.id" :label="l.name"></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="addLawRule">添加法规</el-button>
            <router-link to="/law">
                <el-button type="primary" size="small">查看法律列表</el-button>
            </router-link>
        </el-row>
        <el-table :data="law_rules">
            <el-table-column prop="title" label="标题" width="150"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="keywords" label="匹配词" :formatter="formatKeyword" width="400">
                <template slot-scope="scope">
                    <el-tag type="success" v-for="item in scope.row.law_rule_keyword">{{item.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
                    <el-button type="text" size="mini" @click="editLawRule(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    import {getLawList,getLawRuleList,delLawRule} from "@/api/law"
    export default{
        components:{confirm},
        data(){
            return {
                laws:[],
                selected_law:null,
                deleted:false,
                law_rules:[],
                current_rule_id:null,
            }
        },
        methods:{
            formatKeyword:function(row,column,cellValue){
                if(cellValue && cellValue.length)
                    return cellValue.join(",")
            },
            addLawRule:function(){
                if(!this.selected_law){
                    this.$message({type:"warning",message:"请先选择具体法律",duration:1000});
                    return;
                }
                this.$router.push({path:"/law/rule/add",query:{law_id:this.selected_law}})
            },
            delLawRule:function(){
                delLawRule(this.current_rule_id).then(data=>{
                    this.$refs.confirm.closeConfirm()
                    this.law_rules=this.law_rules.filter(item=>item.id!=this.current_rule_id)
                })
            },
            editLawRule:function(law_rule_id){
                this.$router.push({name:"lawRuleEdit",params:{law_rule_id:law_rule_id}})
            },
            changeLaw(){
                getLawRuleList(this.selected_law).then(data=>{
                    this.law_rules=data.data
                })
            },
            delConfirm(law_rule_id){
                this.current_rule_id=law_rule_id
                this.$refs.confirm.showConfirm()
            }
        },
        mounted(){
            getLawList().then(data=>{
                this.laws=data.data
                if(this.$route.query.law_id){
                    this.selected_law=this.$route.query.law_id
                }else{
                    this.selected_law=this.laws[0]['id'];
                }
                if(this.laws.length){
                    getLawRuleList(this.selected_law).then(data=>{
                        this.law_rules=data.data
                    })
                }
            })
        }
    }
</script>   
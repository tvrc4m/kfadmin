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
            <el-table-column prop="title" label="标题" width="80"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="law_rule_keyword" label="匹配词" :formatter="formatKeyword" width="150"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="$refs.confirm.delConfirm">删除</el-button>
                    <el-button type="text" size="mini" @click="editLawRule(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="total" :page_size="page_size" @change="changePage"></pagination>
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    import pagination from "@/components/Pagination/index"
    import {getLawList,getLawRuleList} from "@/api/law"
    export default{
        components:{confirm,pagination},
        data(){
            return {
                laws:[],
                selected_law:null,
                deleted:false,
                law_rules:[],
                total:0,
                page_size:0,
            }
        },
        methods:{
            formatKeyword:function(row,column,cellValue){
                var keywords=[]
                console.log(cellValue)
                if(cellValue && cellValue.length)
                    cellValue.forEach(item=>keywords.push(item.name))
                return keywords.join(",")
            },
            addLawRule:function(){
                if(!this.selected_law){
                    this.$message({type:"warning",message:"请先选择具体法律",duration:1000});
                    return;
                }
                this.$router.push({path:"/law/rule/add",query:{law_id:this.selected_law}})
            },
            delLawRule:function(){
                console.log("delete logs")
                this.$refs.confirm.closeConfirm()
            },
            editLawRule:function(law_rule_id){
                this.$router.push({name:"lawRuleEdit",params:{law_rule_id:law_rule_id}})
            },
            changeLaw(){
                getLawRuleList(this.selected_law).then(data=>{
                    this.law_rules=data.data
                })
            },
            getLawRuleList(page=1){
                getLawRuleList(this.selected_law,page).then(data=>{
                    this.law_rules=data.data
                    this.total=data.total
                    this.page_size=data.per_page
                })
            },
            changePage(page){
                this.getLawRuleList(page);
            }
        },
        mounted(){
            getLawList().then(data=>{
                this.laws=data.data
                if(this.laws.length){
                    this.selected_law=this.laws[0]['id'];
                    this.changePage()
                }
            })
        }
    }
</script>   
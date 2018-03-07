<template>
    <div class="law-container">
        <el-popover ref="del_law_rule" placement="top" width="200" v-model="deleted">
            <p>是否确认要删除?</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="deleted = false">取消</el-button>
                <el-button type="primary" size="mini" @click="delLawRule">确定</el-button>
            </div>
        </el-popover>
        <el-row>
                <el-select v-model="law">
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
            <el-table-column prop="keywords" label="匹配词" :formatter="formatKeyword" width="150"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" v-popover:del_law_rule @click="deleted=true">删除</el-button>
                    <el-button type="text" size="mini" @click="editLawRule">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        
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
                    },
                    {
                        id:2,
                        name:"民事法",
                        fullname:"中国民事法",
                        pinyin:"minshi"
                    }
                ],
                law:null,
                deleted:false,
                law_rules:[
                    {
                        title:"第一条",
                        content:"载60人印度大巴坠桥致25死 多数遇难者为妇女儿童载60人印度大巴坠桥致25死 多数遇难者为妇女儿童",
                        keywords:["刑事案件","严重事件"]
                    }
                ]
            }
        },
        methods:{
            formatKeyword:function(row,column,cellValue){
                return cellValue.join(",")
            },
            addLawRule:function(){
                if(!this.law){
                    this.$message({type:"warning",message:"请先选择具体法律",duration:1000});
                    return;
                }
                this.$router.push({path:"/law/rule/add",query:{law:this.law}})
            },
            delLawRule:function(){
                console.log("delete logs")
            },
            editLawRule:function(){

            }
        }
    }
</script>   
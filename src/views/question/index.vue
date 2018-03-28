<template>
    <div class="emotion-container">
        <el-row style="margin-bottom: 10px;">
            <el-button type="primary" size="small" @click="addQuestionCollection" v-if="showAdd">录入新问题集</el-button>
            <el-button type="primary" size="small" v-show="reportTemplate" @click="toTemplate">查看报告书模版</el-button>
        </el-row>
        <confirm ref="confirm" :confirmSuccess="delCollection"></confirm>
        <el-row v-for="(q,index) in questions" :key="q.id" style="margin-bottom: 5px;">
            <el-card :body-style="{padding:'10px'}">
                <div class="header">
                    <span class="title">{{q.title}}</span>
                    <span class="question-count">问题数量:<span class="count">{{q.num}}</span></span>
                </div>
                <div class="content">
                    {{q.content}}
                </div>
                <div class="questions clearfix" v-if="q.question_name.length">
                    <strong style="float:left">前置问题：</strong>
                    <div style="float:left">
                        <div v-for="i in q.question_name" style="margin-bottom:5px;color: #409EFF">
                            <span>{{i.question_title}}</span>-
                            <span style="color: red">{{i.option_title}}</span>
                        </div> 
                    </div> 
                </div>
                <div class="footer">
                    <strong>ID:</strong>{{q.id}}&nbsp;&nbsp;<strong>添加时间:</strong>{{q.created_at}}&nbsp;&nbsp;<strong>添加人:</strong>{{q.username}}
                    <div class="action right">
                        <el-button type="text" @click="delConfirm(q.id,index)" v-if="type!=3">删除</el-button>
                        <el-button type="text" @click="toEdit(q.id)">编辑</el-button>
                        <el-button type="text" @click="toView(q.id)">查看</el-button>
                    </div>
                </div>
            </el-card>
        </el-row>
        <el-row>
            <pagination :total="total" :page_size="page_size" @change="changePage"></pagination>
        </el-row>
    </div>
    
</template>
<script>
    import pagination from "@/components/Pagination/index"
    import question_mixin from '@/mixin/question'
    import confirm_mixin from '@/mixin/confirm'
    import {getQuestionCollectionList,delQuestionCollection} from '@/api/question'
    export default{
        name:"question-collection",
        components:{pagination},
        mixins:[question_mixin,confirm_mixin],
        data(){
            return {
                questions:[],
                pageIndex:1,
                page_size:0,
                total:0,
                reportTemplate:false,
                showAdd:true
            }
        },
        methods:{
            changePage(pageIndex){
                getQuestionCollectionList(this.type,pageIndex).then(data=>{
                    console.log(22,data);
                    this.questions=data.data
                    this.pageIndex=data.current_page;
                    this.page_size=data.per_page;
                    this.total=data.total;
                }).catch(error=>{
                        console.log(error)
                    }
                )
            },
            addQuestionCollection(){
                console.log(this.type_name)
                this.$router.push({
                    name:"questionCollectionAdd",
                    params:{
                        type:this.type_name
                    }
                })
            },
            addClick(){
                this.$router.push({name:"questionAdd"})
            },
            toEdit(question_collection_id){
                this.$router.push({
                    name:"questionCollectionEdit",
                    params:{
                        type:this.type_name,
                        question_collection_id:question_collection_id
                    }
                })
            },
            toView(question_collection_id){
                this.$router.push({name:"questionCollectionView",params:{type:this.type_name,question_collection_id:question_collection_id}})
            },
            delCollection(){
                delQuestionCollection(this.confirm_id).then(data=>{
                    this.delSuccess()
                    this.questions.splice(this.confirm_index,1)
                })
            },
            showAll(q,index){
                this.questions[index].show=false
                this.$forceUpdate()
            },
            toTemplate(){
                this.$router.push({
                    name:"reportTemplate",
                })

            },
            getCollectionList(){
                getQuestionCollectionList(this.type,this.pageIndex).then(data=>{
                    console.log(11,data);
                    this.questions=data.data
                    this.pageIndex=data.current_page;
                    this.page_size=data.per_page;
                    this.total=data.total;
                    this.questions.forEach(item=>{
                        item.show=true
                    })
                    console.log('type',this.type)
                    if(this.type==3 && this.questions.length>0) this.showAdd=false
                    else this.showAdd=true
                }).catch(error=>{
                        console.log(error)
                    }
                )
            }
        },
        created(){
        },
        mounted(){
             if(this.type==1){
                this.reportTemplate=true
             }
            this.getCollectionList()
        },
        watch:{
            $route(route){
                if(route.name=="law"){
                    this.type=1
                    this.pageIndex=1
                    this.reportTemplate=true
                    this.getCollectionList()
                }else if(route.name=='emotion'){
                    this.type=2
                    this.pageIndex=1
                    this.reportTemplate=false
                    this.getCollectionList()
                }else if(route.name=='preposing'){
                    this.type=3
                    this.pageIndex=1
                    this.reportTemplate=false
                    this.getCollectionList()
                }
            }
        }
    }
</script>
<style lang="scss" type="text/css" scoped>
    .header{
        line-height:22px;
        font-size:16px;
        margin-bottom:10px;
        .title{
            
        }
        .question-count{
            margin-left:50px;
        }
        .count{
            color:red;
        }
    }
    .content{
        margin-bottom:10px;
    }
    .expand{
        .el-button{
            padding-top:0px;
        }
    }
    .questions{
        margin-bottom:10px;
    }
    .footer{
        .action{
            display:inline-block;
        }
        .right{
            float:right;
        }
    }

</style>
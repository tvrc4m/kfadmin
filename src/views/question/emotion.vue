<template>
    <div class="emotion-container">
        <el-row style="margin-bottom: 10px;">
            <el-button type="primary" size="small" @click="addQuestionCollection">录入新问题集</el-button>
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
                <div class="expand">
                    <el-button type="text" @click="showAll(q,index)" v-show="q.show">展开更多</el-button>
                </div>
                <div class="questions clearfix" v-show="!q.show">
                    <span style="float:left">前置问题：</span>
                    <div style="float:left">
                        <div v-for="i in q.question_name" style="margin-bottom:5px;color: #409EFF">{{i}}</div> 
                    </div> 
                </div>
                <div class="footer">
                    ID:{{q.id}}&nbsp;&nbsp;添加时间:{{q.created_at}}&nbsp;&nbsp;添加人:{{q.username}}
                    <div class="action right">
                        <el-button type="text" @click="delConfirm(q.id,index)">删除</el-button>
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
                delQuestionCollection(this.confirm_id,this.confirm_index).then(data=>{
                    this.delSuccess()
                    this.questions.splice(this.confirm_index,1)
                })
            },
            showAll(q,index){
                this.questions[index].show=false
                this.$forceUpdate()
            },
        },
        created(){
             
        },
        mounted(){
            console.log('type',this.type)
            getQuestionCollectionList(this.type,this.pageIndex).then(data=>{
                console.log(11,data);
                this.questions=data.data
                this.pageIndex=data.current_page;
                this.page_size=data.per_page;
                this.total=data.total;
                this.questions.forEach(item=>{
                    item.show=true
                })
            }).catch(error=>{
                    console.log(error)
                }
            )
        }
    }
</script>
<style lang="scss" type="text/css">
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
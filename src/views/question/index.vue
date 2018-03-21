<template>
    <div class="emotion-container">
        <el-row style="margin-bottom: 10px;">
            <!-- <router-link to="/question/add"> -->
                <el-button type="primary" size="small" @click="addClick">录入新问题集</el-button>
            <!-- </router-link> -->
        </el-row>
        <el-row v-for="q in questions" :key="q.id" style="margin-bottom: 5px;">
            <el-card :body-style="{padding:'10px'}">
                <div class="header">
                    <span class="title">{{q.title}}</span>
                    <span class="question-count">问题数量:<span class="count">{{q.num}}</span></span>
                </div>
                <div class="content">
                    {{q.content}}
                </div>
                <div class="expand">
                    <el-button type="text" @click="showAll" v-show="show">展开更多</el-button>
                </div>
                <div class="questions" v-show="!show">
                    <span>前置问题：</span>
                    <span v-for="item in questions.question_option">{{item.title}}</span>   
                </div>
                <div class="footer">
                    ID:{{q.id}}&nbsp;&nbsp;添加时间:{{q.created_at}}&nbsp;&nbsp;添加人:{{q.username}}
                    <div class="action right">
                        <el-button type="text" @click="deleteClick(q.id)">删除</el-button>
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
    import {getQuestionCollectionList,delQuestionCollection} from '@/api/question'
    export default{
        components:{pagination},
        data(){
            return {
                type:2,
                questions:[],
                pageIndex:1,
                page_size:0,
                total:0,
                show:true   
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
            addClick(){
                this.$router.push({name:"questionAdd"})
            },
            toEdit(question_collection_id){
                this.$router.push({name:"questionCollectionEdit",params:{question_collection_id:question_collection_id}})
            },
            toView(question_collection_id){
                this.$router.push({name:"questionCollectionView",params:{question_collection_id:question_collection_id}})
            },
            deleteClick(question_collection_id){
                delQuestionCollection(question_collection_id).then(data=>{
                    this.$message({message:"删除成功",type:"success"})
                })
            },
            showAll(){
                this.show=false;
            }
        },
        mounted(){
            getQuestionCollectionList(this.type,this.pageIndex).then(data=>{
                console.log(11,data);
                this.questions=data.data
                this.pageIndex=data.current_page;
                this.page_size=data.per_page;
                this.total=data.total;
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
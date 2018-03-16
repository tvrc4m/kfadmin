<template>
    <div class="emotion-container">
        <el-row style="margin-bottom: 10px;">
            <router-link to="/question/add">
                <el-button type="primary" size="small">录入新问题集</el-button>
            </router-link>
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
                </div>
                <div class="footer">
                    ID:{{q.id}}&nbsp;&nbsp;添加时间:{{q.created_at}}&nbsp;&nbsp;添加人:{{q.username}}
                    <div class="action right">
                        <el-button type="text">删除</el-button>
                        <el-button type="text" @click="toEdit(q.id)">编辑</el-button>
                        <el-button type="text" @click="toView(q.id)">查看</el-button>
                    </div>
                </div>
            </el-card>
        </el-row>
        <el-row>
            <el-pagination background layout="prev, pager, next" :total="pageTotal" :page-coun="pageCount" @current-change="handleCurrentChange"></el-pagination>
        </el-row>
    </div>
    
</template>
<script>
    import {getQuestionCollectionList} from '@/api/question'
    export default{
        data(){
            return {
                type:2,
                questions:[
                    // {
                    //     id:1,
                    //     title:"基本信息",
                    //     content:"默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报",
                    //     created_at:"2018-07-21"
                    // },
                    // {
                    //     id:2,
                    //     title:"婚姻信息",
                    //     content:"一个 errorCaptured 钩子能够返回 false以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的",
                    //     created_at:"2018-07-21"
                    // }
                ],
                pageIndex:1,
                pageCount:10,
                pageTotal:100,
                show:true   
            }
        },
        methods:{
            handleCurrentChange(pageIndex){
                getQuestionCollectionList(this.type,pageIndex).then(data=>{
                    console.log(data);
                    this.questions=data.data
                }).catch(error=>{
                        console.log(error)
                    }
                )
            },
            toEdit(question_collection_id){
                this.$router.push({name:"questionCollectionEdit",params:{id:question_collection_id}})
                // this.$router.push({path:'/question/edit',query:{question_collection_id:question_collection_id}})
            },
            toView(question_collection_id){
                this.$router.push({name:"questionCollectionView",params:{id:question_collection_id}})
            },
            showAll(){
                this.show=false;
            }
        },
        mounted(){
            getQuestionCollectionList(this.type,this.pageIndex).then(data=>{
                console.log(data);
                this.questions=data.data
                // this.pageTotal=data.total
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
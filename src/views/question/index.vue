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
                    <span class="question-count">问题数量:<span class="count">{{q.count}}</span></span>
                </div>
                <div class="content">
                    {{q.content}}
                </div>
                <div class="expand">
                    <el-button type="text">展开更多</el-button>
                </div>
                <div class="questions">
                    
                </div>
                <div class="footer">
                    ID:{{q.id}}&nbsp;&nbsp;添加时间:{{q.created_at}}
                    <div class="action right">
                        <el-button type="text">删除</el-button>
                        <el-button type="text">编辑</el-button>
                    </div>
                </div>
            </el-card>
        </el-row>
        <el-row>
            <el-pagination background layout="prev, pager, next" :total="85" :page-coun="10"></el-pagination>
        </el-row>
    </div>
    
</template>
<script>
    export default{
        data(){
            return {
                questions:[
                    {
                        id:1,
                        title:"基本信息",
                        content:"默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报",
                        created_at:"2018-07-21"
                    },
                    {
                        id:2,
                        title:"婚姻信息",
                        content:"一个 errorCaptured 钩子能够返回 false以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的",
                        created_at:"2018-07-21"
                    }
                ]
            }
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
    .footer{
        .action{
            display:inline-block;
        }
        .right{
            float:right;
        }
    }

</style>
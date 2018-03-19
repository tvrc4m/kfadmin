<template>
    <div class="base-container">

        <div class="row clearfix">
            <div class="item ">标题</div>
            <div class="item-content right">{{question.title}}</div>
        </div>
        <div class="row clearfix">
            <div class="item ">描述</div>
            <div class="item-content right">{{question.content}}</div>
        </div>
        <div class="row clearfix">
            <div class="item ">前置问题</div>
            <div class="item-content-4 right ">{{question.pre_question[0]}}</div>
        </div>
        <div class="row clearfix">
            <div class="item ">过度页</div>
            <div class="item-content-3 right">{{question.overdue}}</div>
        </div>
        <div class="row clearfix">
            <div class="item ">背景图</div>
            <div class="item-content-3 right"><img src="" alt=""></div>
        </div>

        <div class="row clearfix">
            <div class="item ">显示方式</div>
            <div class="item-content-4 right ">{{question.is_single_page}}</div>
        </div>
        <div class="row clearfix">
            <div class="item ">是否是主干问题</div>
            <div class="item-content-7 right">{{question.is_trunk}}</div>
        </div>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="baseClick">{{confirm_text}}</el-button>
        </el-row>
    </div>
</template>

<script>
    
    import keywords from "@/components/Question/keywords"
    import {getQuestionCollection} from '@/api/question'
    export default{
        components:{keywords},
        data(){
            return {
                tab_selected:"base",
                confirm_text:"编辑",
                keywords:[],
                skill:null,
                question:{
                    id:"",
                    title:"",
                    content:"",
                    overdue:"",
                    pre_question:[],
                    is_single_page:true,
                    is_trunk:1,
                },

            }
        },
        created(){
            // console.log(this.$route.params.id);
            if(this.$route.params.id){
                this.question.id=this.$route.params.id
            }
        },
        mounted(){
            getQuestionCollection(this.question.id).then(data=>{
                // console.log(data);
                this.questions=data.data
            }).catch(error=>{
                    console.log(error)
                }
            )
        },
        methods:{
            baseClick(){
                this.$router.push({name:"questionCollectionEdit",params:{id:this.question.id}})
            }
        }

    }
</script>

<style lang="scss" type="text/css">
    .right{
        float: right;
    }
    .row{
        margin-bottom: 10px;
        font-size: 14px;
        color: #606266;
        .item{
            font-weight: 700;
            display:inline-block;
        }
        .item-content{
            width:94%;
        }
        .item-content-3{
            width:92%;
        }
        .item-content-4{
            width:90%;
        }
        .item-content-7{
            width:85%;
        }
    }
</style>

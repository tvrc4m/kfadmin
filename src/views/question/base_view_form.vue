<template>
    <div class="base-container">
        <el-table :data="table" :show-header="false" :border="true" width="100%">
            <el-table-column prop="label" width="135" :render-header="renderHeader"></el-table-column>
            <el-table-column prop="value"></el-table-column>
        </el-table>
        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="baseClick">{{confirm_text}}</el-button>
        </el-row>
    </div>
</template>

<script>
    import keywords from "@/components/Question/keywords"
    import mixin from '@/mixin/question'
    import {getQuestionCollection} from '@/api/question'
    export default{
        components:{keywords},
        mixins:[mixin],
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
                    relate_question:[],
                    is_single_page:0,//1 单页   2 多页
                    is_trunk:0,//1 是  
                    bgimage:""
                },
                table:[]
            }
        },
        created(){
            if(this.$route.params.question_collection_id){
                this.question.id=this.$route.params.question_collection_id
            }
        },
        mounted(){
            getQuestionCollection(parseInt(this.question.id)).then(data=>{
                this.question=data;
                this.table.push(
                    {label:"标题",value:this.question.title},
                    {label:"描述",value:this.question.content},
                    // {label:"前置问题",value:this.question.relate_question.split(',')},
                    {label:"过度页",value:this.question.overdue},
                    {label:"背景图",value:this.question.title},
                    {label:"显示方式",value:this.question.is_single_page==1?'单页':'多页'},
                    {label:"是否是主干问题",value:this.question.is_trunk?'是':'否'},
                )
                console.log(this.table)
            }).catch(error=>{
                    console.log(error)
                }
            )
        },
        methods:{
            baseClick(){
                this.$router.push({name:"questionCollectionEdit",params:{question_collection_id:this.question.id}})
            },
            renderHeader(h,obj){
                // return createEle('h2',obc)
                console.log('obj',h,obj)
            }
        }

    }
</script>

<style lang="scss" scoped>
    .right{
        float: right;
    }
    .row{
        margin-bottom: 10px;
        font-size: 14px;
        color: #606266;
        .item{
            width:250px;
            font-weight: 700;
            display:inline-block;
        }
        .item-content{
            width:92%;
            display:inline-block;
        }
        .item-content-3{
            width:90%;
            display:inline-block;
        }
        .item-content-4{
            width:88%;
            display:inline-block;
        }
        .item-content-7{
            width:80%;
            display:inline-block;
        }
    }
</style>

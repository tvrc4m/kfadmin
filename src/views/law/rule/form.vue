<template>
    <el-form class="law-form" :inline="true" label-width="100px;">
        <el-form-item label="法律" class="block" required>
            <el-input type="text" disabled v-model="law.name"></el-input>
        </el-form-item>
        <el-form-item label="条目" class="block" required>
            <el-input v-model="law_rule.title"  class="law-input"></el-input>
        </el-form-item>
        <el-row :span="24">
                <el-form-item label="内容" class="block" required>
                    <el-input type="textarea" v-model="law_rule.content" :rows="10" class="law-input"></el-input>
                </el-form-item>
        </el-row>
        <el-row>
            <keywords :keywords.sync="keywords" label="匹配词"></keywords>
        </el-row>
        <el-button type="primary" @click="confirm">{{confirm_text}}</el-button>
    </el-form>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    import {getLawInfo,getLawRuleInfo,addLawRule,editLawRule} from '@/api/law'
    export default{
        name:"professional-add",
        components:{keywords},
        data(){
            return {
                law_rule:{
                    id:null,
                    title:"",
                    content:"",
                    law_id:null,
                    keyword:[],
                },
                keywords:[],
                law:{},
                add:true,
                confirm_text:"新增",
                skills_selected:[],
                skills:[
                    {
                        label:"法律",
                        value:"法律",
                        children:[
                            {
                                label:"民事诉讼",
                                value:"民事诉讼"
                            },
                            {
                                label:"法律诉讼",
                                value:"法律诉讼"
                            }
                        ]
                    },
                    {
                        label:"法规",
                        value:"法规",
                        children:[
                            {
                                label:"民事诉讼",
                                value:"民事诉讼"
                            },
                            {
                                label:"法律诉讼",
                                value:"法律诉讼"
                            }
                        ]
                    },
                ],
            }
        },
        computed:{
            
        },
        watch:{
            keywords(selected){
                if(this.law_rule.keyword.length) this.law_rule.keyword.splice(0,this.law_rule.keyword.length)
                selected.forEach(item=>this.law_rule.keyword.push(item.keyword_id))
                console.log(this.law_rule)
            }
        },
        methods:{
            confirm(){
                if(this.add){
                    addLawRule(this.law_rule).then(response=>{
                        console.log("add law rule")
                    })
                }else{
                    editLawRule(this.law_rule.id,this.law_rule).then(response=>{
                        console.log('edit law rule')
                    })
                }
            }
        },
        created(){
            if(this.$route.params.law_rule_id){
                this.law_rule.id=this.$route.params.law_rule_id;
                this.add=false;
                this.confirm_text='编辑';
            }
        },
        mounted(){

            if(!this.add){
                getLawRuleInfo(this.law_rule.id).then(data=>{
                    this.law_rule=data
                    getLawInfo(this.law_rule.law_id).then(data=>{
                        this.law=data
                        console.log(this.law)
                    })
                })
            }else{
                this.law_rule.law_id=this.$route.query.law_id
                getLawInfo(this.$route.query.law_id).then(data=>{
                    this.law=data
                    console.log(this.law)
                })
            }
            

        }
    }
</script>
<style lang="scss" scoped>
    .law-form{
        width:100%;
        .law-input{
            width:600px;
        }
    }
    .law-content{
        width:100%;
    }
    .block{
        display:block;
    }
</style>
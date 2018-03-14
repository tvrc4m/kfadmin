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
            <keywords :selected="law_rule.keywords" label="匹配词"></keywords>
        </el-row>
        <el-button type="primary" @click="addProfessional">添加</el-button>
    </el-form>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    export default{
        name:"professional-add",
        components:{keywords},
        data(){
            return {
                law_rule:{
                    title:"",
                    content:"",
                    keywords:[]
                },
                law:{
                    id:1,
                    name:"婚姻法"
                },
                content:"",
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
        methods:{
            addProfessional:function(){

            }
        },
        mounted(){
            console.log(this.$route.params)
            this.law_rule={title:"夫妻共同财产",content:"要共同承担及尝付",keywords:["婚姻法"]}
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
<template>
    <el-form class="emotion-form" :inline="true" label-width="120" label-position="right" :model="expert">
        <el-row type="flex">
            <el-form-item label="昵称">
                <el-input v-model="expert.nickname"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="expert.name"></el-input>
            </el-form-item>
        </el-row>
        <el-form-item label="职业" class="block">
            <el-select v-model="job_id" placeholder="选择职业" filterable>
                <el-option v-for="job in jobs" :key="job.id" :label="job.name" :value="job.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="认证" class="block">
            <el-checkbox v-for="v in verify" :label="v.id" :key="v.name" name="verify">{{v.name}}</el-checkbox>
        </el-form-item>
        <el-form-item label="位置" class="block">
            <el-cascader :options="location" filterable clearabel placeholder="选择城市" v-model="loc" expand-trigger="hover"></el-cascader>
        </el-form-item>
        <el-row style="height: 80px;">
            <keywords label="关键词" :keywords="skills"></keywords>
        </el-row>
        <el-button type="primary" @click="confirm">{{confirm_text}}</el-button>
    </el-form>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    import {getExpertInfo,addExpert,editExpert} from '@/api/expert'
    export default{
        name:"expert-add",
        components:{keywords},
        data(){
            return {
                expert:{
                    id:null,
                    nickname:"",
                    name:"",
                    job_id:"",
                    good_at:[]
                },
                jobs:[
                    {
                        id:1,
                        name:"律师"
                    },
                    {
                        id:2,
                        name:"IT工程师"
                    }
                ],
                verify:[
                    {
                        id:1,
                        name:"官方认证"
                    },
                    {
                        id:2,
                        name:"专业律师"
                    },
                    {
                        id:3,
                        name:"专业咨询师"
                    }
                ],
                verifyid:null,
                job_id:null,
                loc:null,
                skill:null,
                location:[{
                    label:"北京",
                    value:"bj",
                    children:[
                        {
                            label:"朝阳区",
                            value:"chaoyang"
                        },
                        {
                            label:"海淀区",
                            value:"haidian"
                        }
                    ]
                }],
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
                ],
                confirm_text:"新增",
                add:true
            }
        },
        computed:{
            job_name:function(){
                var current=this.jobs.filter(item=>item.id==this.job_id)
                return current.length && current[0].name
            }
        },
        created(){
            if(this.$route.params.id){
                this.expert.id=this.$route.params.id
                this.add=false
                this.confirm_text='编辑'
            }
        },
        methods:{
            changeSkill:function(value){
                var target=this.skills_selected.filter(item=>item==value.join("/"))
                if(target.length==0)
                    this.skills_selected.push(value.join("/"))
            },
            removeSkill:function(value){
                this.skills_selected=this.skills_selected.filter(item=>item!=value)
            },
            confirm:function(){
                if(this.add){
                    addExpert(this.expert).then(response=>{

                    })
                }else{
                    editExpert(this.expert.id,this.expert).then(response=>{

                    })
                }
            }
        },
        mounted(){
            if(!this.add){
                getExpertInfo(this.expert.id).then(response=>{
                    this.expert=response.data;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .emotion-form{
    }
    .block{
        display:block;
    }
</style>
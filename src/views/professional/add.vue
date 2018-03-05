<template>
    <el-form class="emotion-form" :inline="true">
        <el-row type="flex">
            <el-form-item label="昵称">
                <el-input v-model="professional.nick"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="professional.realname"></el-input>
            </el-form-item>
        </el-row>
        <el-form-item label="职业" class="block">
            <el-select v-model="job_id" placeholder="选择职业" filterable>
                <el-option v-for="job in jobs" :key="job.id" :label="job.name" :value="job.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="认证" class="block">
            <el-checkbox-group v-model="verifyid">
                <el-checkbox v-for="v in verify" :label="v.name" :key="v.name">{{v.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="位置" class="block">
            <el-cascader :options="location" filterable clearabel placeholder="选择城市" v-model="loc" expand-trigger="hover"></el-cascader>
        </el-form-item>
        <el-row>
            <el-form-item label="擅长">
                <el-tag v-for="skill in skills_selected" :key="skill" :closable="true==true" type="success" @close="removeSkill(skill)">{{skill}}</el-tag>
                <el-cascader class="block" :options="skills" filterable clearabel placeholder="选择技能" v-model="skill" expand-trigger="hover" @change="changeSkill"></el-cascader>
            </el-form-item>
        </el-row>
        <el-button type="primary" @click="addProfessional">添加</el-button>
    </el-form>
</template>
<script>
    export default{
        name:"professional-add",
        data(){
            return {
                professional:{
                    nick:"tvrc4m",
                    realname:"魏山",
                    job:"律师",
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
                        name:"官方认证"
                    },
                    {
                        name:"专业律师"
                    },
                    {
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
            }
        },
        computed:{
            job_name:function(){
                var current=this.jobs.filter(item=>item.id==this.job_id)
                return current.length && current[0].name
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
            addProfessional:function(){
                
            }
        }
    }
</script>
<style lang="scss" scoped>
    .emotion-form{
        margin:10px 15px;
    }
    .block{
        display:block;
    }
</style>
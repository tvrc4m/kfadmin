<template>
    <el-form class="law-form" :inline="true" label-width="100px;">
        <el-form-item label="法律" required>
            <el-select v-model="law" placeholder="选择法律">
                <el-option v-for="l in laws" :key="l.id" :value="l.id" :label="l.name"></el-option>
            </el-select>
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
            <el-form-item label="匹配词">
                <el-cascader class="block" :options="skills" filterable clearabel placeholder="选择技能" v-model="skill" expand-trigger="hover" @change="changeSkill"></el-cascader>
                <el-tag v-for="skill in skills_selected" :key="skill" :closable="true==true" type="success" @close="removeSkill(skill)">{{skill}}</el-tag>
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
                law_rule:{
                    title:"",
                    content:"",
                },
                laws:[
                    {
                        id:1,
                        name:"婚姻法"
                    },
                    {
                        id:2,
                        name:"民事法"
                    }
                ],
                law:null,
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
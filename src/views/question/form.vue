<template>
    <div class="emotion-container">
        <el-form :inline="true">
            <el-tabs v-model="tab_selected" @tab-click="tabClick" type="border-card">
                <el-tab-pane label="基础资料" name="base">
                    <el-form-item label="标题" class="block" style="width: 500px">
                        <el-input type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" class="block">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="过滤面" class="block">
                        <el-input type="text"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="问题" name="question">
                    <el-form-item class="block" label="问题标题">
                        <el-input type="text"></el-input>
                    </el-form-item>
                    <el-form-item class="block" label="选项">
                        <el-input type="text"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="建议" name="advise">
                    <el-form-item class="block" label="序列">
                        <el-input type="text"></el-input>
                    </el-form-item>
                    <el-form-item class="block" label="内容">
                        <el-input type="text"></el-input>
                    </el-form-item>
                    <el-row style="height: 80px;">
                        <el-form-item label="关键词">
                            <el-cascader class="block" :options="skills" filterable clearabel placeholder="选择关键词" v-model="skill" expand-trigger="hover" @change="changeSkill"></el-cascader>
                            <el-tag v-for="skill in skills_selected" :key="skill" :closable="true==true" type="success" @close="removeSkill(skill)">{{skill}}</el-tag>
                        </el-form-item>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="匹配关系" name="relation"></el-tab-pane>
            </el-tabs>
            <el-row style="margin-top: 10px;">
                <el-button type="primary">确定</el-button>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab_selected:"base",
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
        methods:{
            tabClick:function(){
                console.log("test")
            }
        }
    }
</script>
<style lang="scss">
    .block{
        display:block !important;
    }
    .input{
        
    }
</style>
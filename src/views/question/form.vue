<template>
    <div class="emotion-container">
        <el-form :inline="true" label-width="300">
            <el-tabs v-model="tab_selected" @tab-click="tabClick" type="border-card">
                <el-tab-pane label="基础资料" name="base">
                    <el-form-item label="标题" class="block">
                        <el-input type="text" v-model="question.title"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" class="block">
                        <el-input type="textarea" v-model="question.content"></el-input>
                    </el-form-item>
                    <el-form-item label="关联的问题" class="block">
                        <el-cascader style="width: 500px" :options="related_questions" :show-all-levels="true" @active-item-change="getQuestionChildren" :change-on-select="false" :props="question_props"></el-cascader>
                    </el-form-item>
                    <el-form-item label="过度页" class="block">
                        <el-input type="text" v-model="question.override"></el-input>
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
                question:{
                    title:"",
                    content:"",
                    override:'',
                },
                question_props:{
                    value:"value",
                    children:"questions"
                },
                related_questions:[
                    {
                        label:"情感",
                        value:"emotion",
                        questions:[]
                    },
                    {
                        label:"法律",
                        value:"law",
                        questions:[]
                    }
                ],
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
            },
            getQuestionChildren(vals){
                if(vals.length==1 && vals[0]=='emotion'){
                    this.related_questions[0].questions=[
                        {
                            label:"北京",
                            value:'bj',
                            questions:[]
                        },
                        {
                            label:"青岛",
                            vlue:'qingdao',
                            questions:[]
                        }
                    ];
                }
                if(vals.length==2 && vals[1]=='bj'){
                    console.log(vals)
                    console.log(this.related_questions[0].questions[0])
                    this.related_questions[0].questions[0].questions=[
                        {
                            label:'朝阳区',
                            value:'chaoyang',
                            questions:[]
                        },
                        {
                            label:'海淀区',
                            value:'haidian',
                            questions:[]
                        }
                    ];
                }
                if(vals.length==3 && vals[2]=='chaoyang'){
                    console.log(vals)
                    console.log(this.related_questions[0].questions[0].questions[0].questions)
                    this.related_questions[0].questions[0].questions[0].questions=[
                        {
                            label:'双桥',
                            value:'shouqidao',
                        },
                        {
                            label:'四惠',
                            value:'sihui',
                        }
                    ];
                }
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
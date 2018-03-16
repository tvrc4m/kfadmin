<template>
    <div class="base-container">
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
            <el-input type="text" v-model="question.overdue"></el-input>
        </el-form-item>
        <el-form-item label="显示方式" class="block">
            <el-checkbox v-model="question.is_single_page">单页</el-checkbox>
        </el-form-item>
        <el-form-item label="是否是主干问题" class="block">
            <el-checkbox v-model="question.is_trunk"></el-checkbox>
        </el-form-item>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="baseSubmit">{{confirm_text}}</el-button>
        </el-row>
    </div>
</template>

<script>
    
    import {getQuestionCollection,addQuestionCollection,editQuestionCollection} from '@/api/question'
    export default{
        data(){
            return {
                add:true,
                tab_selected:"base",
                confirm_text:"添加",
                skill:null,
                question:{
                    id:"",
                    type:2,
                    title:"",
                    content:"",
                    overdue:"",
                    question_option_id:[],
                    is_single_page:true,
                    is_trunk:1,
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
            tabClick:function(a){
                // console.log(this.tab_selected)
            },
            getQuestionChildren(vals){
                // console.log(vals);
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
                this.question.question_option_id=vals;
            },
            baseSubmit(){
                if(this.add){
                    this.question.is_single_page = Number(this.question.is_single_page);
                    addQuestionCollection(this.question).then(data=>{
                        this.$router.back(-1);
                    })
                }else{
                    editQuestionCollection(this.question.id,this.question).then(data=>{
                        this.$router.back(-1);
                    })
                }
            }
        },
        created(){
            if(this.$route.params.id){
                this.add=false;
                this.confirm_text="更新";
                this.question.id=this.$route.params.id
            }
        },
        mounted(){
            if(!this.add){
                getQuestionCollection(this.question.id).then(data=>{
                    this.question=data;
                })
            }
        }
    }
</script>
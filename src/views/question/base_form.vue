<template>
    <div class="base-container">
        <el-form-item label="标题" class="block">
        <el-input type="text" v-model="question.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" class="block">
            <el-input type="textarea" v-model="question.content"></el-input>
        </el-form-item>
        <el-form-item class="block" label="关联问题">
            <el-cascader style="width: 500px" :options="related_questions" :show-all-levels="true" @active-item-change="getQuestionChildren" :change-on-select="false" :props="question_props"></el-cascader>
        </el-form-item>
        <el-form-item label="过度页" class="block">
            <el-input type="text" v-model="question.overdue"></el-input>
        </el-form-item>
        <el-form-item label="显示方式" class="block">
            <el-checkbox v-model="single_checked" @change="singleChange">单页</el-checkbox>
        </el-form-item>
        <el-form-item label="是否是主干问题" class="block">
            <el-checkbox v-model="trunk_checked" @change="trunkChange"></el-checkbox>
        </el-form-item>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="baseSubmit">{{confirm_text}}</el-button>
        </el-row>
    </div>
</template>

<script>
    
    import {getQuestionCollection,addQuestionCollection,editQuestionCollection} from '@/api/question'
    export default{
        props:{
            is_add:Boolean
        },
        data(){
            return {
                add:true,
                tab_selected:"base",
                confirm_text:"添加",
                keywords:[],
                skill:null,
                single_checked:false,
                trunk_checked:false,
                question:{
                    id:"",
                    type:2,
                    title:"",
                    content:"",
                    overdue:"",
                    question_option_id:[],
                    is_single_page:1,
                    is_trunk:1,
                    keyword:[],
                    show_report:"",
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
                console.log(2222,vals);
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
                if(this.single_checked){
                    this.question.is_single_page=1;
                }else{

                    this.question.is_single_page=2;
                }
                if(this.trunk_checked){
                    this.question.is_trunk=1;
                }else{
                    this.question.is_trunk=0;
                }
                if(this.add){
                    addQuestionCollection(this.question).then(data=>{
                        this.$emit("update:is_add",true)
                        this.$router.back(-1);
                        // this.$router.push({name:"questionCollectionEdit",params:{question_collection_id:data.id}})
                    })
                }else{
                    editQuestionCollection(this.question.id,this.question).then(data=>{
                        this.$router.back(-1);
                    })
                }
            },
            singleChange(value){
                this.single_checked=value;
            },
            trunkChange(value){
                this.trunk_checked=value;
            }
        },
        created(){
            if(this.$route.params.question_collection_id){
                this.add=false;
                this.confirm_text="更新";
                this.question.id=this.$route.params.question_collection_id
            }
        },
        mounted(){
            if(!this.add){
                getQuestionCollection(this.question.id).then(data=>{
                    this.question=data;
                    if(this.question.is_single_page=='1'){
                        this.single_checked=true
                    }
                    if(this.question.is_trunk=='1'){
                        this.trunk_checked=true
                    }
                })
            }
        }
    }
</script>
<template>
    <div class="base-container">
        <el-form-item label="标题" class="block">
        <el-input type="text" v-model="collection.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" class="block">
            <el-input type="textarea" v-model="collection.content"></el-input>
        </el-form-item>
        <el-form-item class="block" label="关联问题">
            <div v-for="(related,index) in related_question_arr">
                {{related.text}}
                <el-button type="text" @click="removeRelated(related.option_id,index)">删除</el-button>
            </div>
            <el-cascader v-model="related_question" style="width: 500px" :options="related_questions" :show-all-levels="true" @active-item-change="getQuestionChildren" :change-on-select="false" :props="question_props"></el-cascader>
            <el-button type="text" @click="addRelateQuestion">添加</el-button>
        </el-form-item>
        <el-form-item label="过度页" class="block">
            <el-input type="text" v-model="collection.overdue"></el-input>
        </el-form-item>
        <el-form-item class="block" label="背景图">
            <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <span slot="tip" class="el-upload__tip">尺寸要求：</span>
            </el-upload>
        </el-form-item>
        <el-form-item label="显示方式" class="block">
            <el-radio v-model="collection.is_single_page" :label="1">单页</el-radio>
            <el-radio v-model="collection.is_single_page" :label="2">多页</el-radio>
        </el-form-item>
        <el-form-item label="是否是主干问题" class="block">
            <el-checkbox v-model="is_trunk"></el-checkbox>
        </el-form-item>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="baseSubmit">{{confirm_text}}</el-button>
        </el-row>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import {getQuestionCollection,addQuestionCollection,editQuestionCollection,getAllQuestion,getCollectionQuestionsAndOptions} from '@/api/question'
    export default{
        props:{
            is_add:Boolean,
            type:Number,
            type_name:String
        },
        data(){
            return {
                add:true,
                tab_selected:"base",
                confirm_text:"添加",
                keywords:[],
                fileList:[],
                is_trunk:false,
                related_question:null,
                related_question_arr:[],
                collection:{
                    id:null,
                    type:null,
                    title:'',
                    content:'',
                    overdue:'',
                    bgimage:"https://kanfaimage.oss-cn-beijing.aliyuncs.com/20180104/video_151504732376282.jpg?x-oss-process=image/resize,m_fill,w_750,h_422",
                    question_option_id:[],
                    is_single_page:1,
                    is_trunk:0
                },
                question_props:{
                    value:"value",
                    children:"questions"
                },
                related_questions:[]
            }
        },
        watch:{
            is_trunk(value){
                this.collection.is_trunk=value?1:0;
            }
        },
        methods:{
            tabClick:function(a){
                // console.log(this.tab_selected)
            },
            getQuestionChildren(vals){
                var [collection_id,question_id,]=vals
                var result={}
                if(vals.length==1){
                    getCollectionQuestionsAndOptions(collection_id).then(data=>{
                        data.forEach(item=>{
                            var options=[]
                            item.question_option.forEach(option=>{
                                options.push({label:option.options,value:option.id})
                            })
                            if(!result[item.question_collection_id]){
                                result[item.question_collection_id]=[]
                            }
                            result[item.question_collection_id].push({label:item.title,value:item.id,questions:options})
                        })
                        console.log("result",result)
                        this.related_questions.map(item=>{
                            item.questions=result[item.value]
                        })
                        console.log('relation',this.related_questions)
                    })
                }
            },
            baseSubmit(){  
                if(this.add){
                    addQuestionCollection(this.collection).then(data=>{
                        this.$emit("update:is_add",true)
                        this.$router.back(-1);
                        // this.$router.push({name:"questionCollectionEdit",params:{question_collection_id:data.id}})
                    })
                }else{
                    this.collection.bgimage='https://kanfaimage.oss-cn-beijing.aliyuncs.com/20180104/video_151504732376282.jpg?x-oss-process=image/resize,m_fill,w_750,h_422';
                    editQuestionCollection(this.collection.id,this.collection).then(data=>{
                        this.$router.back(-1);
                    })
                }
            },
            addRelateQuestion(){
                var [collection_id,question_id,option_id]=this.related_question
                var exists=false;
                this.collection.question_option_id=[]
                this.collection.question_option_id.forEach(item=>{
                    if(item==option_id){
                        exists=true
                    }
                })
                if(exists) return false
                this.collection.question_option_id.push(option_id)
                var str=''
                this.related_questions.forEach(collection=>{
                    if(collection.value==collection_id){
                        collection.questions.forEach(question=>{
                            if(question.value==question_id){
                                question.questions.forEach(option=>{
                                    if(option.value==option_id){
                                        str=`${collection.label} - ${question.label} - ${option.label}`
                                        this.related_question_arr.push({option_id,text:str})
                                    }
                                })
                            }
                        })
                    }
                })
                // this.related_question=null
            },
            removeRelated(option_id,index){
                console.log(option_id,index)
                this.related_question_arr.splice(index,1)
                this.collection.question_option_id.splice(this.collection.question_option_id.indexOf(option_id),1)
            },
            handleRemove(file, fileList) {
                console.log(1,file, fileList);
            },
            handlePreview(file){
                console.log(2,file);
            },
            handleSuccess(file){
                console.log(3,file);
                // this.question.bgimage=this.fileList[0];
            }
        },
        created(){
            if(this.$route.params.question_collection_id){
                this.add=false;
                this.confirm_text="更新";
                this.collection.id=this.$route.params.question_collection_id
            }
            this.collection.type=this.type
        },
        mounted(){
            if(!this.add){
                getQuestionCollection(this.collection.id).then(data=>{
                    this.collection=data;
                    this.is_trunk=this.collection.is_trunk==1
                    this.collection.question_option_id=this.collection.relate_question.map(item=>{
                        return item.option_id
                    })
                })
            }
            getAllQuestion({type:this.type}).then(data=>{
                data.forEach(item=>{
                    this.related_questions.push({label:item.title,value:item.id,questions:[]})
                })
            })
        }
    }
</script>
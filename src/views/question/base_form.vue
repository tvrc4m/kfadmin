<template>
    <div class="base-container">
        <el-form-item label="标题" class="block">
        <el-input style="width:600px" type="text" v-model="collection.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" class="block descripe">
            <el-input type="textarea" autosize style="width: 600px;" v-model="collection.content"></el-input>
        </el-form-item>
        <el-form-item label="是否是主干问题" class="block">
            <el-checkbox v-model="is_trunk"></el-checkbox>
            <small>(主干问题将不能设置关联问题)</small>
        </el-form-item>
        <el-form-item v-if="showRelation" class="block" label="关联问题">
            <div v-for="(related,index) in related_question_arr">
                {{related.text}}
                <el-button type="text" @click="removeRelated(related.option_id,index)">删除</el-button>
            </div>
            <el-cascader v-model="related_question" style="width: 572px" :options="related_questions" :show-all-levels="true" @active-item-change="getQuestionChildren" :change-on-select="false" :props="question_props"></el-cascader>
            <el-button style="margin-left: 10px;" type="text" @click="addRelateQuestion">添加</el-button>
        </el-form-item>
        <el-form-item label="过度页" class="block">
            <el-input style="width:586px" type="text" v-model="collection.overdue"></el-input>
        </el-form-item>
        <el-form-item class="block" label="背景图">
            <el-input type="hidden" ref="bgimage" v-model="collection.bgimage"></el-input>
            <el-upload
                  class="avatar-uploader"
                  :action="upload_url"
                  :show-file-list="false"
                  :drag="true"
                  :on-success="uploadSuccess">
                    <img v-if="collection.bgimage" :src="collection.bgimage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item class="block" label="排序">
            <el-input-number v-model="collection.sort" :min="0" :max="100" style="width: 120px;" label="排序"></el-input-number>
        </el-form-item>
        <el-form-item label="显示方式" class="block">
            <el-radio v-model="collection.is_single_page" :label="1">单页</el-radio>
            <el-radio v-model="collection.is_single_page" :label="2">多页</el-radio>
        </el-form-item>
        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="baseSubmit">{{confirm_text}}</el-button>
        </el-row>
    </div>
</template>

<script>
    import question_mixin from '@/mixin/question'
    import {getQuestionCollection,addQuestionCollection,editQuestionCollection,getAllQuestion,getCollectionQuestionsAndOptions} from '@/api/question'
    import {upload_url} from '@/api/upload'
    export default{
        mixins:[question_mixin],
        props:{
            is_add:Boolean,
        },
        data(){
            return {
                add:true,
                upload_url:upload_url,
                tab_selected:"base",
                confirm_text:"添加",
                keywords:[],
                fileList:[],
                is_trunk:true,
                showRelation:false,
                related_question:null,
                related_question_arr:[],
                collection:{
                    id:null,
                    type:null,
                    title:'',
                    content:'',
                    overdue:'',
                    bgimage:"",
                    question_option_id:[],
                    is_single_page:1,
                    is_trunk:0,
                    sort:null
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
                if(this.collection.is_trunk){
                    this.showRelation=false
                }else{
                    this.showRelation=true
                }
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
                        // console.log("result",result)
                        this.related_questions.map(item=>{
                            item.questions=result[item.value]?result[item.value]:[]
                        })
                        // console.log('relation',this.related_questions)
                    })
                }
            },
            baseSubmit(){  
                if(this.add){
                    if(this.collection.is_trunk && this.collection.question_option_id){
                        this.collection.question_option_id.splice(0,this.collection.question_option_id.length)
                        this.related_question_arr.splice(0,this.related_question_arr.length)
                    }
                    addQuestionCollection(this.collection).then(data=>{
                        this.$emit("update:is_add",true)
                        this.$router.back(-1);
                        // this.$router.push({name:"questionCollectionEdit",params:{question_collection_id:data.id}})
                    })
                }else{
                    delete this.collection['relate_question'];
                    if(this.collection.is_trunk && this.collection.question_option_id){
                        this.collection.question_option_id.splice(0,this.collection.question_option_id.length)
                        this.related_question_arr.splice(0,this.related_question_arr.length)
                    }
                    editQuestionCollection(this.collection.id,this.collection).then(data=>{
                        this.$router.back(-1);
                    })
                }
            },
            addRelateQuestion(){
                var [collection_id,question_id,option_id]=this.related_question
                var exists=false;
                // this.collection.question_option_id=[]
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
                this.related_question_arr.splice(index,1)
                this.collection.question_option_id.splice(this.collection.question_option_id.indexOf(option_id),1)
            },
            handleRemove(file, fileList) {
                console.log(1,file, fileList);
            },
            handlePreview(file){
                console.log(2,file);
            },
            uploadSuccess(response){
                if(response.error_no==0 && response.data.image_url){
                    this.collection.bgimage=process.env.IMG_URL+response.data.image_url
                }
                console.log(3,this.collection.bgimage);
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
            if(this.type==3){
                this.showRelation=false;
            }
            if(!this.add){
                getQuestionCollection(this.collection.id).then(data=>{
                    this.collection=data;
                    this.is_trunk=this.collection.is_trunk==1
                    this.collection.question_option_id=this.collection.relate_question.map(item=>{
                        return item.option_id
                    })
                    this.collection.relate_question.map(item=>{
                        this.related_question_arr.push({option_id:item.option_id,text:item.question_collection_name+'-'+item.question_name+'-'+item.options})
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
<style lang="css" scoped="">
     .el-upload-dragger{
        width: 178px;
        height: 178px;
      }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    .el-form-item--medium>.el-form-item__content{
        width:100%;
    }
    .el-popper{
        width: 572px !important;
    }
</style>
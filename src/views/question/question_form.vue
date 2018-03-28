<template>
	<div class="question-container">
		<el-form-item class="block" label="问题标题">
			<el-input style="width:572px;" type="text" v-model="question.title"></el-input>
		</el-form-item>
        <el-form-item class="block" label="选项">
        </el-form-item>
        <el-row v-for="(option,index) in question.options">
            <question-option :option.sync="option" :index.sync="index" @remove-option='removeOption'></question-option>
        </el-row>
        <el-row>
            <el-button type="primary" plain size="small" plain @click="addOption">添加新选项</el-button>
        </el-row>
		<el-form-item style="margin-top:10px;" class="block" label="背景图">
            <el-input type="hidden" v-model="question.bgimage"></el-input>
            <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false" :drag="true" :on-success="uploadSuccess">
                <img v-if="question.bgimage" :src="question.bgimage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
		</el-form-item>
         <el-form-item class="block" label="排序">
            <el-input style="width:600px" type="text" v-model="question.sort"></el-input>
        </el-form-item>
        <el-form-item class="block" label="显示方式">
            <el-radio v-for="t in question_type" v-model="question.type"  :disabled="disableOption(t.limit)" :label="t.id">{{t.name}}</el-radio>
        </el-form-item>

        <el-form-item class="block" label="报告书">
            <el-radio v-model="question.show_report" :label="1">出现</el-radio>
            <el-radio v-model="question.show_report" :label="0">不出现</el-radio>
        </el-form-item>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="questionSubmit">{{confirm_text}}</el-button>
        </el-row>
	</div>
</template>
<script>
    import questionOption from "@/components/Question/option"
    import mixin from '@/mixin/question'
    import {getQuestion,addQuestion,editQuestion,} from '@/api/question'
    import {upload_url} from '@/api/upload'
	export default{
        components:{questionOption},
        mixins:[mixin],
		data(){
			return {
                upload_url:upload_url,
				keywords:[],
				add:true,
                tab_selected:"question",
                confirm_text:"添加",
                fileList:[],
                question_id:"",
				question:{
					question_collection_id:null,
					title:"",
					bgimage:"",
					type:3,//1 单选２多选３下拉列表
					sort:0,
					options:[],
					show_report:0,//0报告书中不出现  1 出现
				},
                question_type:[
                    {
                        id:1,
                        name:'单选',
                        limit:0
                    },
                    {
                        id:2,
                        name:'多选',
                        limit:[1]
                    },
                    {
                        id:3,
                        name:'下拉列表',
                        limit:0
                    },
                    {
                        id:4,
                        name:'地理位置选择',
                        limit:[1]
                    },
                    {
                        id:5,
                        name:'时间选择',
                        limit:[1]
                    }
                ]
			}
		},
		methods:{
            questionSubmit(){
                console.log(this.question)
                if(this.add){
					addQuestion(this.question).then(data=>{
                        this.$message({
                            message:"添加成功",
                            type:"success"
                        })
	                    this.$router.back(-1);
	                })
				}else{
                    editQuestion(this.question_id,this.question).then(data=>{
                        this.$message({
                            message:"保存成功",
                            type:"success"
                        })
                        this.$router.back(-1);
                    })
				}
			},
			handleRemove(file, fileList) {
				console.log(1,file, fileList);
			},
            addOption(){
                this.question.options.push({name:'',weight:null,keyword:[]})
            },
            updateOption(index,option){
                console.log("callback",index,this.question.options)
            },
            removeOption(index){
                this.question.options.splice(index,1)
            },
            uploadSuccess(response){
                if(response.error_no==0 && response.data.image_url){
                    this.question.bgimage=process.env.IMG_URL+response.data.image_url
                }
            },
            disableOption(limit){
                var disabled=true;
                if(limit==0) return false

                if(typeof(limit)=='number'){
                    if(this.type==limit) disabled=false
                }else{
                    limit.forEach(item=>{
                        if(this.type==item){
                            disabled=false
                        }
                    })
                }
                return disabled
            }
		},
        created(){
            if(this.$route.params.question_collection_id){
            	if(this.$route.params.question_id){
	                this.add=false;
	                this.confirm_text="更新";	
            	}
                this.question.question_collection_id=this.$route.params.question_collection_id;
                this.question_id=this.$route.params.question_id;
            }
            this.question.type=this.type
        },
		mounted(){
			if(!this.add && this.$route.params.question_collection_id){
				getQuestion(this.question_id).then(data=>{
					this.question=data;
				})
			}
			
		}
	}
</script>
<style lang="css">
     .el-upload-dragger{
        width: 178px;
        height: 178px;
      }
</style>
<style lang="css" scoped>
	.el-upload__tip{
		margin-left: 10px;
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
</style>
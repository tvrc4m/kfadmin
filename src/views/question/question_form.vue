<template>
	<div class="question-container">
		<el-form-item class="block" label="问题标题">
			<el-input type="text" v-model="question.title"></el-input>
		</el-form-item>
        <el-form-item class="block" label="选项">
        </el-form-item>
        <el-row v-for="(option,index) in question.options">
            <question-option :option.sync="option" :index.sync="index" @remove-option='removeOption'></question-option>
        </el-row>
        <el-row>
            <el-button type="warning" size="small" plain @click="addOption">添加新选项</el-button>
        </el-row>
		<el-form-item class="block" label="背景图">
        	<el-upload class="upload" action="http://fdev.vrcdkj.cn/api/admin/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" :auto-upload="false" list-type="picture">
  				<el-button size="small" type="primary">点击上传</el-button>
  				<span slot="tip" class="el-upload__tip">尺寸要求：</span>
			</el-upload>
		</el-form-item>
         <el-form-item class="block" label="排序">
            <el-input type="text" v-model="question.sort"></el-input>
        </el-form-item>
        <el-form-item class="block" label="显示方式">
            <el-radio v-for="t in question_type" v-model="question.type" :label="t.id">{{t.name}}</el-radio>
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
	export default{
        components:{questionOption},
        mixins:[mixin],
		data(){
			return {
				keywords:[],
				add:true,
                tab_selected:"question",
                confirm_text:"添加",
                fileList:[],
                question_id:"",
				question:{
					question_collection_id:null,
					title:"",
					bgimage:"https://kanfaimage.oss-cn-beijing.aliyuncs.com/20180104/video_151504732376282.jpg?x-oss-process=image/resize,m_fill,w_750,h_422",
					type:4,//1 单选２多选３下拉列表
					sort:0,
					options:[],
					show_report:0,//0报告书中不出现  1 出现
				},
                question_type:[
                    {
                        id:1,
                        name:'单选'
                    },
                    {
                        id:2,
                        name:'多选'
                    },
                    {
                        id:3,
                        name:'下拉列表'
                    },
                    {
                        id:4,
                        name:'日期'
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
			handlePreview(file){
				console.log(2,file);
			},
			handleSuccess(file){
				console.log(3,file);
				this.question.bgimage=this.fileList[0];
			},
            addOption(){
                this.question.options.push({name:'',weight:null,keyword:[]})
            },
            updateOption(index,option){
                console.log("callback",index,this.question.options)
            },
            removeOption(index){
                this.question.options.splice(index,1)
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
<style lang="css" scoped>
	.el-upload__tip{
		margin-left: 10px;
	}
</style>
<template>
	<div class="question-container">
		<el-form-item class="block" label="问题标题">
			<el-input type="text" v-model="question.title"></el-input>
		</el-form-item>
		<!-- <el-form-item class="block" label="选项"> -->
			<!-- <el-input type="text"></el-input> -->
			<keywords :keywords.sync="keywords" label="匹配词"></keywords>
		<!-- </el-form-item> -->


		<el-form-item class="block" label="背景图">
        	<el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" list-type="picture">
  				<el-button size="small" type="primary">点击上传</el-button>
  				<span slot="tip" class="el-upload__tip">尺寸要求：</span>
			</el-upload>
		</el-form-item>

        <el-form-item class="block" label="显示方式">
            <el-radio-group v-model="question.type" @change="radioChange">
			    <el-radio :label="1">单选</el-radio>
			    <el-radio :label="2">多选</el-radio>
			    <el-radio :label="3">下拉列表</el-radio>
			    <el-radio :label="4">其它</el-radio>
		    </el-radio-group>
        </el-form-item>

        <el-form-item class="block" label="报告书">
            <el-radio-group v-model="question.show_report" @change="reportRadioChange">
			    <el-radio :label="1">出现</el-radio>
			    <el-radio :label="0">不出现</el-radio>
		    </el-radio-group>
        </el-form-item>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="questionSubmit">{{confirm_text}}</el-button>
        </el-row>
	</div>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    import {getQuestion,addQuestion,editQuestion,} from '@/api/question'
	export default{
        components:{keywords},
		data(){
			return {
				keywords:[],
				add:true,
                tab_selected:"question",
                confirm_text:"添加",
                fileList:[],
                question_id:"",
				question:{
					question_collection_id:"",
					title:"",
					bgimage:"https://kanfaimage.oss-cn-beijing.aliyuncs.com/20180104/video_151504732376282.jpg?x-oss-process=image/resize,m_fill,w_750,h_422",
					type:4,//1 单选２多选３下拉列表
					sort:"",
					options:[],
					show_report:0,//0报告书中不出现  1 出现
				}
			}
		},
		methods:{
            questionSubmit(){
                if(this.add){
					addQuestion(this.question).then(data=>{
	                    this.$router.back(-1);
	                })
				}else{
                    editQuestion(this.question_id,this.question).then(data=>{
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
			radioChange(type){
				this.question.type=type;
			},
			reportRadioChange(type){
				this.question.show_report=type;
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
        },
		watch:{
            keywords(selected){
            	this.question.options=[]
            	var keywords=selected.map(item=>{
            		return item.keyword_id
            	})
            	selected.forEach(item=>{
            		this.question.options[0]={
            			name:"test option",
            			keyword:keywords
            		}
            	})
            	console.log(selected);
                // if(this.question.options.length) this.question.options.splice(0,this.question.options.length)
                // selected.forEach(item=>this.question.options.push(item.keyword_id))
            }
		},
		mounted(){
			console.log(2,this.$route);
			if(!this.add && this.$route.params.question_collection_id){
				getQuestion(this.question_id).then(data=>{
					console.log(444,data);
					this.question=data;
				})
			}
			
		}
	}
</script>
<style>
	.el-upload__tip{
		margin-left: 10px;
	}
</style>
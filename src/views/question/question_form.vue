<template>
	<div class="question-container">
		<el-form-item class="block" label="问题标题">
			<el-input type="text"></el-input>
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

        <el-form-item class="block">
            <el-radio-group v-model="question.type" @change="radioChange">
			    <el-radio :label="1">单选</el-radio>
			    <el-radio :label="2">多选</el-radio>
			    <el-radio :label="3">下拉列表</el-radio>
			    <el-radio :label="4">其它</el-radio>
		    </el-radio-group>
        </el-form-item>

        <el-row style="margin-top: 10px;">
            <el-button type="primary" @click="questionSubmit">{{confirm_text}}</el-button>
        </el-row>
	</div>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    import {getQuestion,addQuestion,editQuestion} from '@/api/question'
	export default{
        components:{keywords},
		data(){
			return {
				keywords:[],
				add:true,
                tab_selected:"question",
                confirm_text:"添加",
                fileList:[],
				question:{
					id:"",
					question_collection_id:"",
					title:"",
					bgimage:"",
					type:4,//1 单选２多选３下拉列表
					sort:"",
					options:[],

				}
			}
		},
		methods:{
            questionSubmit(){
				console.log(this.question);
                if(this.add){
					addQuestion(this.question).then(data=>{
	                    this.$router.back(-1);
	                })
				}else{
                    editQuestion(this.question.id,this.question).then(data=>{
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
			}
		},
        created(){
            if(this.$route.params.id){
                this.add=false;
                this.confirm_text="更新";	
                this.question.id=this.$route.params.id;
            }
        },
		watch:{
            keywords(selected){
                console.log(this.question.keyword);
                // if(this.question.keyword.length) this.question.keyword.splice(0,this.question.keyword.length)
                // selected.forEach(item=>this.question.keyword.push(item.keyword_id))
            }
		},
		mounted(){
			console.log(2,this.$route);
			if(!this.add && this.$route.params.id){
				getQuestion(this.$route.params.id).then(data=>{
					console.log(data);
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
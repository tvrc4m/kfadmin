<template>
	<!-- 编辑匹配关系开始 -->
	<div class="edit-matching-container">
		<!-- 内容模块 -->
		<el-form  label-width="100px" class="demo-ruleForm">
			
		  	<el-form-item style="width:100%;" label="序列：">
		    	<el-select v-model="relation.question_suggest_id" clearable placeholder="请选择">
		    	    <el-option v-for="item in data_form.suggestion" :label="item.title" :value="item.id">
		    	    </el-option>
		    	  </el-select>
		  	</el-form-item>
	  	
		  	<el-form-item style="width:100%" label="匹配关系：">
		  		<el-col v-for="(item,index) in data_form.question" style="margin-top:10px">
		  			<!-- <span>{{item.title}}</span> -->
			    	<el-form-item :label="item.title">
			    		<el-select v-model="relation.suggest_rule[index].option_id" collapse-tags @change="changeItem(item.id,index,$event)" style="margin-left: 20px;" placeholder="请选择">
			    	    	<el-option v-for="i in item.question_option" :label="i.options" :key="i.id" :value="i.id"></el-option>
			    		</el-select>
			    	</el-form-item>
		    	</el-col>
		    	<!-- <el-cascader :options="question" @active-item-change="handleItemChange" :props="props"></el-cascader> -->
		  	</el-form-item>
	  		
		  	<el-form-item class="complete-btn">
		    	<el-button  type="primary" @click="submitForm">完成</el-button>
		  	</el-form-item>

		</el-form>

		
	</div>
	<!-- 编辑匹配关系结束 -->
</template>
<script>
    import {getAdviseRule,addQuestionSuggestRelation} from '@/api/question'
	export default {
	    data() {
	    	return {
	    		add:true,
	    		type:1,
	    		type_name:'',
	    		value:'',
	    		data_form:{},
	    		relation:{
		    		question_collection_id:'',
		    		question_suggest_id:'',
		    		suggest_rule:[]
	    		}
	    	}
	    },
		methods: {
		    submitForm(){
		    	console.log(77777,this.relation);
		    	addQuestionSuggestRelation(this.relation).then(data=>{
		    		console.log(data)
		    	})
		    },
		    changeItem(question_id,index,option_id){
		    	this.$set(this.relation.suggest_rule,index,{question_id:question_id,option_id:option_id})
		    }
		},
		created(){
			if(this.$route.params.question_collection_id){
				this.relation.question_collection_id=this.$route.params.question_collection_id;
				if(this.$route.params.relation_id){
					this.relation.question_suggest_id=this.$route.params.relation_id;
					this.add=false;
				}
			}
		},
		mounted(){
			getAdviseRule(this.relation.question_collection_id).then(data=>{
				console.log(data)
				data.question.forEach((item,index)=>{

					this.relation.suggest_rule[index]={question_id:item.id,option_id:null}
				})
				console.log("question",this.relation.suggest_rule)
				this.data_form=data;
			})
		}
	}


</script>

<style lang="scss">
	.edit-matching-container{
		min-width: 700px;
	}
	// 顶部搜索及标签
	.inline-form-box{
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		height:46px;
		line-height: 42px;
		background:#e5e9f2;
		border-radius: 4px;
		margin: 15px 0 20px;
		padding:0 0 0 10px;
		input,button{
			margin-top: 5px;
		}
		.form-label{
			line-height: 46px !important;
			color: #303133;
		}
	}
	.label-search-style{
		height:46px;
		line-height: 46px;
		float:left;
	}
	// 返回&已录入数量
	.back-num{
		padding:10px 0;
		height:36px;
		display:-webkit-flex;
		display:-moz-flex;
		display:-ms-flex;
		display:flex;
		justify-content:space-between;
		align-items:center;
		.back{
			font-size: 16px;
		}
		.num{
			color:red;
		}
	}
	// 添加关键词
	.el-tag + .el-tag {
	    margin-left: 10px;
	}
	.button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	}
	.input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }

	// 完成按钮
	.complete-btn{
		float:right;
		margin-top:50px;
	}

	// 分页
	.el-pagination{
		margin:10px 0 0 !important;
		text-align: right !important;
		float:right;
	}

	.case-container{
	    .el-input,input[type=text],.el-textarea,textarea{
	        width:500px;
	    }
	    textarea{
	        height:100px;
	    }
	}

	.el-form-item-content{
		margin-left: 0 !important;
	}
	
</style>
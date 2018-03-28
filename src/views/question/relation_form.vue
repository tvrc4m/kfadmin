<template>
	<!-- 编辑匹配关系开始 -->
	<div class="edit-matching-container">
		<!-- 内容模块 -->
		<el-form class="demo-ruleForm">
			
		  	<el-form-item style="width:100%;" label="序列：">
		    	<el-select style="width:600px;" v-model="relation.question_suggest_id" clearable placeholder="请选择">
		    	    <el-option v-for="item in data_form.suggestion" :label="item.title" :value="item.id">
		    	    </el-option>
		    	</el-select>
		  	</el-form-item>
	  		<h4>匹配关系</h4>
	  		<el-table :data="data_form.question" width="100%">
	  			<el-table-column prop="title" label="问题"></el-table-column>
	  			<el-table-column label="选项">
	  				<template slot-scope="scope">
	  					<el-select v-model="relation.suggest_rule[scope.row.id].option_id" collapse-tags @change="changeItem(scope.row.id,scope.row.id,$event)"  placeholder="请选择">
		    	    	<el-option v-for="i in scope.row.question_option" :label="i.options" :key="i.id" :value="i.id"></el-option>
		    		</el-select>
	  				</template>
	  			</el-table-column>
	  		</el-table>
		    	<!-- <el-cascader :options="question" @active-item-change="handleItemChange" :props="props"></el-cascader> -->
	    	<el-button style="margin-top: 15px;" type="primary" @click="submitForm">完成</el-button>
		</el-form>
	</div>
	<!-- 编辑匹配关系结束 -->
</template>
<script>
    import {getAdviseRule,getQuestionSuggestRelation,addQuestionSuggestRelation,editQuestionSuggestRelation} from '@/api/question'
    import mixin from '@/mixin/question'
	export default {
		mixins:[mixin],
	    data() {
	    	return {
	    		add:true,
	    		value:'',
	    		data_form:{},
	    		relation:{
	    			id:null,
		    		question_collection_id:'',
		    		question_suggest_id:'',
		    		suggest_rule:{}
	    		}
	    	}
	    },
		methods: {
		    submitForm(){
		    	// 重新封装结构
	    		var relation=[]
	    		for(var index in this.relation.suggest_rule){
	    			relation.push({
	    				question_id:this.relation.suggest_rule[index].question_id,
	    				option_id:this.relation.suggest_rule[index].option_id
	    			})
	    		}
	    		var result={
	    			id:this.relation.id,question_collection_id:this.relation.question_collection_id,
	    			question_suggest_id:this.relation.question_suggest_id,
	    			suggest_rule:relation
	    		}
		    	if(!this.add){
		    		editQuestionSuggestRelation(this.relation.id,result).then(data=>{
			    		this.$message({
			    			message:"关联成功",
			    			type:"success"
			    		})
			    		this.$router.push({
			    			name:"questionCollectionViewRelation",
			    			params:{
			    				type:this.type_name,
			    				question_collection_id:this.$route.params.question_collection_id
			    			}
			    		})
			    	})
		    	}else{
		    		addQuestionSuggestRelation(result).then(data=>{
		    			this.$message({
			    			message:"关联成功",
			    			type:"success"
			    		})
			    		this.$router.push({
			    			name:"questionCollectionViewRelation",
			    			params:{
			    				type:this.type_name,
			    				question_collection_id:this.$route.params.question_collection_id
			    			}
			    		})
		    		})
		    	}
		    },
		    changeItem(question_id,index,option_id){
		    	this.$set(this.relation.suggest_rule,index,{question_id:question_id,option_id:option_id})
		    }
		},
		created(){
			if(this.$route.params.question_collection_id){
				this.relation.question_collection_id=this.$route.params.question_collection_id;
			}
			if(this.$route.params.relation_id){
				this.add=false
				this.relation.id=this.$route.params.relation_id
			}
		},
		mounted(){
			
			getAdviseRule(this.relation.question_collection_id).then(data=>{
				data.question.forEach((item,index)=>{
					this.$set(this.relation.suggest_rule,item.id,{question_id:item.id,option_id:null})
				})
				console.log("question",this.relation.suggest_rule)
				this.data_form=data;
				if(!this.add){
					getQuestionSuggestRelation(this.relation.id).then(data=>{
						console.log(data)
						this.relation.question_collection_id=data.question_collection_id
						this.relation.question_suggest_id=data.question_suggest_id
						var suggest_rule=[]
						data.suggest_rule.forEach(item=>{
							suggest_rule[item.question_id]=item
						})
						this.$set(this.relation,'suggest_rule',suggest_rule)
						console.log('relation',this.relation.suggest_rule)
					})
				}
				
			})
		}
	}


</script>

<style lang="scss" scoped>
	.edit-matching-container{
		min-width: 700px;

		.demo-ruleForm{
			width:100%;
		}
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
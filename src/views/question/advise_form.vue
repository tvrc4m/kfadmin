<template>
	<!-- 编辑建议开始 -->
	<div class="edit-advise-container">
		<!-- 顶部搜索及标签 -->
<!-- 		<div class="inline-form-box">
			<el-breadcrumb class="label-search-style" separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">数据库</el-breadcrumb-item>
			  <el-breadcrumb-item>情感问题集</el-breadcrumb-item>
			  <el-breadcrumb-item>建议</el-breadcrumb-item>
			</el-breadcrumb>

			<el-form style="float:right" :inline="true"  class="demo-form-inlien">
				<el-form-item>
					<el-input label="right" placehlder="用户提问"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button label="right" type="primary" icon="el-icon-search" plain>搜索</el-button>
				  </el-form-item>
			</el-form>
		</div> -->

		<!-- 返回&已录入数量 -->
<!-- 		<div class="back-num">
			<span>
				<el-button icon="el-icon-arrow-left" class="back" type="text">返回</el-button>
			</span>
			<span class="num">已录入100条</span>
		</div> -->

		<!-- 内容模块 -->
		<el-form :model="advise" :rules="rules" ref="advise" class="demo-ruleForm">
			
		  	<el-form-item style="width:100%" label="序列：" prop="sort">
		    	<el-input style="width:600px" v-model="advise.sort"></el-input>
		  	</el-form-item>
	  	
		  	<el-form-item style="width:100%" label="内容：" prop="content">
		    	<el-input style="width:600px" type="textarea" v-model="advise.content"></el-input>
		  	</el-form-item>

		  	<el-form-item class="complete-btn">
		    	<el-button  type="primary" @click="submitForm('advise')">完成</el-button>
		  	</el-form-item>

		</el-form>

	</div>
	<!-- 编辑建议结束 -->
</template>

<script>
    import {getAdvise,addAdvise,editAdvise} from '@/api/question'
	export default{
	    data() {
			return {
				add:true,
				advise:{
					question_collection_id:'',
					sort:'',
					content:'',
					type:'2',
				},
				rules: {
					sort: [
						{ required: true, message: '请输入序号', trigger: 'blur' },
					],
					content: [
						{ required: true, message: '请填问题内容', trigger: 'blur' }
					]
				}
			};
	    },
	    methods: {
			submitForm(formName) {
				console.log(formName);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.add){
							addAdvise(this.advise).then(data=>{
	                    		this.$router.back(-1);
	               			})
						}else{
							editAdvise(this.advise_id,this.advise).then(data=>{
	                    		this.$router.back(-1);
	               			})
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		created(){
			if(this.$route.params.question_collection_id){
				this.advise.question_collection_id=this.$route.params.question_collection_id;
				if(this.$route.params.advise_id){
					this.advise_id=this.$route.params.advise_id;
					this.add=false;
				}
			}
		},
		mounted(){
			if(!this.add){
				getAdvise(this.advise_id).then(data=>{
					console.log(555,data);
					this.advise=data;
				})
			}
		}
	}


</script>

<style lang="scss">
	.edit-advise-container{
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
	
</style>
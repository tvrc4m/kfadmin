<template>
	<!-- 编辑建议开始 -->
	<div class="edit-advise-container">
		<!-- 内容模块 -->
		<el-form :model="advise" :rules="rules" ref="advise" class="demo-ruleForm">
			<el-form-item label="标题：" prop="title">
		    	<el-input style="width:600px" v-model="advise.title"></el-input>
		  	</el-form-item>
		  	<el-form-item label="序列：" prop="sort">
		    	<el-input style="width:600px" v-model="advise.sort"></el-input>
		  	</el-form-item>
		  	<el-form-item label="问题类型：" required v-if="type==3">
		  		<el-select style="width: 572px" v-model="advise.type" prop="type" placeholder="请选择类型">
		  			<el-option :value="1" key="law" label="法规"></el-option>
		  			<el-option :value="2" key="emotion" label="情感"></el-option>
		  		</el-select>
		  	</el-form-item>
		  	<el-form-item label="内容：" prop="content">
		    	<el-input style="width:600px" type="textarea" v-model="advise.content"></el-input>
		  	</el-form-item>
		  	<el-form-item style="display: block">
		    	<el-button  type="primary" @click="submitForm('advise')">完成</el-button>
		  	</el-form-item>
		</el-form>

	</div>
	<!-- 编辑建议结束 -->
</template>

<script>
    import {getAdvise,addAdvise,editAdvise} from '@/api/question'
    import question_mixin from '@/mixin/question'
	export default{
		props:{
            is_add:Boolean,
        },
        mixins:[question_mixin],
	    data() {
			return {
				add:true,
				advise:{
					question_collection_id:'',
					title:'',
					sort:'',
					content:'',
					type:0,
				},
				rules: {
					title:[
						{required:true,message:"请输入建议标题",trigger:"blur"}
					],
					sort: [
						{ required: true, message: '请输入序号', trigger: 'blur' },
					],
					content: [
						{ required: true, message: '请填问题内容', trigger: 'blur' }
					],
					type:[
						{ required: true, message: '请选择建议类型', trigger: 'blur' }	
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
								this.$message({
									message:"新增成功",
									type:"success"
								})
	                    		this.$router.back(-1);
	               			})
						}else{
							editAdvise(this.advise_id,this.advise).then(data=>{
								this.$message({
									message:"编辑成功",
									type:"success"
								})
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
			this.advise.type=this.type
		},
		mounted(){
			if(!this.add){
				getAdvise(this.advise_id).then(data=>{
					this.advise=data;
				})
			}else{
				if(type==1){
					this.advise.type=1
				}else if(type==2){
					this.advise.type=2
				}
			}
		}
	}


</script>

<style lang="scss" scoped>
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
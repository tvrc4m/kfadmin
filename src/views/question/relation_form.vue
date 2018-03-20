<template>
	<!-- 编辑匹配关系开始 -->
	<div class="edit-matching-container">
		<!-- 顶部搜索及标签 -->
		<div class="inline-form-box">
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
		</div>

		<!-- 返回&已录入数量 -->
		<div class="back-num">
			<span>
				<el-button icon="el-icon-arrow-left" class="back" type="text">返回</el-button>
			</span>
			<span class="num">已录入100条</span>
		</div>

		<!-- 内容模块 -->
		<el-card>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				
			  	<el-form-item style="width:100%;" label="序列：" prop="name">
			    	<el-select v-model="value4" clearable placeholder="请选择">
			    	    <el-option
			    	      v-for="item in options"
			    	      :key="item.value"
			    	      :label="item.label"
			    	      :value="item.value">
			    	    </el-option>
			    	  </el-select>
			  	</el-form-item>
		  	
			  	<el-form-item style="width:100%" label="匹配关系：" prop="content">
			  		<el-col>
				    	<el-select v-model="value5" multiple placeholder="请选择">
				    	    <el-option
				    	      v-for="item in options"
				    	      :key="item.value"
				    	      :label="item.label"
				    	      :value="item.value">
				    	    </el-option>
				    	</el-select>

				    	<el-select
				    	    v-model="value11"
				    	    multiple
				    	    collapse-tags
				    	    style="margin-left: 20px;"
				    	    placeholder="请选择">
				    	    <el-option
				    	      v-for="item in options"
				    	      :key="item.value"
				    	      :label="item.label"
				    	      :value="item.value">
				    	    </el-option>
				    	</el-select>
			    	</el-col>

	    			<el-col style="margin-top: 20px;">
			    	  	<el-select v-model="value5" multiple placeholder="请选择">
			    	  	    <el-option
			    	  	      v-for="item in options"
			    	  	      :key="item.value"
			    	  	      :label="item.label"
			    	  	      :value="item.value">
			    	  	    </el-option>
			    	  	</el-select>

			    	  	<el-select
			    	  	    v-model="value11"
			    	  	    multiple
			    	  	    collapse-tags
			    	  	    style="margin-left: 20px;"
			    	  	    placeholder="请选择">
			    	  	    <el-option
			    	  	      v-for="item in options"
			    	  	      :key="item.value"
			    	  	      :label="item.label"
			    	  	      :value="item.value">
			    	  	    </el-option>
			    	  	</el-select>
		    	  	</el-col>
					
					<el-col style="margin-top: 20px;">
			    	  	<el-select v-model="value5" multiple placeholder="请选择">
			    	  	    <el-option
			    	  	      v-for="item in options"
			    	  	      :key="item.value"
			    	  	      :label="item.label"
			    	  	      :value="item.value">
			    	  	    </el-option>
			    	  	</el-select>

			    	  	<el-select
			    	  	    v-model="value11"
			    	  	    multiple
			    	  	    collapse-tags
			    	  	    style="margin-left: 20px;"
			    	  	    placeholder="请选择">
			    	  	    <el-option
			    	  	      v-for="item in options"
			    	  	      :key="item.value"
			    	  	      :label="item.label"
			    	  	      :value="item.value">
			    	  	    </el-option>
			    	  	</el-select>
		    	  	</el-col>

			  	</el-form-item>

			  	
		  		
			  	<el-form-item class="complete-btn">
			    	<el-button  type="primary" @click="submitForm('ruleForm')">完成</el-button>
			  	</el-form-item>

			</el-form>

		</el-card>	
		
		<!-- 分页 -->
		<!-- <pagination :total="total" :page_size="page_size" @change="changePage"></pagination> -->
		<el-pagination
		class="page-style"
		background
		layout="prev,pager,next"
		:total="100">
			
		</el-pagination>
	</div>
	<!-- 编辑匹配关系结束 -->
</template>
<script>
	export default {
	    data() {
	      return {
	      	dynamicTags: ['感性', '分手'],
  	        inputVisible: false,
  	        inputValue: '',

	        ruleForm: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          content: ''
	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入序号', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          content: [
	            { required: true, message: '请填问题内容', trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
	      
	    },
	    // handleClose(tag) {
	    //     this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
	    // },
	    // showInput() {
     //        this.inputVisible = true;
     //        this.$nextTick(_ => {
     //          this.$refs.saveTagInput.$refs.input.focus();
     //        });
     //    },
     //    handleInputConfirm() {
     //        let inputValue = this.inputValue;
     //        if (inputValue) {
     //          this.dynamicTags.push(inputValue);
     //        }
     //        this.inputVisible = false;
     //        this.inputValue = '';
     //    }
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
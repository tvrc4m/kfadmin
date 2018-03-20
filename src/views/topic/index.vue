<template>

	<div class="topic-container">
		<div class="inline-form-box">
			<span class="form-label">用户提问</span>
			<el-form style="float:right" :inline="true" :model="formInline" class="demo-form-inlien">
				<el-form-item>
					<el-input label="right" placehlder="用户提问"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button label="right" type="primary" icon="el-icon-search" plain>搜索</el-button>
				  </el-form-item>
			</el-form>
		</div>

		<el-button type="primary" plain>法律类</el-button>
		<el-button type="primary" plain>情感类</el-button>
		
		<el-breadcrumb class="label-style" separator="|">
			<el-breadcrumb-item :to="{ path:'/' }">最新问题</el-breadcrumb-item>
			<el-breadcrumb-item>最新回复</el-breadcrumb-item>
			<el-breadcrumb-item>已隐藏问题</el-breadcrumb-item>
			<el-breadcrumb-item>已隐藏回复</el-breadcrumb-item>
			<span class="questioin-num">已有100个问题</span>
		</el-breadcrumb>


		<el-card class="box-card">
		  <div class="card-item">
		  	  <span class="text item content-line-height">
		  	    一跟男闺蜜提要他去找个女朋友他就跟我生气。男闺蜜和男朋友的界限是什么呢？他不会喜欢我吧？还是觉得我多管闲事。一跟男闺蜜提要他去找个女朋友他就跟我生气。男闺蜜和男朋友的界限是什么呢？他不会喜欢我吧？还是觉得我多管闲事。
		  	  </span>
		  	  <div class="expand">
		  	      <el-button class="show-more" type="text">展开更多</el-button>
		  	  </div>

		  	  <el-breadcrumb class="label-style card-label" separator=" ">
		  	  	<el-breadcrumb-item :to="{ path:'/' }">问题ID：1001</el-breadcrumb-item>
		  	  	<el-breadcrumb-item>回复时间：2018-02-02 18:00</el-breadcrumb-item>
		  	  	<el-breadcrumb-item>回复人：10103号</el-breadcrumb-item>
		  	  	<div style="float:right">
		  		  	<el-button type="text">隐藏</el-button>
		  		  	<el-button type="text">推荐</el-button>
		  		</div>
		  	  </el-breadcrumb>
		  </div>

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

</template>

<script>
	// import {getTopicList} from '@/api/topic'
	// export default{
	// 	data(){
	// 		return {
	// 			topics:[]
	// 		}
	// 	}
	// 	created(){

	// 	},
	// 	mounted(){
	// 		getTopicList().then(data=>{
	// 			this.topics=data.data
	// 		})
	// 	}
	// }
</script>

<style lang="scss">
	.topic-container{
		min-width: 700px;
	}
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
	.el-row{
		margin-bottom: 20px;
		&:last-child{
			margin-bottom: 0;
		}
	}
	.el-col{
		// border-radius: 4px;
	}
	.bg-purple-dark{
		background: #99a9bf;
	}
	.bg-purple{
		background: #d3dce6;
	}
	.bg-purple-light{
		background: #e5e9f2;
	}
	.grid-content{
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg{
		padding:10px 0;
		background-color: #f9fafc;
	}

	.el-tag + .el-tag{
		margin-left: 10px;
	}

	.label-style{
		width: 100%;
		height:36px;
		line-height: 36px;
		margin:10px auto;
	}
	.card-label{
		margin:0 !important;
	}
	.questioin-num{
		color:red;
		float:right;
	}
	// .box-card{
	// 	&:last-child{
	// 		border-bottom: none !important;
	// 	}
	// }
	.card-item{
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		height:auto;
		padding-bottom: 10px;
		border-bottom: 1px solid #ebebeb;

	}
	// 内容行高
	.content-line-height{
		line-height: 36px;
	}
	// 展开更多
	.show-more{
		margin-top:10px;
	}

	// 分页
	.el-pagination{
		margin:10px 0 0 !important;
		text-align: right !important;
		float:right;
	}
</style>
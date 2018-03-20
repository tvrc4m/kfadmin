<template>
	<div class="topic-container">
		<div class="inline-form-box">
			<span class="form-label">用户提问</span>
			<el-form style="float:right" :inline="true" class="demo-form-inlien">
				<el-form-item>
					<el-input label="right" placehlder="用户提问"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button label="right" type="primary" icon="el-icon-search" plain>搜索</el-button>
				  </el-form-item>
			</el-form>
		</div>

		<el-button type="primary" :plain="this.cate==2" @click="changeCate(1)">法律类</el-button>
		<el-button type="primary" :plain="this.cate==1" @click="changeCate(2)">情感类</el-button>
		
		<div class="label-style">
			<el-button type="text" :class="{buttonClicked:this.params.sort==1}" @click="filter({sort:1})">最新问题</el-button>
			<el-button type="text" :class="{buttonClicked:this.params.sort==2}" @click="filter({sort:2})">最新回复</el-button>
			<el-button type="text" :class="{buttonClicked:typeof(this.params.hide_topic)=='boolean'}" @click="filter({hide_topic:hide_topic})">已隐藏问题</el-button>
			<el-button type="text" :class="{buttonClicked:typeof(this.params.hide_comment)=='boolean'}" @click="filter({hide_comment:hide_comment})">已隐藏回复</el-button>
			<span class="questioin-num">已有{{total}}个问题</span>
		</div>

		
		<el-card class="box-card" v-for="topic in topics">
		  <div class="card-item">
		  	  <div class="text item">{{topic.content}}</div>
		  	  <el-popover style="max-width: 400px;" placement="top" title="" trigger="hover" :content="topic.content">
		  	  	<el-button slot="reference" type="text">显示更多</el-button>
		  	  </el-popover>
		  	  <div class="label-style card-label" style="font-size: 14px;">
		  	  	<span>问题ID：{{topic.id}}</span>
		  	  	<span>回复时间：{{topic.question_time}}</span>
		  	  	<span>提问人: {{topic.user_name}}</span>
		  	  	<div style="float:right">
		  		  	<el-button type="text" @click="hiddenTopicClicked(topic.id)">{{topic.hidden_text}}</el-button>
		  		  	<el-button type="text" @click="topTopicClicked(topic.id)">{{topic.top_text}}</el-button>
		  		</div>
		  	  </div>
		  </div>

		</el-card>

		<!-- 分页 -->
		<pagination :total="total" :page_size="page_size" @change="changePage"></pagination>
	</div>

</template>

<script>
	import pagination from "@/components/Pagination/index"
	import {getTopicList,topTopic,hiddenTopic} from '@/api/topic'
	export default{
		components:{pagination},
		data(){
			return {
				topics:[],
				total:0,
				page_size:20,
				cate:1,
				hide_topic:false,
				hide_comment:false,
				params:{cate:1,sort:1}
			}
		},
		methods:{
			changePage(newpage){
				this.getTopic(newpage)
			},
			changeCate(cate){
				this.cate=cate
				this.filter(this.params)
			},
			getTopic(page=1){
				getTopicList({page:page}).then(data=>{
					this.topics=data.data
					this.total=data.total
					this.page_size=data.per_page
				})
			},
			filter(params={}){
				this.params=params
				this.params.cate=this.cate
				this.params.sort || 1;
				this.params.hide_topic || false;
				this.params.hide_comment || false;
				// if(typeof(this.params.cate)) 
				getTopicList(params).then(data=>{
					this.topics=data.data
					this.total=data.total
					this.page_size=data.per_page
				})
			},
			hiddenTopicClicked(topic_id){
				hiddenTopic(topic,true).then(data=>{
					console.log(data)
				})
			},
			topTopicClicked(topic_id){
				topTopic(topic_id,true).then(data=>{
					console.log(data)
				})
			}

		},
		created(){
			
		},
		mounted(){
			this.getTopic(1)
		}
	}
</script>

<style lang="scss" scoped>
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
	.item{
		line-height: 22px;
		height: 22px;
		overflow: hidden;
		font-size: 16px;
		text-overflow: ellipsis;
		white-space:nowrap;
	}

	// 分页
	.el-pagination{
		margin:10px 0 0 !important;
		text-align: right !important;
		float:right;
	}
	.buttonClicked{
		:hover,:active,:link,:visited{
			color:#000 !important;
		}
		color:#000 !important;
	}
</style>
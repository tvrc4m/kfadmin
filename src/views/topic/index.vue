<template>
	<div class="topic-container">
		<div class="inline-form-box">
			<span class="form-label">用户提问</span>
			<el-form style="float:right" :inline="true" class="demo-form-inlien">
				<el-form-item>
					<el-input style="margin-top: 5px;" label="right" v-model="word" placehlder="用户提问" @keyup.enter="search"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button label="right" type="primary" icon="el-icon-search" plain @click="search">搜索</el-button>
				  </el-form-item>
			</el-form>
		</div>

		<el-button type="primary" :plain="this.cate==2" @click="changeCate(1)">法律类</el-button>
		<el-button type="primary" :plain="this.cate==1" @click="changeCate(2)">情感类</el-button>
		
		<div class="label-style">
			<el-button type="text" :class="{buttonClicked:this.type==1}" @click="filter({type:1})">最新问题</el-button>
			<el-button type="text" :class="{buttonClicked:this.type==2}" @click="filter({type:2})">最新回复</el-button>
			<el-button type="text" :class="{buttonClicked:typeof(this.params.hide_topic)=='boolean'}" @click="filter({type:1,hide_topic:hide_topic})">已隐藏问题</el-button>
			<el-button type="text" :class="{buttonClicked:typeof(this.params.hide_comment)=='boolean'}" @click="filter({type:2,hide_comment:hide_comment})">已隐藏回复</el-button>
			<span class="questioin-num">已有{{total}}个问题</span>
		</div>

		
		<el-card class="box-card" v-for="d in data">
		  <div class="card-item">
		  	  <div class="text item">{{d.content}}</div>
		  	  <el-popover style="max-width: 400px;" placement="top" title="" trigger="hover" :content="d.content">
		  	  	<el-button slot="reference" type="text">显示更多</el-button>
		  	  </el-popover>
		  	  <div class="label-style card-label" style="font-size: 14px;" v-if="type==1">
		  	  	<span>问题ID：{{d.id}}</span>
		  	  	<span>提问时间：{{d.question_time}}</span>
		  	  	<span v-if="d.user_name">提问人: {{d.user_name}}</span>
		  	  	<div style="float:right">
		  		  	<el-button type="text" @click="hiddenClicked(d)">{{d.hidden_text}}</el-button>
		  		  	<el-button type="text" @click="topClicked(d)">{{d.top_text}}</el-button>
		  		</div>
		  	  </div>
		  	  <div class="label-style card-label" style="font-size: 14px;" v-else-if="type==2">
		  	  	<span>问题ID：{{d.topic_id}}</span>
		  	  	<span>回复时间：{{d.created_at}}</span>
		  	  	<span v-if="d.name">专家姓名: {{d.name}}</span>
		  	  	<div style="float:right">
		  		  	<el-button type="text" @click="hiddenClicked(d)">{{d.hidden_text}}</el-button>
		  		  	<el-button type="text" @click="topClicked(d)">{{d.top_text}}</el-button>
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
	import {getTopicList,topTopic,hiddenTopic,searchTopic,getCommentList,topComment,hiddenComment} from '@/api/topic'
	export default{
		components:{pagination},
		data(){
			return {
				data:[],
				total:0,
				page_size:20,
				cate:1,
				hide_topic:false,
				hide_comment:false,
				params:{cate:1,sort:1},
				word:"",
				type:1
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
			mapData(data){
				this.data=data.data.map(item=>{
					if(item.top==1){
						item.top_text='取消置顶'
					}else{
						item.top_text='置顶'
					}
					if(item.is_hide==1){
						item.hidden_text="隐藏"
					}else{
						item.hidden_text="取消隐藏"
					}
					return item
				})
				this.total=data.total
				this.page_size=data.per_page
			},
			getTopic(page=1){
				getTopicList({page:page,cate:this.cate}).then(data=>{
					this.mapData(data)
				})
			},
			getComment(page=1){
				getCommentList({page:page,cate:this.cate}).then(data=>{
					data.data.map(item=>{
						item.user_name=item.name
						item.question_time=item.created_at
						return item
					})
					this.mapData(data)
				})
			},
			filter(params={}){
				if(params.type){
					this.type=params.type
				}
				this.params=params
				this.params.cate=this.cate
				this.type || 1;
				this.params.hide_topic || false;
				this.params.hide_comment || false;

				if(this.type==2){
					getCommentList(params).then(data=>{
						data.data.map(item=>{
							item.user_name=item.name
							item.question_time=item.created_at
							return item
						})
						this.mapData(data)
					})
				}else{
					getTopicList(params).then(data=>{
						this.mapData(data)
					})
				}
			},
			hiddenClicked(topic){
				var hidden=topic.is_hide==2
				if(this.type==2){
					hiddenComment(topic.id,!hidden).then(data=>{
						if(hidden){
							topic.hidden_text='隐藏'	
						}else{
							topic.hidden_text='取消隐藏'
						}
						
					})
				}else{
					hiddenTopic(topic.id,!hidden).then(data=>{
						if(hidden){
							topic.hidden_text='隐藏'	
						}else{
							topic.hidden_text='取消隐藏'
						}
						
					})
				}
			},
			topClicked(topic){
				var istop=topic.top==1
				if(this.type==2){
					topComment(topic.id,!istop).then(data=>{
						if(istop){
							topic.top_text='置顶'	
						}else{
							topic.top_text='取消置顶'
						}
					})
				}else{
					topTopic(topic.id,!istop).then(data=>{
						if(istop){
							topic.top_text='置顶'	
						}else{
							topic.top_text='取消置顶'
						}
					})
				}
				
			},
			search(){
				if(this.word && this.word.length){
					searchTopic(this.word).then(data=>{
						this.mapData(data)
					})
				}
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
	.box-card{
		margin:10px 0;
		// &:last-child{
		// 	border-bottom: none !important;
		// }
	}
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
	.buttonClicked{
		:hover,:active,:link,:visited{
			color:#000 !important;
		}
		color:#000 !important;
	}
</style>
<template>
	<div class="matching-container">
		<!-- 匹配关系开始 -->
			<!-- 添加建议按钮 -->
			<el-button v-on:click="addClick" class="add-btn" type="primary" plain icon="el-icon-plus">添加匹配关系</el-button>
			<!-- 问题列表 -->
			<confirm ref="confirm" :confirmSuccess="delRelation"></confirm>
			<el-table :data="relations">
				<el-table-column prop="question_suggest_id" label="建议id"></el-table-column>
				<!-- <el-table-column prop="title" label="标题"></el-table-column> -->
				<el-table-column label="关联选项">
					<template slot-scope="scope">
						<div v-for="relation in scope.row.suggest_rule">
							{{relation.question_id}} - {{relation.option_id}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="96" header-align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="editRelation(scope.row.id,scope.$index)">编辑</el-button>
						<el-button type="text" @click="delConfirm(scope.row.id,scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<pagination :total="total" :page_size="page_size" @change="changePage"></pagination>
		<!-- 匹配关系结束 -->
	</div>
</template>
<script>
	import question_mixin from '@/mixin/question'
	import page_mixin from '@/mixin/page'
	import confirm_mixin from '@/mixin/confirm'
	import {getQuestionSuggestRelations,delQuestionSuggestRelation} from '@/api/question'
	import pagination from "@/components/Pagination/index"
	export default {
		components:{pagination},
		mixins:[question_mixin,page_mixin,confirm_mixin],
	    data() {
	      	return {
	      		question_collection_id:null,
	        	relations: []
	      	}
	    },
	    methods:{
    		addClick(){
    			this.$router.push({
    				name:"questionCollectionAddRelation",
    				params:{
    					type:this.type_name,
    					question_collection_id:this.question_collection_id
    				}
    			})
    		},
    		editRelation(suggest_id,index){
    			this.$router.push({
    				name:"questionCollectionEditRelation",
    				params:{
    					type:this.type_name,
    					question_collection_id:this.question_collection_id,
    					relation_id:suggest_id
    				}
    			})
    		},
    		delRelation(){
    			delQuestionSuggestRelation(this.confirm_id).then(data=>{
    				this.delSuccess()
    				this.relations.splice(this.confirm_index,1)
    			})
    		},
    		changePage(page){
    			getQuestionSuggestRelations({question_collection_id:this.question_collection_id,page:page}).then(data=>{
	    			this.relations=data.data
	    			this.refresh(data)
	    		})
    		}
    	},
    	created(){
    		this.question_collection_id=this.$route.params.question_collection_id
    	},
    	mounted(){
    		this.changePage(1)
    	}
	  }

	</script>
</script>
<style lang="scss" scoped>
	.matching-container{
		min-width: 700px;
	}
	.add-btn{
		width:100%;
	}
	// 分页
	.el-pagination{
		margin:10px 0 0 !important;
		text-align: right !important;
		float:right;
	}
</style>
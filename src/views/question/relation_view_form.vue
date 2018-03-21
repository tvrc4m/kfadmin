<template>
	<div class="matching-container">
		<!-- 匹配关系开始 -->
			<!-- 添加建议按钮 -->
			<el-button v-on:click="addClick" class="add-btn" type="primary" plain icon="el-icon-plus">添加匹配关系</el-button>
			<!-- 问题列表 -->
			<el-table
				max-height="600"
			    :data="tableData5">
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="问题一">
			            <span>C:{{ props.row.content }}</span>
			          </el-form-item>
			          <el-form-item label="问题二">
			            <span>A:{{ props.row.content }}</span>
			          </el-form-item>
			          <el-form-item label="问题三">
			            <span>A:{{ props.row.content }}</span>
			          </el-form-item>
			          <el-form-item label="问题四">
			            <span>B:{{ props.row.content }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="序列"
			      prop="id">
			    </el-table-column>
			    <el-table-column
			      label="内容"
			      prop="title">
			    </el-table-column>
			    <el-table-column label="操作" align="right" min-width="190">
		            <template slot-scope="scope">
		            <el-button
		              size="mini"
		              type="primary"
		              plain
		              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		            <el-button
		              size="mini"
		              type="danger"
		              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		          </template>
		        </el-table-column>
			</el-table>

			<!-- 分页 -->
			<!-- <pagination :total="total" :page_size="page_size" @change="changePage"></pagination> -->
			<el-pagination
			class="page-style"
			background
			layout="prev,pager,next"
			:total="100">
				
			</el-pagination>
		<!-- 匹配关系结束 -->
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	        tableData5: [{
	          id: '1',
	          title: '建议1 =',
	          content: '你无法忍受一个小心眼的人陪伴在自己左右，人一生总是要犯错的，如果犯了错得不到原谅，不仅自己很痛苦，对方也会无法释怀。所以，你很看重另一半的包容心。你应该会选择一个大度、大气的人陪伴你到老。'
	        }, {
	          id: '2',
	          title: '建议2 =',
	          content: '你无法忍受一个小心眼的人陪伴在自己左右，人一生总是要犯错的，如果犯了错得不到原谅，不仅自己很痛苦，对方也会无法释怀。所以，你很看重另一半的包容心。你应该会选择一个大度、大气的人陪伴你到老。'
	        }, {
	          id: '3',
	          title: '建议3 =',
	          content: '你无法忍受一个小心眼的人陪伴在自己左右，人一生总是要犯错的，如果犯了错得不到原谅，不仅自己很痛苦，对方也会无法释怀。所以，你很看重另一半的包容心。你应该会选择一个大度、大气的人陪伴你到老。'
	        }]
	      }
	    },
	    methods:{
    		addClick(){
    			this.$router.push({name:"questionCollectionAddRelation",params:{question_collection_id:34}})
    		},
    		handleEdit(index,row){
    			this.$router.push({name:"questionCollectionEditRelation",params:{question_collection_id:34,relation_id:row.id}})
    		}
    	},
	  }

	</script>
</script>
<style lang="scss">
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
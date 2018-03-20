<template>
	<div class="advise-container">
		<!-- 建议列表开始 -->
			<!-- 添加建议按钮 -->
			<el-button v-on:click="addClick" class="add-btn" type="primary" plain icon="el-icon-plus">添加建议</el-button>
			<!-- 问题列表 -->
			<el-table
				max-height="600"
			    :data="tableData5">
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item>
			            <span>{{ props.row.content }}</span>
			          </el-form-item>
			          <el-form-item label="关键词:">
			            <span class="key-word-css">{{ props.row.key }}</span>
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
		<!-- 建议列表结束 -->

	    <!-- <el-form-item class="block" label="序列">
	        <el-input type="text"></el-input>
	    </el-form-item>
	    <el-form-item class="block" label="内容">
	        <el-input type="text"></el-input>
	    </el-form-item>
	    <el-row style="height: 80px;">
	        
	    </el-row> -->

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
	export default {
	    data() {
	      return {
	        tableData5: [{
	          id: '1',
	          title: '能给你幸福的是懂得包容的人',
	          content: '你无法忍受一个小心眼的人陪伴在自己左右，人一生总是要犯错的，如果犯了错得不到原谅，不仅自己很痛苦，对方也会无法释怀。所以，你很看重另一半的包容心。你应该会选择一个大度、大气的人陪伴你到老。',
	          key:'感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,'
	        }, {
	          id: '2',
	          title: '能给你幸福的是懂得包容的人',
	          content: '你无法忍受一个小心眼的人陪伴在自己左右，人一生总是要犯错的，如果犯了错得不到原谅，不仅自己很痛苦，对方也会无法释怀。所以，你很看重另一半的包容心。你应该会选择一个大度、大气的人陪伴你到老。',
	          key:'感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,'
	        }, {
	          id: '3',
	          title: '能给你幸福的是懂得包容的人',
	          content: '你无法忍受一个小心眼的人陪伴在自己左右，人一生总是要犯错的，如果犯了错得不到原谅，不仅自己很痛苦，对方也会无法释怀。所以，你很看重另一半的包容心。你应该会选择一个大度、大气的人陪伴你到老。',
	          key:'感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,感性,性感,'
	        }]
	      }
	    },
	    methods:{
	    	addClick(){
	    		this.$router.push({name:"questionCollectionAddAdvise",params:{question_collection_id:34}})
	    	},
	    	handleEdit(index,row){
	    		this.$router.push({name:"questionCollectionEditAdvise",params:{question_collection_id:34,advise_id:row.id}})
	    	}
	    }

  }
</script>
<style lang="scss">
	.advise-container{
		min-width: 700px;
	}
	.add-btn{
		width:100%;
	}

	.demo-table-expand {
    	font-size: 0;
    }
    .demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
  	}
    .demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 100%;
    }
    .key-word-css{
    	color:#409EFF !important;
    }
    // 分页
    .el-pagination{
    	margin:10px 0 0 !important;
    	text-align: right !important;
    	float:right;
    }
</style>
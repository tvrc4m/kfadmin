<template>
	<div class="advise-container">
		<!-- 建议列表开始 -->
		<!-- 添加建议按钮 -->
		<el-button v-on:click="addClick" class="add-btn" type="primary" plain icon="el-icon-plus" v-if="showAdd">添加建议</el-button>
		<!-- 问题列表 -->
        <confirm ref="confirm" :confirmSuccess="delSuggest"></confirm>
		<el-table
			max-height="600"
		    :data="advise.data">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item>
		            <span>{{ props.row.content }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column label="序列" prop="sort"></el-table-column>
		    <el-table-column label="标题" prop="title"></el-table-column>
		    <el-table-column label="操作" align="right" min-width="190">
	            <template slot-scope="scope">
	            <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	            <el-button size="mini" type="danger" @click="delSuggest(scope.$index, scope.row)">删除</el-button>
	          </template>
	        </el-table-column>
		</el-table>
		<!-- 建议列表结束 -->
		<el-row>
            <pagination :total="advise.total" :page_size="advise.per_page" @change="changePage"></pagination>
        </el-row>
	</div>
</template>
<script>
    import pagination from "@/components/Pagination/index"
    import {getAdviseList,delAdvise,getRelationList} from '@/api/question'
    import question_mixin from '@/mixin/question'
    import confirm_mixin from '@/mixin/confirm'
	export default {
        components:{pagination},
        mixins:[question_mixin,confirm_mixin],
        props:{
            is_add:Boolean,
        },
		data(){
			return {
				question_collection_id:"",
				advise:{
					data:[],
					total:0,
					per_page:0,
				},
                showAdd:true
			}
		},
	    methods:{
	    	addClick(){
                console.log(this.type_name,this.question_collection_id)
	    		this.$router.push({
                    name:"questionCollectionAddAdvise",
                    params:{
                        type:this.type_name,
                        question_collection_id:this.question_collection_id
                    }
                })
	    	},
	    	handleEdit(index,row){
	    		this.$router.push({
                    name:"questionCollectionEditAdvise",
                    params:{
                        type:this.type_name,
                        question_collection_id:this.question_collection_id,
                        advise_id:row.id
                    }
                })
	    	},
	    	delSuggest(){
	    		delAdvise(this.confirm_id).then(data=>{
                    this.delSuccess()
                    this.advise.data.splice(this.confirm_index,1)
	    		})
	    	},
	    	changePage(pageIndex){
		    	getAdviseList(this.question_collection_id,pageIndex).then(data=>{
		    		this.advise=data;
		    	})
	    	}
	    },
	    created(){
            console.log('route',this.$route)
	    	this.question_collection_id=this.$route.params.question_collection_id;
            console.log('type_name',this.type_name,this.type)
	    },
        mounted(){
	    	getAdviseList(this.question_collection_id,1).then(data=>{
	    		console.log(111232,data);
	    		this.advise=data;
                if(this.type==3 && this.advise.data.length>=2) this.showAdd=false
	    	}).catch(e=>{
	    		console.log(e)
	    	})
	    }

    }
</script>
<style lang="scss" scoped>
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
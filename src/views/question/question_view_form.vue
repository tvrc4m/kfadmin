<template>
	<div class="questionContainer">
		<el-button type="primary" plain class="add-btn" @click="addClick">主要按钮</el-button>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="序列" type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="name" label="内容">
			</el-table-column>
			<el-table-column prop="address" label="操作" align="right" >
				<template slot-scope="scope">
					<el-button @click="" type="text" size="small">编辑</el-button>
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
					<el-button @click="upClick(scope.$index,tableData)" type="text" size="small">上移</el-button>
					<el-button @click="downClick(scope.$index,tableData)" type="text" size="small">下移</el-button>
				</template>
			</el-table-column>
    	</el-table>
	</div>
</template>

<script>
    import {getQuestionList} from '@/api/question'
	export default{
		data(){
			return {
				question_collection_id:"",
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎1',
		            address: '上海市普陀区金沙江路 1518 弄'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎2',
		            address: '上海市普陀区金沙江路 1517 弄'
		          }, {
		            date: '2016-05-01',
		            name: '王小虎3',
		            address: '上海市普陀区金沙江路 1519 弄'
		          }, {
		            date: '2016-05-03',
		            name: '王小虎4',
		            address: '上海市普陀区金沙江路 1516 弄'
		          }]
			}
		},
		methods:{
			addClick(){
				this.$router.push({name:"questionCollectionEditQuestion"})
			},
			indexMethod(index) {
				return index+1;
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			upClick(index,rows){
				if(index>0){
					let row=rows[index];
					rows.splice(index, 1);
					rows.splice(index-1,0,row);
				}else{
					alert('您已经在最顶部了')
				}
			},
			downClick(index,rows){
				if(index+1<rows.length){
					let row=rows[index];
					rows.splice(index, 1);
					console.log(index);
					// rows.splice(index,0,row);
				}else{
					alert('您已经在最底部了')
				}
			},
		},
        created(){
			this.question_collection_id=this.$route.params.id;
		},
        mounted(){
			console.log(4,this.question_collection_id);
			getQuestionList(this.question_collection_id).then(data=>{
				console.log(3,data);
			})
		}
	}
</script>

<style>
	.add-btn{
		width: 100%;
	}
</style>
<template>
	<div class="questionContainer">
		<el-button type="primary" plain class="add-btn" @click="addClick">添加问题</el-button>
	<el-table max-height="600" :data="question.data">
          <el-table-column type="expand" prop="question_option">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="item in props.row.question_option">
                  <span class="key-word-css">{{item.optionLetter}}、{{ item.options}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
			<el-table-column prop="date" label="序列" type="index" :index="indexMethod">
			</el-table-column>
          <el-table-column label="内容" prop="title">
          </el-table-column>
			<el-table-column prop="address" label="操作" align="right" >
				<template slot-scope="scope">
					<el-button @click.native.prevent="editClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click.native.prevent="deleteRow(scope.$index,scope.row)" type="text" size="small">删除</el-button>
					<el-button @click.native.prevent="upClick(scope.$index)" type="text" size="small">上移</el-button>
					<el-button @click.native.prevent="downClick(scope.$index)" type="text" size="small">下移</el-button>
				</template>
			</el-table-column>
      </el-table>

        <el-row>
            <pagination :total="question.total" :page_size="question.per_page" @change="changePage"></pagination>
        </el-row>
	</div>
</template>

<script>
    import pagination from "@/components/Pagination/index"
    import {getQuestionList,delQuestion} from '@/api/question'
	export default{
        components:{pagination},
		data(){
			return {
				question_collection_id:"",
				question:{
					data:[],
					total:0,
					per_page:0,
				}
			}
		},
		methods:{
            changePage(pageIndex){
				getQuestionList(this.question_collection_id).then(data=>{
					this.question=data;
				}).catch(error=>{
                        console.log(error)
                    }
                )
            },
			addClick(){
				this.$router.push({name:"questionCollectionAddQuestion",params:{question_collection_id:this.question_collection_id}})
			},
			indexMethod(index) {
				return index+1;
			},
			editClick(row){
				console.log(row);
				this.$router.push({name:"questionCollectionEditQuestion",params:{question_collection_id:this.question_collection_id,question_id:row.id}})
			},
			deleteRow(index,row) {
				this.question.data.splice(index, 1);
				delQuestion(row.id)
			},
			upClick(index){
				if(index>0){
					let row=this.question.data[index];
					this.question.data.splice(index, 1);
					this.question.data.splice(index-1,0,row);
				}else{
					alert('您已经在最顶部了')
				}
			},
			downClick(index){
				if(index+1<this.question.data.length){
					let row=this.question.data[index];
					this.question.data.splice(index, 1);
					this.question.data.splice(index+1,0,row);
				}else{
					alert('您已经在最底部了')
				}
			},
		},
        created(){
			this.question_collection_id=this.$route.params.question_collection_id;
		},
        mounted(){
			getQuestionList(this.question_collection_id).then(data=>{
				this.question=data;
				console.log(3333,this.question)
			})
		}
	}
</script>

<style>
	.add-btn{
		width: 100%;
	}
</style>
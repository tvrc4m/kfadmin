<template>
	<div class="questionContainer">
		<el-button type="primary" plain class="add-btn" @click="addClick">添加问题</el-button>
        <confirm ref="confirm" :confirmSuccess="delQ"></confirm>
    	<el-table max-height="600" :data="question.data">
            <el-table-column type="expand" prop="question_option">
                <template slot-scope="props">
                    <div class="demo-table-expand">
                        <p v-for="item in props.row.question_option">{{item.optionLetter}}. {{ item.options}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="序列" type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column label="内容" prop="title"></el-table-column>
            <el-table-column prop="address" label="操作" align="right" >
                <template slot-scope="scope">
            		<el-button @click.native.prevent="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
            		<el-button @click.native.prevent="delConfirm(scope.row.id,scope.$index)" type="text" size="small">删除</el-button>
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
    import {getQuestionList,delQuestion,sortQuestion} from '@/api/question'
    import question_mixin from '@/mixin/question'
    import confirm_mixin from '@/mixin/confirm'
	export default{
        components:{pagination},
        mixins:[question_mixin,confirm_mixin],
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
				this.$router.push({name:"questionCollectionAddQuestion",params:{type:this.type_name,question_collection_id:this.question_collection_id}})
			},
			indexMethod(index) {
				return index+1;
			},
			editClick(question_id){
				this.$router.push({name:"questionCollectionEditQuestion",params:{type:this.type_name,question_collection_id:this.question_collection_id,question_id:question_id}})
			},
			delQ() {
                delQuestion(this.confirm_id).then(data=>{
                    this.delSuccess()
    				this.question.data.splice(this.confirm_index, 1);
	    		})
			},
            resort(){
                var exchange=[]
                this.question.data.map((item,index)=>{
                    item.sort=index*5
                    exchange.push({question_id:item.id,sort:item.sort})
                })
                sortQuestion({question_sort:exchange}).then(data=>{
                    console.log("sort",data)
                })
                console.log("exchange",exchange)
            },
			upClick(index){
				if(index>0){
					let row=this.question.data[index];
					this.question.data.splice(index, 1);
					this.question.data.splice(index-1,0,row);
                    this.resort()
				}else{
                    this.$message({
                        message:"您已经在最顶部了",
                        type:"warning"
                    })
				}
			},
			downClick(index){
				if(index+1<this.question.data.length){
					let row=this.question.data[index];
					this.question.data.splice(index, 1);
					this.question.data.splice(index+1,0,row);
                    this.resort()
				}else{
                    this.$message({
                        message:"您已经在最底部了",
                        type:"warning"
                    })
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

<style lang="css" scoped>
	.add-btn{
		width: 100%;
	}
    .key-word-css{
    }
</style>
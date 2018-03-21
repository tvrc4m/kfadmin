<template>
    <div class="cate-container">
        <el-form :inline="true">
            <el-button type="primary" size="mini" @click="showDialog" style="margin-bottom: 15px;text-align: right;">新增案例分类</el-button>
            <el-card class="box-card" v-for="(item,index) in cates">
                <el-form-item label="分类名称" class="block" style="margin-bottom:0px;">
                    <el-input type="text" v-model="item.name"></el-input>
                </el-form-item>
                <el-button style="margin-right: 15px;margin-top: 5px;" type="warning" size="mini" @click="saveCate(item.id)">修改</el-button>
                <el-button style="margin-right: 15px;margin-top: 5px;" type="warning" size="mini" @click="delCate(item.id,index)">删除</el-button>
            </el-card>
        </el-form>
        <el-dialog title="新增案例分类" :visible.sync="showAddDialog" width="300">
            <el-form :inline="true">
                <el-form-item class="block" label="分类名称" placeholder="">
                    <el-input type="text" v-model="cate.name"></el-input>
                </el-form-item>
                <el-button class="block" type="warning" @click="addCate">确定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getCaseCateList,addCaseCate,editCaseCate,delCaseCate} from '@/api/case'
	export default{
		data(){
			return {
                activied:[],
                cates:[],
                cate:{
                    name:'',
                },
                showAddDialog:false

			}
		},
        methods:{
            saveCate(cate_id){
                var cate=this.cates.filter(item=>item.id==cate_id)
                if(cate.length){
                    if(!cate[0].name || !cate[0].name.length){
                        this.$message({
                            message:"分类名称不能为空",
                            type:"warning"
                        })
                        return false
                    }
                    editCaseCate(cate_id,cate[0]).then(data=>{
                        this.$message({
                            message:"保存成功",
                            type:"success"
                        })
                    })
                }
                
            },
            showDialog(){
                this.showAddDialog=true
            },
            addCate(){
                addCaseCate(this.cate).then(data=>{
                    this.$message({
                        message:"新增成功",
                        type:"success"
                    })
                    this.showAddDialog=false
                    this.cates.push(data)
                    this.activied.push(data.id)
                })
            },
            delCate(cate_id,index){
                delCaseCate(cate_id).then(data=>{
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                    this.cates.splice(this.cates[index],1)
                    this.activied.splice(this.activied[index],1)
                })

            }
        },
		mounted(){
			getCaseCateList().then(data=>{
                this.cates=data
                this.cates.forEach(item=>this.activied.push(item.id))
			})
		}
	}
</script>
<template>
    <div class="factor-container">
        <el-form :inline="true">
            <el-button type="primary" size="mini" @click="showDialog" style="margin-bottom: 15px;text-align: right;">新增案例要素</el-button>
            <el-collapse v-model="activied" :accordion="false" style="width: 100%">
                <el-collapse-item v-for="(item,index) in factors" :title="item.name" :name="item.id">
                    <el-form-item label="要素名称" class="block">
                        <el-input type="text" v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型权重">
                        <el-input-number :min="0" :max="100" :step="10" size="small" v-model="item.weight"></el-input-number>
                    </el-form-item>
                    <el-form-item class="block" label="要素个数" placeholder="要素个数">
                        <el-input type="text" v-model="item.count"></el-input>
                    </el-form-item>
                    <el-button style="margin-right: 15px;margin-bottom: 5px;" type="warning" size="mini" @click="saveFactor(item.id)">修改</el-button>
                </el-collapse-item>
            </el-collapse>
        </el-form>
        <el-dialog title="新增案例要素" :visible.sync="showAddDialog" width="300">
            <el-form :inline="true">
                <el-form-item class="block" label="要素名称" placeholder="">
                    <el-input type="text" v-model="factor.name"></el-input>
                </el-form-item>
                <el-form-item class="block" label="类型权重">
                    <el-input-number :min="0" :max="100" :step="10" size="small" v-model="factor.weight"></el-input-number>
                </el-form-item>
                <el-form-item class="block" label="要素个数" placeholder="">
                    <el-input type="text" v-model="factor.count"></el-input>
                </el-form-item>
                <el-button class="block" type="warning" @click="addFactor">确定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {getCaseFactors,addCaseFactor,editCaseFactor} from "@/api/case"
    export default{
        data(){
            return {
                activied:[],
                factors:[],
                factor:{
                    name:'',
                    id:'',
                    weight:50,
                    count:''
                },
                showAddDialog:false
            }
        },
        methods:{
            saveFactor(factor_id){
                var factor=this.factors.filter(item=>item.id==factor_id)
                if(factor.length){
                    if(!factor[0].name || !factor[0].name.length){
                        this.$message({
                            message:"要素名称不能为空",
                            type:"warning"
                        })
                        return false
                    }
                    if(factor[0].weight.toString().indexOf('.')!=-1){
                        this.$message({
                            message:"类型权重不能为小数",
                            type:"warning"
                        })
                        return false
                    }
                    if(factor[0].count<0){
                        this.$message({
                            message:"要素个数不能小于0",
                            type:"warning"
                        })
                        return false
                    }else if(factor[0].count.toString().indexOf('.')!=-1){
                        this.$message({
                            message:"要素个数不能为小数",
                            type:"warning"
                        })
                        return false
                    }
                    editCaseFactor(factor_id,factor[0]).then(data=>{
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
            addFactor(){
                addCaseFactor(this.factor).then(data=>{
                    this.$message({
                        message:"新增成功",
                        type:"success"
                    })
                    this.showAddDialog=false
                    this.factors.push(data)
                    this.activied.push(data.id)
                })
            }
        },
        mounted(){
            getCaseFactors().then(data=>{
                this.factors=data
                this.factors.forEach(item=>this.activied.push(item.id))
            })
        }
    }
</script>
<style lang="css" scoped>
    .block{
        display: block;
    }
</style>
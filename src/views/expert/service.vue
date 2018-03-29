<template>
    <div class="service-container">
        <confirm ref="confirm" :confirmSuccess="del"></confirm>
        <el-tabs v-model="tab" @tab-click="changeCate">
            <el-tab-pane label="法律服务" name="legal">
                <el-form :inline="true">
                    <el-button type="primary" size="mini" @click="showDialog" style="margin-bottom: 15px;text-align: right;">新增法律服务</el-button>
                    <el-card class="box-card" v-for="(item,index) in services" style="margin-bottom: 10px">
                        <el-form-item label="服务名称">
                            <el-input type="text" style="width: 350px" v-model="item.name"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-checkbox v-model="item.stat" :true-label="1" :false-label="0">上线</el-checkbox>
                        </el-form-item>
                        <el-button style="margin: 5px 15px 5px;" type="warning" size="mini" @click="save(index)">修改</el-button>
                        <el-button style="margin: 5px 15px 5px;" type="danger" size="mini" @click="delConfirm(item.id,index)">删除</el-button>
                    </el-card>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="情感服务" name="emotion">
                <el-form :inline="true">
                    <el-button type="primary" size="mini" @click="showDialog" style="margin-bottom: 15px;text-align: right;">新增情感服务</el-button>
                    <el-card class="box-card" v-for="(item,index) in services" style="margin-bottom: 10px">
                        <el-form-item label="服务名称">
                            <el-input type="text" style="width: 350px" v-model="item.name"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-checkbox v-model="item.stat" :true-label="1" :false-label="0">上线</el-checkbox>
                        </el-form-item>
                        <el-button style="margin: 5px 15px 5px;" type="warning" size="mini" @click="save(index)">修改</el-button>
                        <el-button style="margin: 5px 15px 5px 0;" type="danger" size="mini" @click="delConfirm(item.id,index)">删除</el-button>
                    </el-card>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="新增服务" :visible.sync="showAddDialog" width="300">
            <el-form :inline="true">
                <el-input type="hidden" v-model="service.cate"></el-input>
                <el-form-item label="服务名称" placeholder="">
                    <el-input type="text" v-model="service.name"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="service.stat" :true-label="1" :false-label="0">上线</el-checkbox>
                </el-form-item>
                <el-button class="block" type="warning" @click="add">确定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {getAdminServices,addService,editService,delService} from "@/api/expert"
    import confirm_mixin from '@/mixin/confirm'
    export default{
        mixins:[confirm_mixin],
        data(){
            return {
                tab:'legal',
                cate:1,
                services:[],
                service:{
                    name:'',
                    id:'',
                    cate:1,
                    stat:1,
                },
                showAddDialog:false
            }
        },
        methods:{
            changeCate(){
                if(this.tab=='legal'){
                    this.cate=1
                    this.service.cate=1
                }else{
                    this.cate=2
                    this.service.cate=2
                }
                this.getCateService()
            },
            save(index){
                var service=this.services[index]
                if(service){
                    if(!service.name || !service.name.length){
                        this.$message({
                            message:"服务名称不能为空",
                            type:"warning"
                        })
                        return false
                    }
                    editService(service.id,service).then(data=>{
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
            add(){
                addService(this.service).then(data=>{
                    this.$message({
                        message:"新增成功",
                        type:"success"
                    })
                    this.showAddDialog=false
                    this.service.name=''
                    console.log(data,this.services)
                    this.services.push(data)
                })
            },
            del(){
                delService(this.confirm_id).then(data=>{
                    this.delSuccess()
                    this.services.splice(this.confirm_index,1)
                })
            },
            getCateService(){
                getAdminServices({cate:this.cate}).then(data=>{
                    this.services=data.data
                    // this.services.forEach(item=>item.status=item.stat==1)
                })
            }
        },
        mounted(){
            this.getCateService()
        }
    }
</script>
<style lang="css" scoped>
    .block{
        display: block;
    }
</style>
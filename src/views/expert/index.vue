<template>
    <div class="emotion">
        <el-row :span="24" class="emotion-header">
            <el-col :span="6">
                <el-select v-model="expert_type" placehoder="选择专家类型" @change="getExpertByType">
                    <el-option v-for="type in expert_types" :label="type.label" :value="type.id" :key="type.id"></el-option>
                </el-select>
                <router-link to="/expert/add">
                    <el-button type="primary" size="small">添加新专家</el-button>
                </router-link>
            </el-col>
            <el-col :span="18">
                <div class="right">
                    共<span v-text="total"></span>条数据
                </div>
            </el-col>
        </el-row>
        <confirm :confirmSuccess="delPro"></confirm>
        <el-table :data="experts" stripe style="width=100%">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="job" label="职业"></el-table-column>
            <el-table-column prop="remark" label="擅长"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="editPro(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    import {getExpertList,delExpert} from '@/api/expert'
    import {mapState} from 'vuex'
    export default{
        components:{confirm},
        data(){
            return {
                expert_types:[
                    {
                        id:1,
                        label:"法律专家"
                    },
                    {
                        id:2,
                        label:"情感专家"
                    }
                ],
                expert_type:null,
                experts:[],
                total:10,
                deleted:false,
                current_id:0
            }
        },
        methods:{
            editPro:function(id){
                this.$router.push({name:"expertEdit",params:{id:id}});
            },
            delPro:function(){
                delExpert(this.current_id).then(response=>{
                    this.experts=this.experts.filter(item=>item.id!=this.current_id);
                    this.$store.commit('CONFIRM_DIALOG',false)
                })
            },
            delConfirm:function(id){
                this.current_id=id;
                this.$store.commit('CONFIRM_DIALOG',true)
            },
            getExpertByType(){
                console.log({type:this.expert_type})
                getExpertList({type:this.expert_type}).then(response=>{
                    this.experts=response.data.data
                    this.total=response.data.total
                })
            }
        },
        mounted(){
            getExpertList().then(response=>{
                this.experts=response.data.data
                this.total=response.data.total
            })
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .emotion{
        margin:10px 15px;
    }
    .emotion-header{
        .right{
            text-align:right;
        }
    }
</style>
<template>
    <div class="emotion">
        <el-row :span="24" class="emotion-header">
            <el-select v-model="expert_type" placehoder="选择专家类型" @change="getExpertByType(1)">
                <el-option v-for="type in expert_types" :label="type.label" :value="type.id" :key="type.id"></el-option>
            </el-select>
            <router-link to="/expert/add">
                <el-button type="primary" size="small">添加新专家</el-button>
            </router-link>
            <span class="text right">
                共<span v-text="total"></span>条数据
            </span>
        </el-row>
        <confirm :confirmSuccess="delPro"></confirm>
        <el-table :data="experts" stripe style="width=100%">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="job" label="职业" :formatter="formatJob"></el-table-column>
            <el-table-column prop="good_at" label="擅长" :formatter="formatGoodat"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="editPro(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="total" :page_size="page_size" @change="changePage"></pagination>
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    import pagination from "@/components/Pagination/index"
    import {getExpertList,delExpert} from '@/api/expert'
    import {mapState} from 'vuex'
    export default{
        components:{confirm,pagination},
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
                expert_type:1,
                experts:[],
                total:10,
                deleted:false,
                current_id:0,
                total:0,
                page_size:20
            }
        },
        methods:{
            editPro:function(id){
                this.$router.push({name:"expertEdit",params:{id:id}});
            },
            delPro:function(){
                delExpert(this.current_id).then(data=>{
                    this.experts=this.experts.filter(item=>item.id!=this.current_id);
                    this.$store.commit('CONFIRM_DIALOG',false)
                })
            },
            delConfirm:function(id){
                this.current_id=id;
                this.$store.commit('CONFIRM_DIALOG',true)
            },
            getExpertByType(page){
                getExpertList({type:this.expert_type,page:page}).then(data=>{
                    this.experts=data.data
                    console.log(data)
                    console.log(this.experts)
                    this.total=data.total
                    this.page_size=data.per_page
                })
            },
            changePage(page=1){
                this.getExpertByType(page)
            },
            formatJob(row,column,cellValue){
                if(cellValue && cellValue.name){
                    return cellValue.name
                }
            },
            formatGoodat(row,column,cellValue){
                var str=""
                cellValue.forEach(item=>str+=item.name)
                return str
            }
        },
        mounted(){
            this.getExpertByType()
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .emotion{
        margin:10px 15px;
    }
    .emotion-header{
        .right{
            float:right;
        }
        .text{
            font-size:14px;
            line-height:22px;
        }
    }
</style>
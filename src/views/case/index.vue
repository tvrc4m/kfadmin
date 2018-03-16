<template>
    <div class="case-container">
        <confirm :confirmSuccess="delCase"></confirm>
        <el-form :model="filter" :inline="true">
            <el-select v-model="filter.case_cate_id" placehoder="案例类型" clearable>
                <el-option v-for="cat in cats" :key="cat.id" :label="cat.name" :value="cat.id"></el-option>
            </el-select>
            <el-date-picker v-model="filter.case_date" placeholder="判决时间" type="month" value-format="yyyy-MM-01 00:00:00"></el-date-picker>
            <el-select v-model="filter.is_breakup" placeholder="判决结果" clearable>
                <el-option label="不离" value="0"></el-option>
                <el-option label="离婚" value="1"></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="changePage">筛选</el-button>
            <router-link to="/case/add">
                <el-button type="primary" size="small">添加案例</el-button>
            </router-link>
            <router-link to="/case/factor">
                <el-button type="primary" size="small">管理案例要素</el-button>
            </router-link>
        </el-form>
        <el-table :data="cases">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="案例名称"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editCase(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delConfirm(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="total" :page_size="page_size" @change="changePage"></pagination>
    </div>
</template>
<script>
    import {getCaseList,delCase,getCaseCat} from '@/api/case'
    import pagination from "@/components/Pagination/index"
    import confirm from "@/components/Confirm/dialog"
    export default{
        components:{confirm,pagination},
        data(){
            return {
                filter:{
                    case_date:'',
                    case_cate_id:'',
                    is_breakup:'',
                    page:1
                },
                cats:[],
                cases:[],
                total:0,
                page_size:20,
                current_id:0
            }
        },
        methods:{
            changePage(new_page=1){
                this.filter.page=new_page
                getCaseList(this.filter).then(data=>{
                    this.cases=data.data
                    this.total=data.total
                    this.page_size=data.per_page
                })
            },
            editCase(case_id){
                this.$router.push({name:"caseEdit",params:{case_id:case_id}})
            },
            delConfirm(case_id){
                this.current_id=case_id
                this.$store.commit('CONFIRM_DIALOG',true)
            },
            delCase(){
                delCase(this.current_id).then(data=>{
                    this.cases=this.cases.filter(item=>item.id!=this.current_id)
                    this.$store.commit('CONFIRM_DIALOG',false)
                })
            }
        },
        mounted(){
            this.changePage()
            getCaseCat().then(data=>{
                this.cats=data
            })
        }
    }
</script>
<template>
    <div class="case-container">
        <el-from :model="filter" :inline="true">
            <el-select v-model="filter.case_type" placehoder="案例类型">
                <el-option v-for="type in case_types" :key="type.id" :label="type.name" :value="type.id"></el-option>
            </el-select>
            <el-date-picker v-model="filter.case_date" placeholder="判决时间" type="month"></el-date-picker>
            <el-select v-model="filter.case_stat" placeholder="判决结果">
                <el-option v-for="stat in case_stats" :key="stat.id" :label="stat.name" :value="stat.id"></el-option>
            </el-select>
            <el-button type="primary" size="small">筛选</el-button>
            <router-link to="/case/add">
                <el-button type="primary" size="small">添加案例</el-button>
            </router-link>
        </el-from>
        <el-table :data="cases">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="案例名称"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                filter:{
                    case_type:'',
                    case_date:'',
                    case_stat:''
                },
                case_types:[
                    {
                        id:1,
                        name:"财产纠纷"
                    },
                    {
                        id:2,
                        name:"经济纠纷"
                    }
                ],
                case_stats:[],
                cases:[
                    {
                        id:1,
                        name:'离婚案例1'
                    }
                ],
            }
        }
    }
</script>
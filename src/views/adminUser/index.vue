<template>
    <div class="user-container">
        <el-row>
            <router-link to="/admin/user/add">
                <el-button type="primary" icon="el-icon-plus" size="small">添加后台账户</el-button>
            </router-link>
        </el-row>
        <confirm :confirmSuccess="delUser"></confirm>
        <el-table :data="users">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="create_user" label="添加人"></el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="管理" header-align="center" width="90">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editUser(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delConfirm(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import confirm from "@/components/Confirm/dialog"
    import {getAdminUserList,delAdminUser} from '@/api/admin'
    export default{
        components:{confirm},
        data(){
            return {
                users:[],
                confirm_id:0,
                total:0
            }
        },
        computed:{
        },
        methods:{
            editUser(admin_user_id){
                this.$router.push({name:"adminUserEdit",params:{admin_user_id:admin_user_id}})
            },
            delUser(){
                delAdminUser(this.confirm_id).then(response=>{
                    this.users=this.users.filter(item=>item.id!=this.confirm_id)
                    this.$store.commit('CONFIRM_DIALOG',false)
                })
            },
            delConfirm(admin_user_id){
                this.confirm_id=admin_user_id
                this.$store.commit('CONFIRM_DIALOG',true)
            }
        },
        mounted(){
            getAdminUserList().then(response=>{
                this.users=response.data.data
                this.total=response.data.total
            })
        }
    }
</script>
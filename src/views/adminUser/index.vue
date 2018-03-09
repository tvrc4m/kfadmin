<template>
    <div class="user-container">
        <el-row>
            <router-link to="/admin/user/add">
                <el-button type="primary" icon="el-icon-plus" size="small">添加后台账户</el-button>
            </router-link>
        </el-row>
        <confirm :confirmSuccess="delAdminUser"></confirm>
        <el-table :data="users">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="账号"></el-table-column>
            <el-table-column prop="add_user" label="添加人"></el-table-column>
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
    export default{
        components:{confirm},
        data(){
            return {
                users:[
                    {
                        id:2,
                        name:"tvrc4m",
                        add_user:"魏山",
                        created_at:'2018-4-9',
                    },
                    {
                        id:7,
                        name:"vte",
                        add_user:"魏山",
                        created_at:'2018-5-9',
                    }
                ],
                confirm_id:0
            }
        },
        computed:{
        },
        methods:{
            editUser(admin_user_id){
                this.$router.push({name:"adminUserEdit",params:{admin_user_id:admin_user_id}})
            },
            delAdminUser(){
                console.log(this.confirm_id)
                this.$store.commit('CONFIRM_DIALOG',false)
            },
            delConfirm(admin_user_id){
                this.confirm_id=admin_user_id
                this.$store.commit('CONFIRM_DIALOG',true)
            }
        }
    }
</script>
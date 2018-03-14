<template>
    <el-dialog title="" width="200" :modal="false" center :visible.sync="$store.state.app.confirm">
        <span class="text-center">是否确认要删除?</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConfrim">取消</el-button>
        <el-button type="primary" @click="confirmSuccess">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default{
        props:{
            confirmSuccess:{
                type:Function,
                required:true
            }
        },
        methods:{
            cancelConfrim:function(){
                this.$store.commit("CONFIRM_DIALOG",false)
            },
            delConfirm:function(){
                this.$store.commit("CONFIRM_DIALOG",true)  
            },
            closeConfirm:function(){
                this.$store.commit("CONFIRM_DIALOG",false)  
            },
            showConfirm:function(){
              this.$store.commit("CONFIRM_DIALOG",true)    
            }
        }
    }
</script>
<style lang="css">
    .text-center{
        text-align: center !important;
        display: inline-block !important;
        width: 100%;
    }
</style>

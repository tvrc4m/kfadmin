<template>
    <el-popover ref="del-confirm" placement="top" width="200" v-model="$store.state.app.confirm">
        <p>是否确认要删除?</p>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="confirmClose">取消</el-button>
            <el-button type="primary" size="mini" @click="confirmSuccess">确定</el-button>
        </div>
    </el-popover>
</template>
<script>
    import {mapState} from 'vuex'
    export default{
        props:{
            confirmSuccess:{
                type:Function,
                required:true
            }
        },
        data(){
            return {}
        },
        methods:{
            confirmClose:function(){
                this.$store.commit("CONFIRM_DIALOG",false)
            }
        }
    }
</script>
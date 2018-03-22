import confirm from "@/components/Confirm/dialog"
export default {
    components:{confirm},
    data(){
        return {
            confirm_id:0,
            confirm_index:null
        }
    },
    methods:{
        delConfirm(id,index){
            this.confirm_id=id
            this.confirm_index=index
            this.$refs.confirm.showConfirm()
        },
        delSuccess(){
            this.$message({message:"删除成功",type:"success"})
            this.$refs.confirm.closeConfirm()
        }
    }
}
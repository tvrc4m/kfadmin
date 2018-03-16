<template>
    <el-row style="float: right;margin: 15px 5px 0 0;" v-if="total>page_size">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="changePage"></el-pagination>
    </el-row>
</template>
<script>
    export default{
        props:{
            total:{
                type:Number,
                default:0
            },
            page_size:{
                type:Number,
                default:20
            }
        },
        data(){
            return {
                current_page:0
            }
        },
        watch:{
            current_page(page){
                this.$emit("change",page)
            }
        },
        methods:{
            changePage(new_page){
                this.current_page=new_page
            }
        }
    }
</script>
<template>
    <el-form class="law-form" :inline="true" >
        <el-form-item label="法律全称" class="block" required :show-message="true">
            <el-input v-model="law.title" placeholder="法律全称" class="law-input"></el-input>
        </el-form-item>
        <el-form-item label="法律简称" class="block" required >
            <el-input type="textarea" v-model="law.content" :rows="10" placeholder="法律简称" class="law-input"></el-input>
        </el-form-item>
        <el-form-item label="拼音简写" class="block" required>
            <el-input type="text" v-model="law.alias" class="law-input" placeholder="拼音简写"></el-input>
        </el-form-item>
        <el-row type="flex" justify="center" style="width:560px;">
                <el-button type="primary" @click="addProfessional">添加</el-button>        
        </el-row>
    </el-form>
</template>
<script>
    export default{
        name:"professional-add",
        data(){
            return {
                law:{
                    title:"",
                    content:"",
                    alias:''
                }
            }
        },
        computed:{
            
        },
        methods:{
            
        }
    }
</script>
<style lang="scss" scoped>
    .law-form{
        width:100%;
    }
    .law-content{
        width:100%;
    }
    .law-input{
        width:500px;
    }
    .block{
        display:block;
    }
</style>
<template>
    <el-container>
        <el-select v-model="law_type" placeholder="选择法规类型">
            <el-option v-for="law in laws" :key="law.alias" :value="law.alias" :label="law.name"></el-option>
        </el-select>
    </el-container>
</template>
<script>
    export default {
        data(){
            return {
                laws:[
                {
                    alias:"law",
                    name:"中国婚姻法"
                },
                {
                    alias:"xingfa",
                    name:"中国刑法"
                }],
                law_type:"law"
            }
        }
    }
</script>
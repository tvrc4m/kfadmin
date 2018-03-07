<template>
    <el-form-item label="擅长">
            <el-cascader class="block" :options="keywords" filterable clearabel placeholder="选择关键词" v-model="kv" expand-trigger="hover" @change="changeKeyword"></el-cascader>
            <el-tag v-for="k in kvlist" :key="k" :closable="true" type="success" @close="removeKeyword(k)">{{k}}</el-tag>
        </el-form-item>
</template>
<script>
    export default{
        props:{
            keywords:{
                type:Array,
                required:true
            },
            kvlist:{
                type:Array,
                required:false,
                default(){
                    return [];
                }
            }
        },
        data(){
            return {
                kv:null
            }
        },
        methods:{
            changeKeyword:function(value){
                var target=this.kvlist.filter(item=>item==value.join("/"))
                if(target.length==0)
                    this.kvlist.push(value.join("/"))
            },
            removeKeyword:function(value){
                this.kvlist=this.kvlist.filter(item=>item!=value)
            }
        }
    }
</script>
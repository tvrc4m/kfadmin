<template>
    <div class="option-container">
        <span class="name">{{name}}</span>
        <el-input type="text"></el-input>
        <el-row>
            <el-col :span="4">
                <span class="name">关键词</span>
            </el-col>
            <el-col :span="10">
                <el-tag v-for="kv in selected_keywords" :key="kv.id" closable type="success" @close="removeKeyword(kv)"></el-tag>
                <el-cascader :options="keywords" @chnage="addKeyword"></el-cascader>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        props:{
            name:{
                type:String,
                required:true
            },
            keywords:{
                type:Array,
                required:true
            },
            selected_keywords:{
                type:Array,
                required:false
            }
        },
        methods:{
            addKeyword:function(value){
                this.selected_keywords.push(value.join("/"))
            },
            removeKeyword:function(value){
                this.selected_keywords=this.selected_keywords.filter(item=>item!=value)
            }
        }        
    }
</script>
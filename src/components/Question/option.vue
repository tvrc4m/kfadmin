<template>
    <div class="option-container">
        <el-form :inline="true">
            <el-form-item :label="alpha[index]" style="width: 100%">
                <el-input style="display: inline-block;width:618px;" type="text" v-model="option.name"></el-input>
                <el-button style="float: right" type="text" icon="el-icon-del" @click="removeOption">删除</el-button>
            </el-form-item>
            <el-form-item label="权重">
                <el-input style="width:600px;" type="text" v-model="option.weight"></el-input>
            </el-form-item>
            <el-row>
               <keywords :keywords.sync="option.keyword" label="匹配词"></keywords>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    export default{
        components:{keywords},
        props:{
            option:{
                type:Object,
                required:true,
                default:function(){
                    return {
                        id:null,
                        name:"",
                        weight:0,
                        keyword:[]
                    }
                }
            },
            index:{
                type:Number,
                required:true,
                default:0
            }
        },
        data(){
            return {
                alpha:['A','B','C','D','E','F']
            }
        },
        methods:{
            removeOption(){
                this.$emit("remove-option",this.index)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-cascader,.el-input__inner{
        width:586px !important;
    }
</style>
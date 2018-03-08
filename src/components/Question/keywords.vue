<template>
    <el-form-item :label="label">
            <el-cascader class="block" :options="keywords" filterable clearabel placeholder="选择关键词" v-model="kv" expand-trigger="hover" @change="changeKeyword"></el-cascader>
            <el-tag v-for="k in kvlist" :key="k" :closable="true" type="success" @close="removeKeyword(k)">{{k}}</el-tag>
        </el-form-item>
</template>
<script>
    export default{
        props:{
            label:{
                type:String,
                required:true,
                default:"关键词"
            },
            selected:{
                type:Array,
                required:false,
                default(){
                    return [];
                }
            }
        },
        data(){
            return {
                kv:null,
                keywords:[
                    {
                        label:"法律",
                        value:"law",
                        children:[
                            {
                                label:'婚姻法',
                                value:"hunyin"
                            },
                            {
                                label:"民事法",
                                value:'minshi'
                            }
                        ]
                    }
                ],
                kvlist:this.selected
            }
        },
        methods:{
            changeKeyword:function(value){
                console.log(value)
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
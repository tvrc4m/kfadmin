<template>
    <el-form-item :label="label">
        <el-cascader style="display: block" :options="factors" :show-all-levels="true" :change-on-select="false" @change="changeKeyword"></el-cascader>
        <el-tag v-for="k in tags" :key="k" :closable="true" type="success" @close="removeKeyword(k)">{{k}}</el-tag>
    </el-form-item>
</template>
<script>
    import {getCaseFactorList,getFactorKeywords} from "@/api/keyword"
    export default{
        props:{
            label:{
                type:String,
                required:true,
                default:"关键词"
            },
            keywords:{
                type:Array,
                required:false,
                default(){
                    return [];
                }
            }
        },
        data(){
            return {
                factors:[],
                kv:null,
                tags:[]
            }
        },
        watch:{
            keywords(keywords){
                this.flushTag(keywords)
            }
        },
        methods:{
            changeKeyword:function(value){
                console.log(value)
                var [factor_id,keyword_id,]=value
                var exists=false;
                this.keywords.forEach(kw_id=>{
                    if(kw_id==keyword_id) exists=true;
                })
                if(exists) return false;
                this.factors.forEach(item=>{
                    if(item.value==factor_id){
                        item.children.forEach(kv=>{
                            if(kv.value==keyword_id){
                                // this.tags.push(item.label+"/"+kv.label)
                                this.keywords.push(keyword_id)
                            }
                        })
                    }
                })
                console.log(this.keywords)
            },
            removeKeyword:function(value){
                var [factor_name,keyword_name]=value.split("/")
                this.factors.forEach(item=>{
                    if(item.label==factor_name){
                        item.children.forEach(kv=>{
                            if(kv.label==keyword_name){
                                this.tags=this.tags.filter(t=>t!=value)
                                this.$emit("update:keywords",this.keywords.filter(t=>t!=kv.value))
                            }
                        })
                    }
                })
            },
            flushTag(keywords){
                this.tags=[]
                keywords.forEach(keyword_id=>{
                    console.log("keyword_id",keyword_id)
                    this.factors.forEach(item=>{
                        item.children.forEach(kv=>{
                            if(kv.value==keyword_id){
                                console.log("keyword_id",item.label,kv.label)
                                this.tags.push(item.label+"/"+kv.label)
                            }
                        })
                    })
                })
            }
        },
        mounted(){
            getFactorKeywords().then(data=>{
                this.factors=[];
                data.forEach(item=>{
                    var factor={label:item.name,value:item.id,children:[]}
                    item.keywords.forEach(kw=>{
                        factor.children.push({label:kw.name,value:kw.id})
                    })
                    this.factors.push(factor)
                })
                this.flushTag(this.keywords)
            })
        }
    }
</script>
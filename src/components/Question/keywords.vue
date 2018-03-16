<template>
    <el-form-item :label="label">
        <el-cascader class="block" :options="factors" filterable clearabel placeholder="选择关键词" :props="props" v-model="kv" @change="changeKeyword" @active-item-change="fetchFactorKeyword"></el-cascader>
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
                props: {
                  value: 'value',
                  children: 'keywords'
                },
                tags:[]
            }
        },
        methods:{
            changeKeyword:function(value){
                var [factor_id,keyword_id,]=value
                var exists=false;
                this.keywords.forEach(item=>{
                    if(item.factor_id==factor_id && item.keyword_id==keyword_id) exists=true;
                })
                if(exists) return false;
                this.factors.forEach(item=>{
                    if(item.value==factor_id){
                        item.keywords.forEach(kv=>{
                            if(kv.value==keyword_id){
                                this.tags.push(item.label+"/"+kv.label)
                                this.keywords.push({factor_id:factor_id,factor_name:item.label,keyword_id:keyword_id,keyword_name:kv.label})
                            }
                        })
                    }
                })
                console.log(this.keywords)
            },
            removeKeyword:function(value){
                var [factor_name,keyword_name]=value.split("/")
                this.keywords.forEach((item,index)=>{
                    if(item.factor_name==factor_name && item.keyword_name==keyword_name){
                        // this.keywords=this.keywords.filter(k=>!(k.keyword_id==item.keyword_id && k.factor_id==item.factor_id))
                        this.keywords.splice(index)
                        this.tags=this.tags.filter(t=>t!=value)
                    }
                })
                console.log(this.keywords)
            },
            fetchFactorKeyword(factor){
                var factor_id=factor[0];
                getFactorKeywords(factor_id).then(data=>{
                    var kv=data.map(item=>{
                        return {label:item.name,value:item.id}
                    })
                    this.factors=this.factors.map(item=>{
                        if(item.value==factor_id){
                            item.keywords=kv
                        }
                        return item
                    })
                })
            }
        },
        mounted(){
            getCaseFactorList().then(data=>{
                this.factors=data.map(item=>{
                    return {value:item.id,label:item.name,keywords:[]}
                })
                console.log(this.factors)
            })

            if(this.selected){
                // this.tags.push()
            }
        }
    }
</script>
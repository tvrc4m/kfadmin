<template>
    <div class="factor-container">
        <el-collapse v-model="activied" :accordion="false" style="width: 100%">
            <el-collapse-item v-for="factor in factors" :title="factor.name" :name="factor.name">
                <el-select v-model="factor_keyword[factor.id]" :key="factor.id"  multiple :multiple-limit="factor.count" :filterable="true" allow-create :default-first-option="true" placeholder="选择或创建关键词" @change="changeKeyword(factor.id,$event)" @remove-tag="removeKeyword($event)" style="width: 100%">
                    <el-option v-for="tag in tags[factor.id]" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
                </el-select>
            </el-collapse-item>
        </el-collapse>
        <el-button type="primary" @click="saveFactor" size="small">保存</el-button>
    </div>
</template>
<script>
    import {getCaseKeywords,getCaseFactors,searchKeyword,addKeyword,getFactorKeyword,updateFactorKeywords} from '@/api/case'
    import {getFactorKeywords} from '@/api/keyword'
    export default{
        data(){
            return {
                activied:[],
                factors:[],
                keywords:[],
                factor_keyword:{},
                tags:{},
                case_id:0,
                current_factor_id:0,
                load:[],
            }
        },
        methods:{
            saveFactor(){
                updateFactorKeywords({case_id:this.case_id,data:this.factor_keyword}).then(data=>{
                    this.$message({message:"更改成功",type:"success"})
                })
            },
            changeKeyword(factor_id,value){
                console.log(factor_id,value)
                if(value.length){
                    var keyword=value[value.length-1]
                    if(!Number.isInteger(keyword)){
                        addKeyword({case_factor_id:factor_id,name:keyword}).then(data=>{
                            console.log(this.factor_keyword[factor_id])
                            this.tags[factor_id].push({name:keyword,id:data.keyword_id})
                            this.$set(this.tags,factor_id,this.tags[factor_id])
                            this.$forceUpdate()
                            setTimeout(_=>{
                                 this.factor_keyword[factor_id].pop()
                                this.factor_keyword[factor_id].push(data.keyword_id)
                                this.$set(this.factor_keyword,factor_id,this.factor_keyword[factor_id])
                            },100)
                           
                            console.log(this.tags,this.factor_keyword)
                            // this.$set(this.factor_keyword,factor_id,value)
                        }).catch(error=>{
                            this.factor_keyword[factor_id].pop()
                        })
                    }
                }
            },
            removeKeyword(value){
                console.log('remove',value)
            }
        },
        created(){
            if(this.$route.params.case_id){
                this.add=false
                this.case_id=this.$route.params.case_id
            }
        },
        mounted(){
            getCaseKeywords(this.case_id).then(data=>{
                data.forEach(item=>{
                    this.factor_keyword[item.case_factor_id]=[]
                    if(item.keywords.length){
                        item.keywords.forEach(kv=>{
                            this.factor_keyword[item.case_factor_id].push(kv.keyword_id)
                        })
                    }
                    console.log(this.factor_keyword)
                })
            })
            getFactorKeywords().then(data=>{
                this.factors=[];
                data.forEach(item=>{
                    this.factors.push({id:item.id,name:item.name,count:item.count})
                    this.activied.push(item.name)
                    this.tags[item.id]=[]
                    item.keywords.forEach(kw=>{
                        this.tags[item.id].push({name:kw.name,id:kw.id})
                    })
                })
                console.log("factors",this.tags,this.factors)
            })
        }
    }
</script>
<template>
    <div class="factor-container">
        <el-collapse v-model="activied" :accordion="false" style="width: 100%">
            <el-collapse-item v-for="factor in factors" :title="factor.name" :name="factor.name">
                <el-select v-model="factor_keyword[factor.id]" :key="factor.id" :factor_id="factor.id" multiple :multiple-limit="factor.count" :filterable="true" allow-create :default-first-option="true" placeholder="选择或创建关键词"  @focus="selectFactor(factor.id)" @change="changeKeyword" style="width: 100%">
                    <el-option v-for="tag in tags[factor.id]" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
                </el-select>
            </el-collapse-item>
        </el-collapse>
        <el-button type="primary" @click="saveFactor" size="small">保存</el-button>
    </div>
</template>
<script>
    import {getCaseKeywords,getCaseFactors,searchKeyword,addKeyword,getFactorKeyword,updateFactorKeywords} from '@/api/case'
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
                      console.log(data)
                })
            },
            selectFactor(factor_id){
                this.current_factor_id=factor_id
                if(!this.load[factor_id]){
                    getFactorKeyword(factor_id).then(data=>{
                        this.$set(this.tags,factor_id,data)
                        this.load[factor_id]=true
                    })
                }
            },
            changeKeyword(value){
                if(value.length){
                    var keyword=value[value.length-1]
                    if(!Number.isInteger(keyword)){
                        addKeyword({case_factor_id:this.current_factor_id,name:keyword}).then(data=>{
                            value.pop()
                            value.push(data.keyword_id)
                            var tags=this.tags[this.current_factor_id]
                            tags.push({id:data.keyword_id,name:keyword})
                            this.$set(this.tags,this.current_factor_id,tags)
                            this.$set(this.factor_keyword,this.current_factor_id,value)
                            // this.$nextTick(function(){
                                
                                
                            // })
                        })
                    }
                }
            },
            getKeywordName(keyword_id){
                var name=""
                this.keywords.forEach(item=>{
                    if(item.id==keyword_id){
                        name=item.name
                        return;
                    }
                })
                return name
            }
        },
        created(){
            if(this.$route.params.case_id){
                this.add=false
                this.case_id=this.$route.params.case_id
            }
        },
        mounted(){
            getCaseFactors().then(data=>{
                data.forEach(item=>{
                    console.log(item)
                    this.activied.push(item.name)
                    this.factors.push({id:item.id,name:item.name})
                })
                getCaseKeywords(this.case_id).then(data=>{
                    data.forEach(item=>{
                        this.tags[item.case_factor_id]=[]
                        this.factor_keyword[item.case_factor_id]=[]
                        // this.keywords[item.case_factor_id]=[]
                        if(item.keywords.length){
                            // var keywords=[]
                            // console.log(item.keywords)
                            item.keywords.forEach(kv=>{
                                this.factor_keyword[item.case_factor_id].push(kv.keyword_id)
                            })
                        }
                        console.log(this.factor_keyword)
                    })
                })

            })
        }
    }
</script>
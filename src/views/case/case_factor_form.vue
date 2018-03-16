<template>
    <div class="factor-container">
        <el-collapse v-model="activied" :accordion="false" style="width: 100%">
            <el-collapse-item v-for="factor in factors" :title="factor.name" :name="factor.name">
                <el-select v-model="tags[factor.name]" multiple filterable remote allow-create default-first-option="" placeholder="选择或创建关键词" :remote-method="searchWord" style="width: 100%">
                    <el-option v-for="tag in tags[factor.name]" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
                </el-select>
            </el-collapse-item>
        </el-collapse>
        <el-button type="primary" @click="saveFactor" size="small">保存</el-button>
    </div>
</template>
<script>
    import {getCaseKeywords,getCaseFactors,searchKeyword} from '@/api/case'
    export default{
        data(){
            return {
                activied:[],
                factors:[],
                tags:{},
            }
        },
        methods:{
            searchWord(word){
                searchKeyword(word).then(data=>{
                    console.log('name string')
                    console.log(data)
                })
            }
        },
        created(){

        },
        mounted(){
            getCaseFactors().then(data=>{
                data.forEach(item=>{
                    console.log(item)
                    this.activied.push(item.name)
                    this.factors.push({id:item.id,name:item.name})
                })
                getCaseKeywords(3).then(data=>{
                    data.forEach(item=>{
                        if(item.keywords.length){
                            var keywords=[]
                            item.keywords.forEach(kv=>{
                                keywords.push({id:kv.keyword_id,name:kv.keyword_name})
                            })
                            this.tags[item.case_factor_name]=keywords
                        }
                    })
                })
            })
        }
    }
</script>
<template>
    <div class="factor-container">
        <el-collapse v-model="activied" :accordion="false" style="width: 100%">
            <el-collapse-item v-for="factor in factors" :title="factor.name" :name="factor.name">
                <el-select v-model="tags[factor.name]" :factor_id="factor.id" multiple filterable remote allow-create default-first-option="" placeholder="选择或创建关键词" :remote-method="searchWord" :multiple-limit="factor.count" @focus="selectKeyword" @change="changeKeyword" style="width: 100%">
                    <el-option v-for="tag in tags[factor.name]" :key="tag" :label="getKeywordName(tag)" :value="tag"></el-option>
                </el-select>
            </el-collapse-item>
        </el-collapse>
        <el-button type="primary" @click="saveFactor" size="small">保存</el-button>
    </div>
</template>
<script>
    import {getCaseKeywords,getCaseFactors,searchKeyword,addKeyword} from '@/api/case'
    export default{
        data(){
            return {
                activied:[],
                factors:[],
                keywords:[],
                tags:{},
                case_id:0
            }
        },
        methods:{
            searchWord(word,$event){
                console.log($event)
                searchKeyword({case_factor_id:1,name:word}).then(data=>{
                    console.log('name string')
                    console.log(data)
                })
            },
            saveFactor(){

            },
            selectKeyword($event){
                console.log($event)
                console.log($event.target)
            },
            changeKeyword(value){
                console.log(value)
                // console.log(word)
            },
            getKeywordName(keyword_id){
                var name=""
                this.keywords.forEach(item=>{
                    if(item.id==keyword_id){
                        name=item.name
                        return;
                    }
                })
                console.log(name)
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
                        if(item.keywords.length){
                            var keywords=[]
                            item.keywords.forEach(kv=>{
                                this.keywords.push({id:kv.keyword_id,name:kv.keyword_name})
                                keywords.push(kv.keyword_id)
                            })
                            this.tags[item.case_factor_name]=keywords
                        }
                    })
                    console.log(this.tags)
                    console.log(this.keywords)
                })
            })
        }
    }
</script>
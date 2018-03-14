<template>
    <div class="case-container">
        <el-form :model="caseinfo" label-width="150" label-position="left">
            <el-tabs v-model="tab">
                <el-tab-pane label="案例内容" name="caseinfo">
                    <el-form-item label="名称" placeholder="案例名称">
                        <el-input type="text" v-model="caseinfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker type="month" v-model="caseinfo.date" placeholder="选择发生日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="案情">
                        <el-input type="textarea" v-model="caseinfo.info"></el-input>
                    </el-form-item>
                    <el-form-item label="判决">
                        <el-input type="textarea" v-model="caseinfo.judgement"></el-input>
                    </el-form-item>
                    <el-form-item label="建议">
                        <el-input type="textarea" v-model="caseinfo.suggest"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="案例要素" name="casefactor">
                    <el-collapse v-model="factor_active" :accordion="false" style="width: 100%">
                        <el-collapse-item v-for="factor in factors" :title="factor.name" :name="factor.name">
                            <el-select v-model="tags[factor.name]" multiple filterable allow-create default-first-option="" placeholder="选择或创建关键词" style="width: 100%">
                                <el-option v-for="tag in tags[factor.name]" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
                            </el-select>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab:"caseinfo",
                factor_active:["基本要素","财产及收入要素","感情要素"],
                caseinfo:{
                    name:'',
                    date:'',
                    info:'',
                    judgement:'',
                    suggest:''
                },
                factors:[
                    {
                        name:"基本要素"
                    },
                    {
                        name:"财产及收入要素"
                    },
                    {
                        name:"感情要素"
                    }
                ],
                tags:{
                    "基本要素":[
                        {
                            id:1,
                            name:"孩子"
                        }
                    ],
                    "财产及收入要素":[
                        {
                            id:1,
                            name:"收入高"
                        }
                    ],
                    "感情要素":[
                        {
                            id:1,
                            name:"感情"
                        }
                    ],
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .case-container{
        .el-input,input[type=text],.el-textarea,textarea{
            width:500px;
        }
        textarea{
            height:100px;
        }
    }
</style>
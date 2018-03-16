<template>
    <el-collapse v-model="factor_active" :accordion="false" style="width: 100%">
        <el-collapse-item v-for="factor in factors" :title="factor.name" :name="factor.name">
            <el-select v-model="tags[factor.name]" multiple filterable allow-create default-first-option="" placeholder="选择或创建关键词" style="width: 100%">
                <el-option v-for="tag in tags[factor.name]" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
            </el-select>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
    export default{
        data(){
            return {
                factor_active:'',
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
                },
            }
        },

    }
</script>
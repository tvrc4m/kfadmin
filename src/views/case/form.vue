<template>
    <div class="case-container">
            <el-tabs v-model="tab">
                <el-tab-pane label="案例内容" name="caseinfo">
                    <router-view name="default"></router-view>
                </el-tab-pane>
                <el-tab-pane label="案例要素" name="casefactor">
                    <router-view name="case_factor"></router-view>
                </el-tab-pane>
            </el-tabs>
        
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab:"caseinfo"
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
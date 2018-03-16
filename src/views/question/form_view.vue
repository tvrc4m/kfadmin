<template>
    <div class="emotion-container">
        <el-form :inline="true" label-width="300">
            <el-tabs v-model="tab_selected" @tab-click="tabClick" type="border-card">
                <el-tab-pane label="基础资料" name="base">
                    <router-view name="base_view"></router-view>
                </el-tab-pane>
                <el-tab-pane label="问题" name="question">
                    <router-view name="question_view"></router-view>
                </el-tab-pane>
                <el-tab-pane label="建议" name="advise">
                    <router-view name="advise_view"></router-view>
                </el-tab-pane>
                <el-tab-pane label="匹配关系" name="relation">
                    <router-view name="relation_view"></router-view>
                </el-tab-pane>

            </el-tabs>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab_selected:"base"
            }
        },
        methods:{
            tabClick(tab){
                console.log(tab);
            }
        }
    }
</script>
<style lang="scss">
    .block{
        display:block !important;
    }
</style>
<template>
    <div class="case-container">
        <el-tabs v-model="tab" @tab-click="tabClicked">
            <el-tab-pane label="案例内容" name="caseinfo">
                <router-view name="case_info"></router-view>
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
        },
        methods:{
            tabClicked(tab){
                if(tab.name=='casefactor'){
                    // this.$router.push({path:"/case/add/factor"})
                }
            }
        }
    }
</script>

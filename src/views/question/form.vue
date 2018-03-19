<template>
    <div class="emotion-container">
        <el-form :inline="true" label-width="300">
            <el-tabs v-model="tab_selected" @tab-click="tabClick" type="border-card">
                <el-tab-pane label="基础资料" name="base">
                    <router-view name="base"></router-view>
                </el-tab-pane>
                <el-tab-pane label="问题" name="question">
                    <router-view name="question"></router-view>
                </el-tab-pane>
                <el-tab-pane label="建议" name="advise">
                    <router-view name="advise"></router-view>
                </el-tab-pane>
                <el-tab-pane label="匹配关系" name="relation">
                    <router-view name="relation"></router-view>
                </el-tab-pane>

            </el-tabs>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab_selected:"base",
            }
        },
        methods:{
            tabClick(tab){
                console.log(1,tab)
                switch(tab.name){
                    case "base":this.$router.push({name:"questionCollectionView",params:{id:this.$route.params.id}});break;
                    case "question":this.$router.push({name:"questionCollectionViewQuestion",params:{id:this.$route.params.id}});break;
                    case "advise":this.$router.push({name:"questionCollectionViewAdvise",params:{id:this.$route.params.id}});break;
                    case "relation":this.$router.push({name:"questionCollectionViewRelation",params:{id:this.$route.params.id}});break;
                }
            }
        },
        created(){
            console.log(2,this.$route);
            switch(this.$route.name){
                case 'questionCollectionView':this.tab_selected='base';break;
                case 'questionCollectionViewQuestion':this.tab_selected='question';break;
                case 'questionCollectionViewAdvise':this.tab_selected='advise';break;
                case 'questionCollectionViewRelation':this.tab_selected='relation';break;
            }
        }
    }
</script>
<style lang="scss">
    .block{
        display:block !important;
    }
</style>
<template>
    <div class="emotion-container">
        <el-form :inline="true" label-width="300">
            <el-tabs v-model="tab_selected" @tab-click="tabClick" type="border-card">
                <el-tab-pane label="基础资料" name="base">
                    <router-view :is_add.sync="add" :type="type" :type_name="type_name" name="base"></router-view>
                </el-tab-pane>
                <el-tab-pane v-if="add" label="问题" :type="type" :type_name="type_name" name="question">
                    <router-view name="question"></router-view>
                </el-tab-pane>
                <el-tab-pane v-if="add && type!=1" label="建议" :type="type" :type_name="type_name" name="advise">
                    <router-view name="advise"></router-view>
                </el-tab-pane>
                <el-tab-pane v-if="add && type!=1" label="匹配关系" :type="type" :type_name="type_name" name="relation">
                    <router-view name="relation"></router-view>
                </el-tab-pane>

            </el-tabs>
        </el-form>
    </div>
</template>
<script>
    import mixin from '@/mixin/question'
    export default{
        name:"question-collection-form",
        mixins:[mixin],
        data(){
            return {
                tab_selected:"base",
                add:true,
            }
        },
        methods:{
            tabClick(tab){
                switch(tab.name){
                    case "base":
                        this.$router.push({name:"questionCollectionView",params:{question_collection_id:this.$route.params.question_collection_id}});break;
                    case "question":
                        this.$router.push({name:"questionCollectionViewQuestion",params:{question_collection_id:this.$route.params.question_collection_id}});
                        break;
                    case "advise":this.$router.push({name:"questionCollectionViewAdvise",params:{question_collection_id:this.$route.params.question_collection_id}});break;
                    case "relation":this.$router.push({name:"questionCollectionViewRelation",params:{question_collection_id:this.$route.params.question_collection_id}});break;
                }
            }
        },
        created(){
            console.log(2,this.$route);
            if(!this.$route.params.question_collection_id){
                this.add=false;
            }

            switch(this.$route.name){
                case 'questionCollectionView':this.tab_selected='base';break;
                case 'questionCollectionEdit':this.tab_selected='base';break;
                case 'questionCollectionAdd':this.tab_selected='base';break;
                case 'questionCollectionViewQuestion':this.tab_selected='question';break;
                case 'questionCollectionEditQuestion':this.tab_selected='question';break;
                case 'questionCollectionAddQuestion':this.tab_selected='question';break;
                case 'questionCollectionViewAdvise':this.tab_selected='advise';break;
                case 'questionCollectionEditAdvise':this.tab_selected='advise';break;
                case 'questionCollectionAddAdvise':this.tab_selected='advise';break;
                case 'questionCollectionViewRelation':this.tab_selected='relation';break;
                case 'questionCollectionEditRelation':this.tab_selected='relation';break;
                case 'questionCollectionAddRelation':this.tab_selected='relation';break;
            }
        }
    }
</script>
<style lang="scss">
    .block{
        display:block !important;
    }
</style>
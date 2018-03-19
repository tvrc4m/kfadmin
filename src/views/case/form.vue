<template>
    <div class="case-container">
        <el-tabs v-model="tab" @tab-click="tabClicked">
            <el-tab-pane label="案例内容" name="caseinfo">
                <router-view :case_id.sync="case_id" name="case_info"></router-view>
            </el-tab-pane>
            <el-tab-pane v-if="!add" label="案例要素" name="casefactor">
                <router-view name="case_factor"></router-view>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab:"caseinfo",
                add:true,
                case_id:0
            }
        },
        methods:{
            tabClicked(tab){
                if(this.add){
                    switch(tab.name){
                        case 'caseinfo':this.$router.push({path:"/case/add"});break;
                        case 'casefactor':{
                            this.$message({
                                message:"请先添加案例基本信息",
                                type:"error"
                            })
                        }
                        break;
                    }
                }else{
                    switch(tab.name){
                        case 'caseinfo':this.$router.push({name:"caseEdit",params:{case_id:this.case_id}});break;
                        case 'casefactor':this.$router.push({name:"caseFactorEdit",params:{case_id:this.case_id}});break;
                    }
                }
            }
        },
        watch:{
            case_id(newvalue){
                if(newvalue>0) this.add=false
            }
        },
        mounted(){
            if(this.$route.params.case_id){
                this.add=false
                this.case_id=this.$route.params.case_id
            }
            switch(this.$route.name){
                case 'caseAdd':this.tab='caseinfo';break;
                case 'caseEdit':this.tab='caseinfo';break;
                case 'caseFactorEdit':this.tab='casefactor';break;
            }
        }
    }
</script>

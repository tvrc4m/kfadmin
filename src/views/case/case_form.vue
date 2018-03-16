<template>
    <el-form :model="caseinfo" label-width="150" label-position="left">
        <el-form-item label="名称" placeholder="案例名称">
            <el-input type="text" v-model="caseinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="分类" placeholder="类别">
            <el-select v-model="caseinfo.case_cate_id">
                <el-option v-for="cat in cats" :key="cat.id" :label="cat.name" :value="cat.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker type="month" v-model="caseinfo.case_date" placeholder="选择发生日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="案情">
            <el-input type="textarea" v-model="caseinfo.info"></el-input>
        </el-form-item>
        <el-form-item label="判决">
            <el-input type="textarea" v-model="caseinfo.judgment"></el-input>
        </el-form-item>
        <el-form-item label="建议">
            <el-input type="textarea" v-model="caseinfo.suggest"></el-input>
        </el-form-item>
        <el-button type="primary" @click="saveCase">保存</el-button>
    </el-form>
</template>
<script>
    import {addCase,editCase,getCaseInfo,getCaseCat} from '@/api/case'
    export default{
        data(){
            return {
                tab:"caseinfo",
                cats:[],
                factor_active:["基本要素","财产及收入要素","感情要素"],
                caseinfo:{
                    id:null,
                    name:'',
                    case_cate_id:'',
                    province_id:'',
                    city_id:'',
                    case_date:'',
                    info:'',
                    judgment:'',
                    suggest:'',
                    is_breakup:'',
                },
                add:true
            }
        },
        methods:{
            saveCase(){
                if(this.add){
                    addCase(this.caseinfo).then(data=>{

                    })
                }else{
                    editCase(this.caseinfo.id,this.caseinfo).then(data=>{

                    })
                }
            },
            tabClicked(tab){
                if(tab.name=='casefactor'){
                    // this.$router.push({name:"case_factor_form",params:{id:this.caseinfo.id}})
                }
                console.log(tab)
                console.log(tab.value)
            }
        },
        created(){
            if(this.$route.params.case_id){
                this.add=false
                this.caseinfo.id=this.$route.params.case_id
            }
        },
        mounted(){
            if(this.caseinfo.id){
                getCaseInfo(this.caseinfo.id).then(data=>{
                    console.log(data)
                    this.caseinfo=data
                })
            }
            getCaseCat().then(data=>{
                this.cats=data
            })
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
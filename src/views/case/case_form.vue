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
        <el-form-item label="位置">
            <location :province_id.sync="caseinfo.province_id" :city_id.sync="caseinfo.city_id"></location>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker type="month" v-model="caseinfo.case_date" value-format="yyyy-MM-01 00:00:00" placeholder="选择发生日期" :picker-options="datepicker"></el-date-picker>
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
        <el-form-item label="判决结果">
            <el-radio v-model="caseinfo.is_breakup" :label="0">不离</el-radio>
            <el-radio v-model="caseinfo.is_breakup" :label="1">离婚</el-radio>
        </el-form-item>
        <el-button type="primary" @click="saveCase">保存</el-button>
    </el-form>
</template>
<script>
    import {addCase,editCase,getCaseInfo,getCaseCat} from '@/api/case'
    import location from "@/components/Location/index"
    export default{
        components:{location},
        props:{
            case_id:Number
        },
        data(){
            return {
                tab:"caseinfo",
                cats:[],
                caseinfo:{
                    id:null,
                    name:'',
                    case_cate_id:'',
                    province_id:0,
                    city_id:0,
                    case_date:'',
                    info:'',
                    judgment:'',
                    suggest:'',
                    is_breakup:0,
                },
                add:true,
                datepicker:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                  shortcuts: [
                    {
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, 
                    {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, 
                    {
                        text: 'A week ago',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                  }]
                }
            }
        },
        methods:{
            saveCase(){
                if(this.add){
                    addCase(this.caseinfo).then(data=>{
                        this.$message({
                            message:"创建成功",
                            type:"success"
                        })
                        this.$emit("update:case_id",data.id)
                        this.$router.push({name:'caseEdit',params:{case_id:data.id}})
                    })
                }else{
                    editCase(this.caseinfo.id,this.caseinfo).then(data=>{
                        this.$message({
                            message:"更改成功",
                            type:"success"
                        })
                    })
                }
            },
            tabClicked(tab){
                console.log(tab)
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
                    this.caseinfo=data
                    console.log(this.caseinfo.province_id)
                    console.log(this.caseinfo.city_id)
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
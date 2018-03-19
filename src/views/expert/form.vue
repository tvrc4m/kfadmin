<template>
    <el-form class="emotion-form" :inline="true" label-width="120" label-position="right" :model="expert">
        <el-row type="flex">
            <el-form-item label="昵称">
                <el-input v-model="expert.nickname"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="expert.name"></el-input>
            </el-form-item>
        </el-row>
        <el-form-item label="职业" class="block">
            <el-select v-model="expert.job_id" placeholder="选择职业" filterable>
                <el-option v-for="job in jobs" :key="job.job_id" :label="job.name" :value="job.job_id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="认证" class="block">
            <el-checkbox v-model="expert.certification" v-for="v in verify" :label="v.id" :key="v.name" name="verify">{{v.name}}</el-checkbox>
        </el-form-item>
        <el-form-item label="位置" class="block">
            <location :province_id.sync="expert.province_id" :city_id.sync="expert.city_id"></location>
        </el-form-item>
        <el-form-item label="职业" class="block">
            <el-select v-model="expert.good_at" placeholder="擅长" filterable :multiple="true">
                <el-option v-for="g in goodat" :key="g.id" :label="g.name" :value="g.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="介绍" class="block">
            <el-input type="textarea" class="content" v-model="expert.intro"></el-input>
        </el-form-item>
        <h3>登陆信息 <span>(编辑时可不填写)</span></h3>
        <el-form-item label="账户名" class="block">
            <el-input type="text" v-model="expert.account"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" class="block">
            <el-input type="password" v-model="expert.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="confirm">{{confirm_text}}</el-button>
    </el-form>
</template>
<script>
    import keywords from "@/components/Question/keywords"
    import location from "@/components/Location/index"
    import {getExpertInfo,addExpert,editExpert,getExpertJob,getExpertGoodAt,getExpertServices,getExpertCertification} from '@/api/expert'
    export default{
        components:{keywords,location},
        data(){
            return {
                expert:{
                    id:null,
                    nickname:"",
                    name:"",
                    job_id:"",
                    intro:"",
                    service:[],
                    good_at:[],
                    certification:[],
                    keywords:[],
                    province_id:0,
                    city_id:0,
                    account:'',
                    password:'',
                },
                jobs:[],
                goodat:[],
                verify:[],
                services:[],
                location:[{
                    label:"北京",
                    value:"bj",
                    children:[
                        {
                            label:"朝阳区",
                            value:"chaoyang"
                        },
                        {
                            label:"海淀区",
                            value:"haidian"
                        }
                    ]
                }],
                keywords:[],
                confirm_text:"新增",
                add:true
            }
        },
        computed:{
            job_name:function(){
                var current=this.jobs.filter(item=>item.id==this.job_id)
                return current.length && current[0].name
            }
        },
        watch:{
            keywords(selected){
                if(this.expert.keywords.length) this.expert.keywords.splice(0,this.expert.keywords.length)
                selected.forEach(item=>this.expert.keywords.push(item.keyword_id))
                console.log(this.expert)
            }
        },
        created(){
            if(this.$route.params.id){
                this.expert.id=this.$route.params.id
                this.add=false
                this.confirm_text='编辑'
            }
        },
        methods:{
            confirm:function(){
                if(this.add){
                    addExpert(this.expert).then(data=>{
                        Message({
                          message: "新增成功",
                          type: 'success',
                          duration: 5 * 1000
                        });
                    })
                }else{
                    editExpert(this.expert.id,this.expert).then(data=>{
                        Message({
                          message: "编辑成功",
                          type: 'success',
                          duration: 5 * 1000
                        });
                    })
                }
            }
        },
        mounted(){
            if(!this.add){
                getExpertInfo(this.expert.id).then(data=>{
                    this.expert=data;
                    if(this.expert.good_at.length){
                        var goodat=this.expert.good_at.split(',')
                        this.expert.good_at=[]
                        goodat.forEach(item=>this.expert.good_at.push(parseInt(item)))
                    }else{
                        this.expert.good_at=[]
                    }
                })
            }
            getExpertJob().then(data=>{
                this.jobs=data
            })
            getExpertGoodAt().then(data=>{
                this.goodat=data
            })
            getExpertCertification().then(data=>{
                this.verify=data
                console.log(this.verify)
            })
            getExpertServices().then(data=>{
                this.services=data
                console.log(data)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .emotion-form{
    }
    .block{
        display:block;
    }
    .content{
    }
</style>
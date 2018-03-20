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
            <el-checkbox-group v-model="expert.certification">
                <el-checkbox v-for="v in verify" :key="v.id" :label="v.id">{{v.name}}</el-checkbox>
            </el-checkbox-group>
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
        <el-form-item class="block" label="服务">
            <el-row style="margin=5px" v-for="(es,index) of expert.services">
                <div>{{index}}.{{es.type}}-{{es.name}}--{{es.price}}{{es.limit_free?'-- 限时免费':''}}</div>
                <div>{{es.content}}</div>
            </el-row>
            <el-row style="margin:5px">
                <el-select placeholder="服务类型" v-model="service.type">
                    <el-option v-for="t in types" :value="t.name" :key="t.id" :label="t.name"></el-option>
                </el-select>
                <el-select placeholder="服务名称" v-model="service.name">
                    <el-option v-for="s in services" :value="s.id" :key="s.id" :label="s.name"></el-option>
                </el-select>
                <el-form-item>
                    <el-input type="text" placeholder="服务价格" v-model="service.price"></el-input>
                </el-form-item>
                <el-checkbox v-model="service.limit_free"></el-checkbox>&nbsp;&nbsp;限时免费
            </el-row>
            <el-row>
                <el-form-item label="">
                    <el-input type="textarea" v-model="service.content" placeholder="服务介绍">
                        
                    </el-input>
                </el-form-item>
            </el-row>
            <el-button type="text" @click="addService">添加</el-button>
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
                    job_id:0,
                    intro:"",
                    services:[],
                    good_at:[],
                    certification:[],
                    keywords:[],
                    province_id:0,
                    city_id:0,
                    account:'',
                    password:'',
                },
                types:[
                    {
                        id:1,
                        name:"法律"
                    },
                    {
                        id:2,
                        name:"情感"
                    },
                ],
                service:{
                    name:'',
                    type:'',
                    price:0,
                    limit_free:false,
                    content:''
                },
                jobs:[],
                goodat:[],
                verify:[],
                services:[],
                service_count:0,
                location:[],
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
            },
            addService(){
                var message=null
                if(!this.service.type){
                    message="请选择服务类型"
                }
                this.service.name="服务"
                if(!this.service.name){
                    message="请选择服务"
                }
                if(!this.service.price && this.service.price<0){
                    message="服务价格不能为空且要大于等于0"
                }
                if(message){
                    this.$message({message:"请选择服务",type:"warning"})
                    return
                }
                this.expert.services=[]
                this.expert.services.push(this.service)
                console.log(this.expert.services)
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
                    if(this.expert.certification.length){
                        var goodat=this.expert.certification.split(',')
                        this.expert.certification=[]
                        goodat.forEach(item=>this.expert.certification.push(parseInt(item)))
                    }else{
                        this.expert.certification=[]
                    }
                    this.service_count=this.expert.services.length
                    this.expert.services=[]
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
<template>
    <el-form class="emotion-form" :inline="true" label-width="120" label-position="right" :model="expert">
        <el-input type="hidden" v-model="expert.type"></el-input>
        <el-row type="flex">
            <el-form-item label="昵称">
                <el-input v-model="expert.nickname"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="expert.name"></el-input>
            </el-form-item>
        </el-row>
        <el-form-item class="block" label="头像(限制500*500)">
            <el-input type="hidden" v-model="expert.icon"></el-input>
            <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false" :drag="true" :on-success="uploadSuccess">
                    <img v-if="expert.icon" :src="expert.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
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
            <el-row style="margin=5px" v-for="(es,index) of expert.service">
                <div>
                    <span>{{index}}.{{es.type}}-{{es.name}}--{{es.price}}{{es.limit_free?'-- 限时免费':''}}</span>&nbsp;&nbsp; 
                    <el-button type="text" @click="removeService(index)">删除</el-button></div>
                <div>{{es.description}}</div>
            </el-row>
            <el-row style="margin:5px">
                <el-select placeholder="服务名称" v-model="service.service_id">
                    <el-option v-for="s in services" :value="s.id" :key="s.id" :label="s.name"></el-option>
                </el-select>
                <el-form-item>
                    <el-input type="text" placeholder="服务价格" v-model="service.price"></el-input>
                </el-form-item>
                <el-checkbox v-model="service.limit_free"></el-checkbox>&nbsp;&nbsp;限时免费
            </el-row>
            <el-row>
                <el-form-item label="">
                    <el-input type="textarea" v-model="service.description" placeholder="服务介绍"></el-input>
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
    import location from "@/components/Location/index"
    import {upload_url} from '@/api/upload'
    import {getExpertInfo,addExpert,editExpert,getExpertJob,getExpertGoodAt,getExpertServices,getExpertCertification} from '@/api/expert'
    export default{
        components:{location},
        data(){
            return {
                upload_url:upload_url,
                expert:{
                    id:null,
                    nickname:"",
                    icon:'',
                    name:"",
                    job_id:null,
                    intro:"",
                    service:[],
                    good_at:[],
                    certification:[],
                    province_id:0,
                    city_id:0,
                    account:'',
                    password:'',
                },
                cates:[
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
                    service_id:null,
                    name:'',
                    type:'',
                    price:null,
                    limit_free:false,
                    description:''
                },
                jobs:[],
                goodat:[],
                verify:[],
                services:[],
                service_count:0,
                location:[],
                confirm_text:"新增",
                add:true,
            }
        },
        computed:{
            job_name:function(){
                var current=this.jobs.filter(item=>item.id==this.job_id)
                return current.length && current[0].name
            }
        },
        created(){
            if(this.$route.params.id){
                this.expert.id=this.$route.params.id
                this.add=false
                this.confirm_text='编辑'
                console.log(211313,this.$route)
            }else{
                if(this.$route.query.type){
                    this.expert.type=this.$route.query.type
                }else{
                    this.$message({message:"请先选择专家类型",type:"warning"})
                    this.$router.push({path:"/expert"})
                }
            }
        },
        methods:{
            confirm:function(){
                if(this.add){
                    addExpert(this.expert).then(data=>{
                        this.$message({
                          message: "新增成功",
                          type: 'success',
                          duration: 5 * 1000
                        });
                        this.$router.push({path:"/expert",query:{type:this.expert.type}})
                    })
                }else{
                    for(let i=0;i<this.expert.service.length;i++){
                        let item=this.expert.service[i];
                        delete item['cate'];
                        delete item['created_at'];
                        delete item['expert_id'];
                        delete item['id'];
                        delete item['pay_type'];
                        delete item['pre_price'];
                        delete item['updated_at'];
                    }
                    console.log(222222,this.expert)
                    editExpert(this.expert.id,this.expert).then(data=>{
                        this.$message({
                          message: "编辑成功",
                          type: 'success',
                          duration: 5 * 1000
                        });
                        this.$router.push({path:"/expert",query:{type:this.expert.type}})
                    })
                }
            },
            addService(){
                var message=null
                if(!this.service.service_id){
                    message="请选择服务"
                }
                if(!this.service.price && this.service.price<0){
                    message="服务价格不能为空且要大于等于0"
                }
                if(message){
                    this.$message({message:"请选择服务",type:"warning"})
                    return
                }
                this.expert.service.push({
                    service_id:this.service.service_id,
                    price:this.service.price,
                    limit_free:this.service.limit_free==true?1:0,
                    description:this.service.description
                })
            },
            removeService(index){
                this.expert.service.splice(index,1)
            },
            uploadSuccess(response){
                if(response.error_no==0 && response.data.image_url){
                    this.expert.icon=response.data.image_url
                }
                console.log(3,this.expert.icon);
                // this.question.bgimage=this.fileList[0];
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
                    // this.service_count=this.expert.service.length
                    // this.expert.service=[]
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
            getExpertServices({cate:this.expert.type}).then(data=>{
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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
</style>
<template>
    <el-form class="law-form" :inline="true" :model="law">
        <el-form-item label="法律全称" class="block" required :show-message="true">
            <el-input v-model="law.fullname" placeholder="法律全称" class="law-input"></el-input>
        </el-form-item>
        <el-form-item label="法律简称" class="block" required >
            <el-input type="textarea" v-model="law.name" :rows="10" placeholder="法律简称" class="law-input"></el-input>
        </el-form-item>
        <el-form-item label="拼音简写" class="block" required>
            <el-input type="text" v-model="law.pinyin" class="law-input" placeholder="拼音简写"></el-input>
        </el-form-item>
        <el-row type="flex" justify="center" style="width:560px;">
                <el-button type="primary" @click="confirm">{{confirm_text}}</el-button>        
        </el-row>
    </el-form>
</template>
<script>
    import {getLawInfo,editLaw,addLaw} from "@/api/law"
    export default{
        name:"professional-add",
        data(){
            return {
                law:{
                    id:null,
                    fullname:"",
                    name:"",
                    pinyin:''
                },
                confirm_text:"添加",
                add:true
            }
        },
        computed:{
            
        },
        methods:{
            confirm(){
                if(this.add){
                    addLaw(this.law).then(data=>{
                        this.$router.back(-1);
                    })
                }else{
                    editLaw(this.law.id,this.law).then(data=>{
                        this.$router.back(-1);
                    })
                }
            }
        },
        created(){
            console.log(this.$route.params.id)
            if(this.$route.params.id){
                this.add=false;
                this.confirm_text="编辑"
                this.law.id=this.$route.params.id
            }
        },
        mounted(){
            if(!this.add){
                getLawInfo(this.$route.params.id).then(data=>{
                    this.law=data
                }).catch(error=>{
                    console.log(error)
                })
            }else{

            }
        }
    }
</script>
<style lang="scss" scoped>
    .law-form{
        width:100%;
    }
    .law-content{
        width:100%;
    }
    .law-input{
        width:500px;
    }
    .block{
        display:block;
    }
</style>
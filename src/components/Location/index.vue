<template>
    <el-cascader v-model="selected" :options="provinces" :show-all-levels="true" :change-on-select="true" @change="changeLocation"></el-cascader>
</template>
<script>
    import {getLocation} from "@/api/location"
    export default{
        props:{
            province_id:Number,
            city_id:Number
        },
        data(){
            return {
                provinces:[],
                selected:[]
            }
        },
        methods:{
            changeLocation(val){
                var [province_id,city_id]=val
                this.$emit("update:province_id",province_id)
                this.$emit("update:city_id",city_id)
            }
        },
        created(){
            getLocation().then(data=>{
                this.provinces=[];
                data.forEach(item=>{
                    var province={label:item.name,value:item.id,children:[]}
                    item.province_city.forEach(city=>{
                        province.children.push({label:city.name,value:city.cityid})
                    })
                    this.provinces.push(province)
                })
                if(this.province_id && this.city_id)
                    this.selected.push(this.province_id,this.city_id)
                console.log(this.provinces)
            })
        }
    }
</script>
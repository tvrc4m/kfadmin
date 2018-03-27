export default{
    data(){
        return {
            type:1,
            type_name:''
        }
    },
    created(){
        console.log(this.$route.params)
         var [_,type,_]=this.$route.fullPath.split("/")
         if(['legal','emotion','preposing'].indexOf(type)==-1){
            this.$message({
                message:"未指定问题类型",
                type:"error"
            })
            this.$router.push("/")
         }
        // 获取问题集类型，emotion指情感 law指法律
        switch(type){
            case 'legal':this.type=1;break;
            case 'emotion':this.type=2;break;
            case 'preposing':this.type=3;break;
        }
        this.type_name=type
        console.log('mixin',this.type,this.type_name)
    }
}
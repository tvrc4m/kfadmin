<template>
    <div>
        <h1>dashboard components</h1>
    </div>
</template>
<script>
    export default{
        name:"dashboard",
        created(){
            console.log("http request")
            this.$http.get("/appapi/channel/getList",{params:{name:"tvrc4m"}}).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
            })
        }
    }
</script>
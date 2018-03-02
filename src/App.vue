<template>
    <div id="app">
        <el-container>
            <el-header height="60px">
                <top></top>
            </el-header>
            <el-container>
                <el-aside width="300px">
                    <slider></slider>
                </el-aside>
                <el-main>
                    <router-view name="default"></router-view>        
                </el-main>
            </el-container>
            
            <el-footer height="40px"></el-footer>
        </el-container>
    </div>
</template>

<script>
    import slider from "./components/navbar/slider.vue"
    import top from "./components/navbar/header.vue"
    export default{
        name: 'APP',
        components:{slider,top}
    }
</script>
<style lang="scss">
</style>
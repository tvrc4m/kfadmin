<template>
    <div id="app">
        <el-container>
            <el-header  v-if="show" height="60px">
                <top></top>
            </el-header>
            <el-container>
                <el-aside v-if="show" width="300px">
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
        name: 'app',
        components:{slider,top},
        data(){
            return {
                show:!!this.$store.state.user.auth_key
            }
        }
    }
</script>
<style lang="scss">
</style>
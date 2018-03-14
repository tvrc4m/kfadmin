<template>
<<<<<<< HEAD
    <div id="app">
        <el-container>
            <el-container>
                <el-aside v-if="show">
                    <slider></slider>
                </el-aside>
            </el-container>
            <el-container>
                <el-header  v-if="show" height="60px">
                    <top></top>
                </el-header>
                <el-main>
                    <router-view name="default"></router-view>        
                </el-main>
                <el-footer height="40px"></el-footer>
            </el-container>
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
=======
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: 'App'
  }
</script>
>>>>>>> 8a7a055b990a75524427781702359240cf9a8698

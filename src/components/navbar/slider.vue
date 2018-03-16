<template>
  <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-menu-item index="0" @click="isCollapse=!isCollapse">
      <i class="el-icon-menu"></i>
      <span>折叠</span>
    </el-menu-item>
    <el-menu-item index="/dashboard">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/dashboard">
      <i class="el-icon-menu"></i>
      <span slot="title">用户提问</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">数据库</span>
      </template>
      <el-menu-item index="/law">
        <span slot="title">法规库</span>
      </el-menu-item>
      <el-menu-item index="/case">
        <span slot="title">案例库</span>
      </el-menu-item>
      <el-menu-item index="/question">
        <span slot="title">法律问题</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/dashboard">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">专家库</span>
      </template>
      <el-menu-item index="emotion">
        <span slot="title">情感专家</span>
      </el-menu-item>
      <el-menu-item index="law">
        <span slot="title">律师</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/dashboard">
      <i class="el-icon-menu"></i>
      <span slot="title">过滤词库</span>
    </el-menu-item>
    <el-menu-item index="admin">
      <i class="el-icon-menu"></i>
      <span slot="title">后台账户</span>
    </el-menu-item>
  </el-menu>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
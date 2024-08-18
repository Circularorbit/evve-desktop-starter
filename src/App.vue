<script setup lang="ts">
import {useMenuStore} from "./store";
import HeadView from "@/views/layout/HeadView.vue";
import AsideView from "@/views/layout/AsideView.vue"
import MainView from "@/views/layout/MainView.vue"
const menuStore = useMenuStore()

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header><HeadView></HeadView></el-header>
      <el-container>
        <el-aside :width="menuStore.isCollapse ? 'auto' : '150px'">
          <el-scrollbar class="adaption"><AsideView/></el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar class="adaption">
            <MainView/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-container, .el-header, .el-aside, .el-main, .el-scrollbar.adaption {
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
}
.el-scrollbar.adaption, .el-aside, .el-main {
  height: calc(100vh - 60px);
}
</style>

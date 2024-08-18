<script setup lang="ts">
import {watch, computed} from "vue";
import {Calendar, HomeFilled} from '@element-plus/icons-vue'
import {useMenuStore} from "@/store";
import router from "@/router";
const menuStore = useMenuStore()

const currActive = computed(() => menuStore.currMenuIndex)

watch(router.currentRoute, (newValue, oldValue) => {
  const path = newValue.path
  menuStore.changeMenuIndex(path)

  // add home and setting active style
  if (path == '/home') {
    document.querySelector('#app-name')?.setAttribute('class', 'is-active')
    document.querySelector('#setting-icon')?.setAttribute('class', '')
  } else if (path == '/setting') {
    document.querySelector('#app-name')?.setAttribute('class', '')
    document.querySelector('#setting-icon')?.setAttribute('class', 'is-active')
  } else {
    document.querySelector('#app-name')?.setAttribute('class', '')
    document.querySelector('#setting-icon')?.setAttribute('class', '')
  }
})

</script>

<template>
    <el-menu
        ref="menu"
        :collapse="menuStore.isCollapse"
        :collapse-transition="false"
        :default-active="currActive"
        router
    >
      <el-menu-item index="/home" route="/home" v-show="false">
        <el-icon><HomeFilled/></el-icon>
        <template #title>HOME</template>
      </el-menu-item>
      <el-menu-item index="/menu1" route="/menu1">
        <el-icon><Calendar/></el-icon>
        <template #title>MENU1</template>
      </el-menu-item>
      <el-menu-item index="/menu2" route="/menu2">
        <el-icon><Calendar/></el-icon>
        <template #title>MENU2</template>
      </el-menu-item>
      <el-menu-item index="/menu3" route="/menu3">
        <el-icon><Calendar/></el-icon>
        <template #title>MENU3</template>
      </el-menu-item>
      <el-menu-item index="/setting" route="/setting" v-show="false">
        <el-icon><Calendar/></el-icon>
        <template #title>MENU4</template>
      </el-menu-item>
    </el-menu>
</template>

<style scoped>
</style>
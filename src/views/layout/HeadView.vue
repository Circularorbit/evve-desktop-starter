<script setup lang="ts">
import {Close, Expand, Files, Fold, FullScreen, Minus, MoonNight, Setting, Sunrise} from "@element-plus/icons-vue";
import {useMenuStore} from "@/store";
import {useDark, useToggle} from '@vueuse/core' /* 暗黑主题切换 */
import $route from "@/router"

// START 暗黑主题切换
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  initialValue: 'auto'
})
const toggleDark = useToggle(isDark)
// END 暗黑主题切换 END

// 窗口管理
const menuStore = useMenuStore()

// 只能先声明再使用，不能直接在@click中使用
const closeWin = window.electronAPI.closeWin
const maximize = window.electronAPI.maximize
const minimize = window.electronAPI.minimize

window.electronAPI.updateMaxState((value) => {
  menuStore.isMaximize = value
})

const searchInput = ref()

</script>

<template>
  <el-row id="nav-bar">
    <el-col :span="6" id="nav-left" @click="$route.push({path: '/home'})">
      <div id="brand">
        <img id="app-logo" src="/electron-vite.png"/>
        <span id="app-name">Software name</span>
      </div>
    </el-col>
    <el-col :span="10" id="nav-mid">
      <el-input placeholder="search" style="-webkit-app-region: no-drag;" v-model="searchInput"></el-input>
    </el-col>
    <el-col :span="8" id="nav-right">
      <el-tooltip :content="menuStore.isCollapse ? 'expand' : 'fold'" placement="bottom">
        <el-icon :size="18" color="#b0b0b0" @click="menuStore.toggleCollapse">
          <Expand v-show="menuStore.isCollapse"/>
          <Fold v-show="!menuStore.isCollapse"/>
        </el-icon>
      </el-tooltip>
      <el-tooltip :content="isDark ? 'light' : 'dark'" placement="bottom">
        <el-icon :size="18" @click="toggleDark()" color="#b0b0b0">
          <Sunrise v-show="isDark"/>
          <MoonNight v-show="!isDark"/>
        </el-icon>
      </el-tooltip>
      <el-tooltip content="setting" placement="bottom">
        <el-icon :size="18" color="#b0b0b0" @click="$route.push({path: '/setting'})">
          <Setting id="setting-icon"/>
        </el-icon>
      </el-tooltip>
      <el-divider direction="vertical" color="#b0b0b0"/>
      <el-tooltip content="minimize" placement="bottom">
        <el-icon :size="18" color="#b0b0b0" @click="minimize">
          <Minus/>
        </el-icon>
      </el-tooltip>
      <el-tooltip :content="menuStore.isMaximize ? 'restore': 'maximize'" placement="bottom">
        <el-icon :size="18" color="#b0b0b0" @click="maximize">
          <FullScreen v-show="!menuStore.isMaximize"/><Files v-show="menuStore.isMaximize"/>
        </el-icon>
      </el-tooltip>
      <el-tooltip content="close" placement="bottom">
        <el-icon :size="18" color="#b0b0b0" @click="closeWin">
          <Close/>
        </el-icon>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>
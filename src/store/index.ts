import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menuStore', {
    state: () => {
        return {
            isMaximize: false,
            isCollapse: false,
            currMenuIndex: '/home'
    }},
    getters: {
    },
    actions: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        changeMenuIndex(value: string) {
            this.currMenuIndex = value
        }
    }
})
/// <reference types="vite/client" />

import {DefineComponent} from "vue";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

export interface IElectronAPI {
  closeWin: () => Promise<void>;
  maximize: () => Promise<void>
  minimize: () => Promise<void>
  updateMaxState(param: (value) => void): void;
}
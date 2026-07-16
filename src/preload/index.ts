import { contextBridge,ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CategoryDto, CreateCategoryRequest } from '../shared/category'
import { CreateMenuAddonRequest, CreateMenuItemRequest, MenuAddonDto, MenuItemDto } from '../shared/menu'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      category: {
        getAll: () => 
          ipcRenderer.invoke("category:getAll"),

        create: (category: CreateCategoryRequest) => 
          ipcRenderer.invoke("category:create", category),

        update: (category: CategoryDto) => 
          ipcRenderer.invoke("category:update", category),
        
        delete: (id: string) => 
          ipcRenderer.invoke("category:delete", id)
      },

      menu: {
        getByCategory: (categoryId: string) =>
          ipcRenderer.invoke("menu:getByCategory", categoryId),

        getAddons: (menuItemId: string) =>
          ipcRenderer.invoke("menu:getAddons", menuItemId),

        getAll: () =>
          ipcRenderer.invoke("menu:getAll"),

        create: (menu: CreateMenuItemRequest) => 
          ipcRenderer.invoke("menu:create", menu),

        update: (menu: MenuItemDto) => 
          ipcRenderer.invoke("menu:update", menu),
        
        delete: (id: string) => 
          ipcRenderer.invoke("menu:delete", id),

        addon: {
          create: (addon: CreateMenuAddonRequest) =>
            ipcRenderer.invoke("menu:addon:create", addon),

          update: (addon: MenuAddonDto) =>
            ipcRenderer.invoke("menu:addon:update", addon),

          delete: (id: string) =>
            ipcRenderer.invoke("menu:addon:delete", id),
        }
      },
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

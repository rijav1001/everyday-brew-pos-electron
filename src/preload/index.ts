import { contextBridge,ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CategoryDto, CreateCategoryRequest } from '../shared/category'
import { CreateMenuAddonRequest, CreateMenuItemRequest, MenuAddonDto, MenuItemDto } from '../shared/menu'
import { CompletedOrderDto } from '../shared/order'
import { ReportFilterDto } from '../shared/report'
import { ReportExportDto } from '../shared/reportExport'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      // categories
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

      // menus
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

      // orders
      order: {
        getNextBillNumber: () =>
          ipcRenderer.invoke("order:getNextBillNumber"),

        save: (order: CompletedOrderDto) =>
          ipcRenderer.invoke("order:save", order),

        getHistory: () =>
          ipcRenderer.invoke("order:getHistory"),

        getDetails: (id: string) =>
          ipcRenderer.invoke("order:getDetails", id),
      },

      // receipt printing
      receipt: {
        print: (orderId: string) =>
          ipcRenderer.invoke("receipt:print", orderId),
      },

      // dashboard
      dashboard: {
        getSummary: () =>
          ipcRenderer.invoke("dashboard:getSummary"),

        getPaymentMethodSummary: () =>
          ipcRenderer.invoke("dashboard:getPaymentMethodSummary"),

        getTopSellingItems: () =>
          ipcRenderer.invoke("dashboard:getTopSellingItems"),

        getRecentOrders: () =>
          ipcRenderer.invoke("dashboard:getRecentOrders"),

        getHourlySales: () =>
          ipcRenderer.invoke("dashboard:getHourlySales"),
      },

      reports: {
        getReportSummary: (filter: ReportFilterDto) =>
          ipcRenderer.invoke("reports:getSummary", filter),

        getReportChart: (filter: ReportFilterDto) =>
            ipcRenderer.invoke("reports:getChart", filter),

        getPaymentBreakdown: (filter: ReportFilterDto) =>
          ipcRenderer.invoke("reports:getPaymentBreakdown", filter),

        getTopSellingItems: (filter: ReportFilterDto) =>
          ipcRenderer.invoke("reports:getTopSellingItems", filter),

        getOrderHistory: (filter: ReportFilterDto) =>
          ipcRenderer.invoke("reports:getOrderHistory", filter),

        saveCsv: (report: ReportExportDto) =>
          ipcRenderer.invoke("reports:saveCsv", report),

        printReport: () =>
          ipcRenderer.invoke("reports:printReport"),
      }
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

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

const api = {
    addTask: (title) => ipcRenderer.invoke('tasks:add', title),
    deleteTask: (id) => ipcRenderer.invoke('tasks:delete', id),
    markComplete: (params) => ipcRenderer.invoke('tasks:markComplete', params),
    getAllTasks: () => ipcRenderer.invoke('tasks:getAll'),
    editTask: (params) => ipcRenderer.invoke('tasks:edit', params)
}
contextBridge.exposeInMainWorld('api', api)
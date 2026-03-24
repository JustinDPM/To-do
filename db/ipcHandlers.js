import { ipcMain } from "electron";

export default function setUpHandlers(db){
    ipcMain.handle('tasks:add',(_, title) => {
        return db.addTask(title);
    })

    ipcMain.handle('tasks:delete',(_, id) => {
        return db.deleteTask(id);
    })
 
    ipcMain.handle('tasks:markComplete', (_, {id,completed}) => {
        return db.markComplete(id,completed);
    })

    ipcMain.handle('tasks:getAll', () => {
        return db.getAllTasks();
    })

    ipcMain.handle('tasks:edit', (_, {id,title}) => {
        return db.editTask(id, title);
    })

}

import './index.css';

 const taskInput = document.getElementById("task-input")
 const addTaskBtn = document.getElementById("add-task")
 const taskList = document.getElementById("task-list")




 const rendererTasks = async () =>  {
    const tasks = await window.api.getAllTasks();
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = task.title;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!task.completed;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "X"

      deleteBtn.addEventListener('click', async () =>{
        await window.api.deleteTask(task.id);
        rendererTasks();
      })

      checkbox.addEventListener('change', async () => {
        await window.api.markComplete({id:task.id, completed: checkbox.checked ? 1 : 0})
      })

      li.appendChild(span);
      li.appendChild(checkbox);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
      
    });
 }

  const handleAddTask = async () =>{
    const title = taskInput.value.trim()
    await window.api.addTask(title)
    rendererTasks()
  }
    
    addTaskBtn.addEventListener('click', handleAddTask);


 rendererTasks();
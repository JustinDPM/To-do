
import './index.css';

 const taskInput = document.getElementById("task-input")
 const addTaskBtn = document.getElementById("add-task")
 const taskList = document.getElementById("task-list")
 const dialog = document.getElementById("dialog-tasks")
 const dialoTitle = document.getElementById("dialog-title")
 const confirm = document.getElementById("confirm")
 const cancel = document.getElementById("cancel")

 let mode = "";
 let actualID = null;

 const rendererTasks = async () =>  {
    const tasks = await window.api.getAllTasks();
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = "task-item"

      const subMenu = document.createElement('ul');
      subMenu.className = "sub-menu"

      subMenu.innerHTML = `
        <li class="submenu-item edit">Editar</li>
        <li class="submenu-item delete">Eliminar</li>
      `;

      const elimateBtn = subMenu.querySelector('.delete');
      const editBtn = subMenu.querySelector('.edit');

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        if(e.target.tagName === "INPUT") return;
        if(e.target.closest('.sub-menu')) return;
        subMenu.classList.toggle("is-active");
      })

      taskList.addEventListener("mouseleave", () => {
        document.querySelectorAll('.sub-menu').forEach(menu => {
          menu.classList.remove("is-active");
       }); 
      });
      
      const span = document.createElement('span');
      span.textContent = task.title;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!task.completed;

      elimateBtn.addEventListener('click', async () => {
        await window.api.deleteTask(task.id);
        rendererTasks();
      })

    editBtn.addEventListener('click', () => {
      mode = 'edit'
      actualID = task.id
      taskInput.value = task.title; 
      dialoTitle.textContent = "Edit task";
      dialog.showModal();
    });

    checkbox.addEventListener('change', async () => {
      await window.api.markComplete({id:task.id, completed: checkbox.checked ? 1 : 0})
      console.log(task.id)
    })

      li.appendChild(span);
      li.appendChild(checkbox);
      li.appendChild(subMenu);
      taskList.appendChild(li);
       
    });
 }
  confirm.onclick = async () => {
    let title = taskInput.value.trim()
    if (mode === 'edit'){
      await window.api.editTask({id:actualID,title:title});
      rendererTasks();
    } 
    if (mode === 'add'){
      await window.api.addTask(title);
      rendererTasks();
    }
    rendererTasks();
    dialog.close();
  };
    
  addTaskBtn.addEventListener('click', () => {
    mode = 'add'
    taskInput.value = "";
    dialoTitle.textContent = "New Task"
    dialog.showModal()  
  });

  cancel.addEventListener('click', () => dialog.close());

 rendererTasks();
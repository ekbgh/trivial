const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask)
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks)
  // Filter Tasks Event
  filter.addEventListener('input', filterTasks)
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(function(task) {

    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

  li.appendChild(link);
  // li.innerHTML = `${taskInput.value} <a class = 'delete-item secondary-content'><i class='fa fa-remove'></i></a>`
  taskList.appendChild(li);
  })
  }
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a Task");
    return
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  li.appendChild(link);
  // li.innerHTML = `${taskInput.value} <a class = 'delete-item secondary-content'><i class='fa fa-remove'></i></a>`
  taskList.appendChild(li);
  storeTasksInLocaleStorage(taskInput.value)
  taskInput.value = "";
}

//Store in localStorage
function storeTasksInLocaleStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
     if (confirm(`Are you sure you want to remove '${e.target.parentElement.parentElement.textContent}'?`)) {
      e.target.parentElement.parentElement.remove()

      //Remove fron localStorage()
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
     }
  }
}

  //Remove from Local Storage
  function removeTaskFromLocalStorage(task) {
    let tasks;
    const removeItem = task.textContent;
    if (localStorage.getItem('tasks') !== null) {
      tasks = JSON.parse(localStorage.getItem('tasks'))
      tasks.forEach(function(task,index) {
        if (task === removeItem) {
           tasks.splice(index,1);
        }
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

function clearTasks(e) {
  // taskList.innerHTML = ''
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  localStorage.clear()
}

function filterTasks(e) {
  const item = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function(task) {
    if (task.textContent.toLowerCase().includes(item)) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}
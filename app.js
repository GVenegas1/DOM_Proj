const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {

    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event 
    form.addEventListener('submit', addTask);

    //Remove task event 
    taskList.addEventListener('click', removeTask);

    //Clear task event 
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event 
    filter.addEventListener('keyup', filterTasks);
}

//Get Task From US 
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('task'));
    }
    tasks.forEach(function (task) {
        //  Creat li element 
        const li = document.createElement('li');

        // Add Class 
        li.className = 'collection-item';

        //Creat Text node and append to li 
        li.appendChild(document.createTextNode(task));

        //Creat New link element 
        const link = document.createElement('a');

        //Add class
        link.className = 'delete-item secondary-content';

        //Add icon HTML
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //Append  the link to li 
        li.appendChild(link);

        //Append li to ul 
        taskList.appendChild(li);

    });
}
//Add Task 
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //  Creat li element 
    const li = document.createElement('li');

    // Add Class 
    li.className = 'collection-item';

    //Creat Text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    //Creat New link element 
    const link = document.createElement('a');

    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append  the link to li 
    li.appendChild(link);

    //Append li to ul 
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);


    //Clear input 
    taskInput.value = '';


    e.preventDefault();
}

//Store Task 
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('task'));
    }
    task.push(task);

    localStorage.setItem('item', JSON.stringify(tasks));
}

//Remove Task 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

        //Remove from US
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS 
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('task'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
        task.splice( index , 1);
    }
    });
    localStorage.setItem('item' , JSON.stringify(tasks));
    
}
//Clear Task 
function clearTasks() {
    // taskList.innerHTML='';

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}
//CLear task from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.getElementsByClassName.display = 'block';

            } else {
                task.getElementsByClassName.display = 'none';
            }
        });
}
let tasks = [];

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let task = { id: Date.now(), text: taskText, completed: false };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function renderTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task =>
        filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
    );

    filteredTasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-800 p-3 my-2 rounded-md";
        li.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" class="mr-2" ${task.completed ? "checked" : ""} 
                    onclick="toggleTask(${task.id})">
                <span class="${task.completed ? "line-through text-gray-400" : ""}">${task.text}</span>
            </div>
            <div>
                <button onclick="editTask(${task.id})" class="bg-yellow-500 px-3 py-1 rounded-md">Edit</button>
                <button onclick="deleteTask(${task.id})" class="bg-red-500 px-3 py-1 rounded-md">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    let task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function editTask(id) {
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit your task:", task.text);
    if (newText !== null) {
        task.text = newText.trim();
        renderTasks();
    }
}

function filterTasks(filter) {
    renderTasks(filter);
}

// Initial render
renderTasks();

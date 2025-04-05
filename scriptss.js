
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (!Array.isArray(tasks)) {
    tasks = [];
}


function addTask() {
    const taskInput = document.getElementById("taskInput");
    const categorySelect = document.getElementById("category");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskInput.value,
        category: categorySelect.value,
        completed: false,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = ""; 
}


function clearAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}


function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    tasks.forEach((task, index) => {
        if (filter !== "all" && filter !== "Tasks Completed" && filter !== "Tasks Not Completed" && task.category !== filter) return;
        if (filter === "Tasks Completed" && !task.completed) return;
        if (filter === "Tasks Not Completed" && task.completed) return;

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox" onclick="toggleTaskCompletion(${index})" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">${task.text}</span> 
            <small>(${task.category})</small>
        `;

        taskList.appendChild(taskItem);
    });
}


function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function filterTasks(category) {
    renderTasks(category);
}


function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});


document.getElementById("toggleTheme").addEventListener("click", toggleTheme);

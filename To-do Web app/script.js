document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById("input-box");
    const pendingTasksList = document.getElementById("pending-tasks");
    const completedTasksList = document.getElementById("completed-tasks");

    function addTask() {
        if (inputBox.value.trim() === '') {
            alert("You must write something!");
        } else {
            const taskItem = createTaskElement(inputBox.value);
            pendingTasksList.appendChild(taskItem);
            inputBox.value = "";
            saveData();
        }
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.innerText = taskText;

        const completeButton = document.createElement("button");
        completeButton.innerText = 'Complete';
        completeButton.className = 'complete';
        completeButton.addEventListener('click', completeTask);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', deleteTask);

        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        return li;
    }

    function completeTask(event) {
        const taskItem = event.target.parentElement;
        taskItem.classList.add('completed');
        completedTasksList.appendChild(taskItem);
        event.target.remove(); // Remove the complete button after marking as complete
        saveData();
    }

    function deleteTask(event) {
        const taskItem = event.target.parentElement;
        taskItem.remove();
        saveData();
    }

    function saveData() {
        const pendingTasksHTML = pendingTasksList.innerHTML;
        const completedTasksHTML = completedTasksList.innerHTML;
        localStorage.setItem("pendingTasks", pendingTasksHTML);
        localStorage.setItem("completedTasks", completedTasksHTML);
    }

    function showTasks() {
        pendingTasksList.innerHTML = localStorage.getItem("pendingTasks") || '';
        completedTasksList.innerHTML = localStorage.getItem("completedTasks") || '';
        
        Array.from(pendingTasksList.getElementsByTagName('li')).forEach(taskItem => {
            taskItem.querySelector('.complete').addEventListener('click', completeTask);
            taskItem.querySelector('.delete').addEventListener('click', deleteTask);
        });
        
        Array.from(completedTasksList.getElementsByTagName('li')).forEach(taskItem => {
            taskItem.querySelector('.delete').addEventListener('click', deleteTask);
        });
    }

    document.getElementById("add-task-btn").addEventListener('click', addTask);
    showTasks();
});



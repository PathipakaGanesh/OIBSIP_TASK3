let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'task';
        listItem.innerHTML = `
            <div>
                <h3 class="${task.completed ? 'completed' : ''}">${task.title}</h3>
                <p>${task.description}</p>
                <span>${task.timestamp}</span>
            </div>
            <div>
                <button onclick="toggleTaskStatus(${task.id})" class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})" class="editBtn">Edit</button>
                <button onclick="deleteTask(${task.id})" class="deleteBtn">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedTasksList.appendChild(listItem);
        } else {
            pendingTasksList.appendChild(listItem);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const titleText = taskTitle.value.trim();
    const descriptionText = taskDescription.value.trim();

    if (titleText !== '') {
        const newTask = {
            id: tasks.length + 1,
            title: titleText,
            description: descriptionText,
            completed: false,
            timestamp: new Date().toLocaleString()
        };

        tasks.push(newTask);
        taskTitle.value = '';
        taskDescription.value = '';
        renderTasks();
    } else {
        alert('Please Enter Task.');
    }
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => (task.id === id ? {
        ...task,
        completed: !task.completed
    } : task));
    renderTasks();
}

function editTask(id) {
    const newTitle = prompt('Edit task title:', tasks.find(task => task.id === id).title);
    const newDescription = prompt('Edit task description:', tasks.find(task => task.id === id).description);

    if (newTitle !== null) {
        tasks = tasks.map(task => (task.id === id ? {
            ...task,
            title: newTitle,
            description: newDescription
        } : task));
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

renderTasks();


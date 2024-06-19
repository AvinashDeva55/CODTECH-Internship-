document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));

    document.getElementById('add-task').addEventListener('click', function() {
        const taskInput = document.getElementById('new-task');
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            addTask(taskText, false);
            saveTask(taskText, false);
            taskInput.value = '';
        }
    });

    document.getElementById('new-task').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('add-task').click();
        }
    });

    function addTask(taskText, completed) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', function() {
            taskItem.classList.toggle('completed', checkbox.checked);
            updateTask(taskText, checkbox.checked);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            removeTask(taskText);
        });

        taskItem.prepend(checkbox);
        taskItem.appendChild(deleteButton);
        taskItem.classList.toggle('completed', completed);
        taskList.appendChild(taskItem);
    }

    function saveTask(taskText, completed) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: completed });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(taskText, completed) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.text === taskText ? { text: taskText, completed: completed } : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

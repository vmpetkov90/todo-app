// =========================================
// TASK COUNTER
// =========================================

function updateTasksLeft() {
    const tasks = document.querySelectorAll('li');
    let count = 0;

    for (const task of tasks) {
        if (!task.classList.contains('completed')) {
            count++;
        }
    }

    document.querySelector('#tasks-left span').textContent = count;
}

updateTasksLeft();


// =========================================
// EVENT DELEGATION FOR TOGGLING TASKS
// =========================================

document.addEventListener("click", function (e) {

    const li = e.target.closest('li');
    if (!li) return;

    li.classList.toggle('completed');
    updateTasksLeft();

    // If a filter is active, reapply it
    const activeFilter = document.querySelector('.filter.active');
    if (activeFilter) {
        applyFilter(activeFilter.id);
    }
});


// =========================================
// CLEAR COMPLETED TASKS
// =========================================

document.querySelector('#clear-completed')
    .addEventListener('click', function () {

        const completed = document.querySelectorAll('.completed');
        for (const task of completed) {
            task.remove();
        }

        updateTasksLeft();
    });


// =========================================
// FILTERING LOGIC
// =========================================

function clearActiveFilter() {
    document.querySelectorAll('.filter')
        .forEach(btn => btn.classList.remove('active'));
}

function applyFilter(filterId) {
    const tasks = document.querySelectorAll('li');

    for (const task of tasks) {
        task.style.display = 'block';

        if (filterId === 'show-active' && task.classList.contains('completed')) {
            task.style.display = 'none';
        }

        if (filterId === 'show-completed' && !task.classList.contains('completed')) {
            task.style.display = 'none';
        }
    }
}

// Filter buttons
document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', function () {
        clearActiveFilter();
        this.classList.add('active');
        applyFilter(this.id);
    });
});


// =========================================
// ADDING NEW TASKS
// =========================================

document.querySelector('#add-task')
    .addEventListener('click', function () {

        const input = document.querySelector('#new-task');
        const text = input.value.trim();

        if (text.length === 0) return;

        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-check"></i><span>${text}</span>`;

        document.querySelector('ul').appendChild(li);

        input.value = '';
        updateTasksLeft();

        // Reapply active filter
        const activeFilter = document.querySelector('.filter.active');
        if (activeFilter) {
            applyFilter(activeFilter.id);
        }
    });


// =========================================
// ENTER KEY SUBMISSION
// =========================================

document.querySelector('#new-task')
    .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            document.querySelector('#add-task').click();
        }
    });

console.log("JS LOADED ✅");

const API_URL = 'http://localhost:5000/api';

// ================= UTIL =================
const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user'));

const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
};

// ================= GLOBAL STATE =================
let allTasks = [];

// ================= RENDER =================
const renderTasks = (tasks) => {
    const list = document.getElementById('tasks-container');
    if (!list) return;

    list.innerHTML = '';

    if (tasks.length === 0) {
        list.innerHTML = `<p>No tasks found</p>`;
        return;
    }

    tasks.forEach(task => {
        const isCompleted = task.status === 'completed';

        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${isCompleted ? 'completed' : ''}`;

        taskEl.innerHTML = `
            <div>
                <h3>${capitalize(task.title)}</h3>
                <p>${task.description || ''}</p>
            </div>

            <div>
                <button class="complete-btn">
                    ${isCompleted ? 'Pending' : 'Complete'}
                </button>

                <button class="edit-btn">Edit</button>

                <button class="delete-btn">Delete</button>
            </div>
        `;

        // ✅ EVENTS (MOST IMPORTANT FIX)
        taskEl.querySelector('.complete-btn').onclick = () => {
            toggleStatus(task._id, task.status);
        };

        taskEl.querySelector('.edit-btn').onclick = () => {
            openEditModal(task._id);
        };

        taskEl.querySelector('.delete-btn').onclick = () => {
            deleteTask(task._id);
        };

        list.appendChild(taskEl);
    });
};

// ================= FETCH =================
const fetchTasks = async () => {
    try {
        const res = await fetch(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });

        const data = await res.json();

        if (res.ok) {
            allTasks = data;
            renderTasks(allTasks);
        }
    } catch (err) {
        console.error(err);
    }
};

// ================= ACTIONS =================
const toggleStatus = async (id, status) => {
    const newStatus = status === 'pending' ? 'completed' : 'pending';

    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ status: newStatus })
    });

    fetchTasks();
};

const deleteTask = async (id) => {
    console.log("DELETE:", id);

    if (!confirm('Delete this task?')) return;

    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
    });

    fetchTasks();
};

const openEditModal = (id) => {
    const task = allTasks.find(t => t._id === id);

    document.getElementById('edit-task-id').value = task._id;
    document.getElementById('edit-task-title').value = task.title;
    document.getElementById('edit-task-desc').value = task.description || '';
    document.getElementById('edit-task-status').value = task.status;

    document.getElementById('edit-modal').style.display = 'block';
};

// ================= INIT =================
const initDashboard = () => {
    const user = getUser();

    if (user) {
        document.getElementById('user-greeting').textContent =
            `Hello, ${user.name.split(' ')[0]}`;
    }

    fetchTasks();

    // ADD TASK
    document.getElementById('task-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;

        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                title: capitalize(title),
                description: capitalize(desc)
            })
        });

        e.target.reset();
        fetchTasks();
    });

    // LOGOUT
    document.getElementById('logout-btn').onclick = () => {
        localStorage.clear();
        window.location.href = 'index.html';
    };
};

// ================= ROUTER =================
if (window.location.pathname.includes('dashboard.html')) {
    initDashboard();
}
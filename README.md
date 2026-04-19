# 📝 Task Manager Application

A full-stack Task Management Web Application built as part of an internship assignment.  
It helps users create, update, delete, and track tasks efficiently.

---

## 🚀 Features

- User authentication (Register / Login)
- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Responsive UI for mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 📁 Project Structure
task-manager-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── index.html
│   ├── register.html
│   └── dashboard.html

---

## ⚙️ How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager-app.git

2. Setup Backend
Bash
cd backend
npm install
node server.js

3. Run Frontend
Open this file in browser:
frontend/index.html

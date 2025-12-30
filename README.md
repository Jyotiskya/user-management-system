# User Management System - Purple Merit Assessment

## Project Overview
A full-stack User Management System designed to handle secure authentication and user administration. This project features **JWT-based authentication**, **Role-Based Access Control (RBAC)**, and a responsive React frontend.

It was developed as part of the **Purple Merit Backend Intern Assessment**.

### Key Features
* **Secure Authentication:** User Signup & Login using JWT Tokens.
* **Role-Based Access Control:**
  * **Admin:** Can view all users, activate/deactivate accounts.
  * **User:** Can only view and update their own profile.
* **Database Management:** Cloud-hosted PostgreSQL database.
* **Responsive UI:** Built with React.js for a seamless experience.

---

## Live Deployment Links

| Service | Status | Link |
| :--- | :--- | :--- |
| **Frontend (Website)** | 🟢 Live | [View Live Site](https://user-management-system-xi-blue.vercel.app/) |
| **Backend (API)** | 🟢 Live | [View API Server](https://user-management-system-eixh.onrender.com/) |

---

## Tech Stack

| Category | Technologies Used |
| :--- | :--- |
| **Backend** | Python 3, Flask, SQLAlchemy, Flask-JWT-Extended, Gunicorn |
| **Frontend** | React.js, Axios, React Router DOM, CSS3 |
| **Database** | PostgreSQL (Hosted on Render) |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Tools** | Git, Postman, VS Code |

---

## ⚙️ Local Setup Guide

Follow these steps to run the project locally on your machine.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Jyotiskya/user-management-system
cd User-Management-System
```

### 2️⃣ Backend Setup

Navigate to the backend folder and set up the Python environment.

```bash
# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows:
venv\Scripts\activate
# For Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure Environment Variables:**

Create a `.env` file inside the `backend/` folder and add the following:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>/<dbname>
JWT_SECRET_KEY=<your_generated_secret_key>
FLASK_APP=run.py
FLASK_DEBUG=True
```

**Run Database Migrations & Start Server:**

```bash
flask db init
flask db migrate
flask db upgrade
python run.py
```

*Backend runs at: `http://localhost:5000`*

### 3️⃣ Frontend Setup

Open a new terminal and navigate to the frontend folder.

```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React App
npm start
```

*Frontend runs at: `http://localhost:3000`*

---

## 📡 API Documentation

### 📌 Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Login and get Token | ❌ No |
| `GET` | `/api/users/?page=1` | Get all users (Admin) | ✅ Yes |
| `PATCH` | `/api/users/<id>/status` | Activate/Deactivate User | ✅ Yes |
| `PUT` | `/api/users/update` | Update Profile | ✅ Yes |

### 📖 Request Examples

#### 1. Signup (Register)

**URL:** `/api/auth/signup`

**Body:**
```json
{
  "full_name": "test",
  "email": "test@purplemerit.com",
  "password": "Test@123"
}
```

#### 2. Login

**URL:** `/api/auth/login`

**Body:**
```json
{
  "email": "admin@purplemerit.com",
  "password": "Admin@123"
}
```

#### 3. Update User Status (Admin Only)

**URL:** `/api/users/2/status`

**Headers:** `Authorization: Bearer <your_token>`

**Body:**
```json
{
  "status": "inactive"
}
```

---

## Project Structure

```
User-Management-System/
├── backend/
│   ├── app/
│   ├── venv/
│   ├── .env
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── api.js
│   ├── public/
│   └── package.json
└── README.md
```

---

## 👨‍💻 Author

**Jyoti Shakya**  
*Aspiring Software Developer*

---


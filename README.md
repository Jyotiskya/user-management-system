# Purple Merit - User Management System

## Project Overview
A full-stack User Management System featuring JWT authentication, Role-Based Access Control (Admin/User), and user lifecycle management. Built for the Purple Merit Backend Intern Assessment.

## Tech Stack 
- **Backend:** Python (Flask), SQLAlchemy, Flask-JWT-Extended
- **Frontend:** React.js, Axios, React Router
- **Database:** PostgreSQL (Cloud-hosted)

## Live Deployment Links 
- **Frontend:** [Link to your Vercel deployment]
- **Backend:** [Link to your Render deployment]
- **API Docs:** [Link to Postman Collection]

## Setup Instructions

### Backend
1. `cd backend`
2. Create virtual env: `python -m venv venv`
3. Activate: `source venv/bin/activate` (Mac/Linux) or `venv\Scripts\activate` (Windows)
4. Install: `pip install -r requirements.txt`
5. Create `.env` file (see below).
6. Run migrations: `flask db init`, `flask db migrate`, `flask db upgrade`
7. Start server: `python run.py`

### Frontend
1. `cd frontend`
2. Install: `npm install`
3. Start: `npm start`

## Environment Variables (.env) 
**Backend:**
- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `FLASK_APP`
- `FLASK_DEBUG`

## API Endpoints 
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/users/` | Get all users (Admin) | Yes |
| PATCH | `/api/users/<id>/status` | Activate/Deactivate | Yes |

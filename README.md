# Ankush Singh - Portfolio (Modern Stack)

A premium portfolio built with **React** (Frontend) and **FastAPI** (Backend).

## Project Structure
- `/frontend`: React + Vite + Framer Motion (Premium UI)
- `/backend`: FastAPI + SQLAlchemy + SQLite (High-performance API)

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---
*Note: If you encounter disk space issues on the C: drive, use the D: drive for npm cache:*
`$env:npm_config_cache='D:\npm-cache'`

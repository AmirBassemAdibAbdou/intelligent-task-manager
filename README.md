# Intelligent Task Manager

A full-stack task management application with AI-powered chat assistance.

## Features

- **Task Management**: Create, read, update, and delete tasks with priority and status tracking
- **AI Chatbot**: Ask questions about your tasks using Gemini AI
- **Real-time Updates**: Instant task synchronization
- **Modern UI**: Clean and responsive interface

## Tech Stack

### Backend
- NestJS
- MongoDB with Mongoose
- Gemini AI API
- TypeScript

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Gemini API Key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd intelligent-task-manager
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Set up environment variables:

Create `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/task-manager
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

### Running the Application

1. Start the backend:
```bash
cd backend
npm run start:dev
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3001 in your browser

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a task by ID
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Chat
- `POST /chat/ask` - Ask the AI about your tasks

## Project Structure

```
intelligent-task-manager/
├── backend/
│   └── src/
│       ├── tasks/
│       ├── chat/
│       └── main.ts
└── frontend/
    └── app/
        ├── components/
        │   ├── TaskForm.tsx
        │   ├── TaskList.tsx
        │   ├── TaskItem.tsx
        │   └── Chatbot.tsx
        ├── types.ts
        └── page.tsx
```

## License

MIT

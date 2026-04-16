# 🧩 TaskFlow – Trello Clone

TaskFlow is a modern Kanban-style project management web application inspired by Trello. It enables users to manage tasks visually using boards, lists, and cards with smooth drag-and-drop interactions.

---

## 🚀 Tech Stack

- Frontend: Next.js (App Router)
- Styling: Tailwind CSS
- Backend/Database: Supabase (PostgreSQL)
- Drag & Drop: @hello-pangea/dnd

---

## ✨ Features

### 📌 Board & List Management
- View a board with multiple lists
- Create, edit, and delete lists
- Drag and drop to reorder lists

---

### 📋 Card Management
- Create cards with title
- Edit card title and description
- Delete cards
- Drag and drop cards:
  - Within the same list
  - Across different lists
- Maintain card order using position indexing

---

### 🧠 Card Details
- Add and remove labels (colored tags)
- Set due dates
- Add checklist items
- Mark checklist items as complete/incomplete
- Display checklist progress on cards

---

### 🔍 Search & Filter
- Search cards by title
- Filter cards by:
  - Labels
  - Due date
- Combine multiple filters for refined results

---

### 🎯 UI & UX
- Clean and modern Trello-inspired UI
- Smooth drag-and-drop experience
- Responsive layout
- Modal-based card editing
- Close modal via outside click or ESC key

---

## 🧠 Key Implementation Details

### 📊 Database Design

Relational schema:

boards → lists → cards

- Each board contains multiple lists  
- Each list contains multiple cards  

Additional fields used:
- position → maintains ordering for drag-and-drop
- labels → array of color tags
- due_date → deadline tracking
- checklist → JSON structure for task items

---

### 🔄 Drag & Drop Logic

- Built using @hello-pangea/dnd
- Supports:
  - Reordering lists
  - Reordering cards
  - Moving cards across lists
- Uses optimistic UI updates for smooth UX
- Syncs changes with Supabase after drag events

---

### ⚙️ State Management

- Custom React hook: useBoard
- Centralized state for:
  - board
  - lists
  - cards
- Minimizes unnecessary re-renders

---

## ⚙️ Setup Instructions

git clone <your-repo-link>  
cd taskflow  
npm install  
npm run dev  

---

### 🔑 Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url  
NEXT_PUBLIC_SUPABASE_KEY=your_publishable_key  

---

Open in browser:

http://localhost:3000

---

## 📊 Database Schema

### boards
- id
- title

### lists
- id
- title
- board_id
- position

### cards
- id
- title
- description
- list_id
- position
- labels (text[])
- due_date (date)
- checklist (jsonb)

---

## 📌 Assumptions

- No authentication (as per assignment)
- Single-user system
- Sample data used for demonstration

---

## 🚀 Future Improvements

- Assign members to cards
- File attachments
- Comments and activity logs
- Board background customization
- Real-time collaboration

---

## 🎯 Summary

TaskFlow implements a full-featured Kanban system with smooth drag-and-drop interactions, rich card details, and efficient database design. The project focuses on usability, performance, and scalable architecture.

---

## 👨‍💻 Author

Built with ❤️ by Amit
# 📘 Task Dashboard — SBA Project (React + TypeScript)
🧩 Overview
Task Dashboard is a fully interactive task‑management application built with React, TypeScript, Framer Motion, dnd‑kit, and DaisyUI.
It expands upon the original [lab assignment](https://github.com/chadgarc/lab9.3-list-keys) (which included only TaskList, TaskItem, TaskFilter, and SelectList) and evolves them into a complete, production‑style dashboard.

This project was developed as part of the Skill‑Based Assessment (SBA) for the React + TypeScript module at Per Scholas.
It demonstrates component composition, state lifting, controlled forms, validation, filtering, sorting, animations, and modular architecture.

You can visit this website [here](https://chadgarc.github.io/SBA-React-Dashboard-Application/)

## 🎯 SBA Requirements Covered

### ✔ Core React + TS Requirements
- Strong use of TypeScript types & interfaces
- Modular component architecture
- Controlled components for forms
- State lifting from children → parent
- useState and useEffect for state and side effects
- LocalStorage persistence
- Filtering, searching, sorting
- Reusable components (SelectList, TaskFilter, TaskItem, TaskList)

### ✔ Additional Enhancements (Beyond SBA)

- Framer Motion layout animations
- dnd‑kit drag‑and‑drop sorting
- DaisyUI styling for consistent UI
- Custom modal system using native <dialog>
- Full validation system
- Dashboard metrics panel
- Clean architecture with utilities (taskUtils.ts)
- Professional JSDoc documentation across the entire codebase

## 🚀 Tech Stack

- React 18
- TypeScript
- Framer Motion (layout + entry/exit animations)
- dnd‑kit (drag & drop sorting)
- DaisyUI + TailwindCSS
- LocalStorage for persistence

## 🏗️ Project Structure

```bash
src/
 ├── components/
 │   ├── Dashboard/
 │   │   └── Dashboard.tsx
 │   ├── TaskList/
 │   │   └── TaskList.tsx
 │   ├── TaskItem/
 │   │   └── TaskItem.tsx
 │   ├── TaskFilter/
 │   │   └── TaskFilter.tsx
 │   ├── SelectList/
 │   │   └── SelectList.tsx
 │   ├── SearchBar/
 │   │   └── SearchBar.tsx
 │   ├── SortBy/
 │   │   └── SortBy.tsx
 │   ├── Stat/
 │   │   └── Stat.tsx
 │   ├── Modal/
 │   │   └── Modal.tsx
 │   └── TaskForm/
 │       └── TaskForm.tsx
 │
 ├── App.tsx
 │
 ├── utils/
 │   └── taskUtils.ts
 │
 ├── types/
 │   └── index.ts
 │
 └── data/
     └── tasksData.ts
```

## ⚙️ Key Features

### 🔍 Search & Filter System

- Search by title or description
- Filter by status and priority
- Filters merge using partial updates
- Fully typed with FilterHandle

### 🔄 Sorting

#### Sort by:

- Default (ID)
- Priority (low → medium → high)
- Due date (ascending)

### 📝 Task Management

- Add new tasks
- Edit existing tasks
- Delete tasks
- Validation for:
- Title (≥ 5 chars)
- Description (≥ 10 chars)
- Due date (required)

### 📊 Dashboard Metrics

- Total tasks
- Pending
- In progress
- Completed

## 🎨 UI & Animations

- DaisyUI components

- Framer Motion:
    - layout animations for reordering
    - initial / animate / exit transitions

- dnd‑kit drag‑and‑drop sorting

## 🧠 What I Learned
This project significantly improved my understanding of React and TypeScript:

#### 🔹 Component Communication
I now understand how child components send data back to parents using callbacks, and how state lifting works in real applications.

#### 🔹 Controlled Forms
Managing newTask and selectedTask taught me how to keep form inputs fully controlled and predictable.

#### 🔹 useEffect
I learned how to:
- Sync state with localStorage
- Revalidate inputs when fields change
- Update metrics when tasks update

#### 🔹 TypeScript
I used:
- Interfaces
- Union types
- Generics (SelectList<T>)
- Strong typing for callbacks

#### 🔹 UI Libraries
- DaisyUI for quick, consistent styling
- Framer Motion for smooth transitions
- dnd‑kit for drag‑and‑drop sorting

#### 🔹 Architecture
I learned how to split logic into:
- Components
- Utility functions
- Types
- Data
- Reusable UI elements

## 🧪 How the App Works
1. Dashboard controls all state
It manages tasks, filters, search, sorting, modals, and metrics.

2. TaskList receives filtered tasks
It renders each task using TaskItem.

3. TaskItem handles status changes, edit, delete
It uses SelectList and dnd‑kit.

4. TaskForm + Modal handle add/edit
They use controlled inputs and validation.

5. taskUtils.ts centralizes logic
Filtering, sorting, validation, metrics, ID generation.

## 📦 Installation & Running
```bash
npm install
npm run dev
```

## 🏁 Final Thoughts
This SBA pushed me to build something more complete than the original lab.
I rewrote components, added new ones, improved architecture, and learned how React truly works under real conditions.

I’m proud of the final result, it’s clean, functional, animated, typed, and modular.
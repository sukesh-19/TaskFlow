# TaskFlow — Premium Task Management Application

A clean, modern, and responsive task management application built with React and Vite.

**Auspify Technologies — Frontend Developer Internship | Task 3**

TaskFlow helps users create, organize, prioritize, and track their daily tasks through an intuitive dashboard with progress statistics, due dates, and persistent browser storage.

## 🚀 Live Demo

- **Live Application:** https://taskflow-todo-pied-nu.vercel.app/
- **GitHub Repository:** https://github.com/sukesh-19/TaskFlow

## ✨ Features

- **Task Management:** Create, edit, and delete tasks with title, description, priority, category, and due date.
- **Completion Tracking:** Mark tasks as completed or active with a single click.
- **Search:** Search tasks by title, description, or category.
- **Filtering:** Filter tasks by status and priority.
- **Sorting:** Sort tasks by newest, oldest, due date, priority, or alphabetical order.
- **Dedicated Views:** Overview, All Tasks, Today, Upcoming, and Completed.
- **Dashboard Statistics:** View total, active, and completed tasks along with overall progress.
- **LocalStorage Persistence:** Keep tasks saved across page refreshes and browser restarts.
- **Theme Toggle:** Switch between light and dark themes.
- **Responsive Interface:** Adapt the layout for desktop, tablet, and mobile screens.
- **Accessible Interface:** Includes keyboard navigation, ARIA labels, and visible focus indicators.
- **Contextual Empty States:** Display helpful messages when no tasks match the selected view or filters.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| Vite 8 | Development server and build tool |
| JavaScript (JSX) | Application logic and components |
| CSS | Styling, responsive layouts, and design system |
| CSS Variables | Consistent design tokens and theme support |
| Lucide React | Icons |
| Browser LocalStorage | Persistent task and theme preferences |
| Vercel | Application deployment |
| Git and GitHub | Version control and source code hosting |

## 📸 Screenshots

### Overview Dashboard

<img width="1440" alt="TaskFlow overview dashboard" src="https://github.com/user-attachments/assets/08afeff7-af31-4772-a6d5-b0d78f0b01f7" />

### Task Management

<img width="1440" alt="TaskFlow task management interface" src="https://github.com/user-attachments/assets/e276218d-d550-4490-a2f5-de7d2e2fea16" />

### Task Creation and Editing

<img width="1207" alt="TaskFlow task form" src="https://github.com/user-attachments/assets/033d8f5e-55df-4c08-9a31-edf234457afa" />

### Task List and Filters

<img width="1440" alt="TaskFlow task list and filtering interface" src="https://github.com/user-attachments/assets/5f6c2b3b-e448-4b9f-9004-e7309b247004" />

### Mobile Responsive View

<img width="476" alt="TaskFlow mobile responsive interface" src="https://github.com/user-attachments/assets/516cad89-8c1b-4cb9-8d19-035b629d099f" />

## 📁 Project Structure

```text
TaskFlow/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── FilterBar.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskForm.jsx
│   │   ├── EmptyState.jsx
│   │   └── ConfirmationDialog.jsx
│   ├── hooks/
│   │   └── useTasks.js
│   ├── utils/
│   │   └── taskHelpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18 or later
- npm 9 or later
- Git

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/sukesh-19/TaskFlow.git
cd TaskFlow
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

`http://localhost:5173`

### Create a Production Build

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### Preview the Production Build

```bash
npm run preview
```

## ☁️ Deployment

TaskFlow is deployed using Vercel.

To deploy your own version:

1. Push the project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/).
3. Import the repository.
4. Use the following build settings:

   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Click **Deploy** and wait for the build to complete.

## 💾 LocalStorage

TaskFlow uses the browser's LocalStorage API to persist application preferences and task data.

| Key | Purpose |
|---|---|
| `taskflow-tasks` | Stores task data |
| `taskflow-theme` | Stores the selected theme preference |

Data is stored locally in the user's browser. The application does not require a backend server or database.

## ♿ Accessibility

The interface is designed with accessibility in mind, including:

- Semantic HTML elements.
- ARIA labels and roles where appropriate.
- Keyboard navigation support.
- Visible focus indicators.
- Task status and priority information that is not conveyed by color alone.
- Reduced-motion preferences where supported.

## 🎯 Internship Task

**Internship:** Frontend Developer Intern  
**Organization:** Auspify Technologies  
**Task:** Task 3 — Dynamic To-Do Application

This project demonstrates frontend development skills, component-based architecture, state management, responsive UI design, CRUD operations, filtering, sorting, and browser-based data persistence.

## 📄 License

This project is licensed under the MIT License.

---

**Built with React and Vite for the Auspify Technologies Frontend Developer Internship.**

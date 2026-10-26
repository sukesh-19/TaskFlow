# TaskFlow — Premium Task Management Application

> **Auspify Technologies Frontend Developer Internship — Task 3**

A clean, modern, production-quality task manager built with React + Vite. TaskFlow helps you create, organize, and track tasks with local persistence, priority management, due dates, and insightful progress stats.

---

## ✨ Features

- **Create, edit, and delete tasks** with title, description, priority, category, and due date
- **Toggle completion** status with a single click
- **Search** tasks by title, description, or category
- **Filter** by status (All / Active / Completed) and priority (High / Medium / Low)
- **Sort** by newest, oldest, due date, priority, or A→Z
- **Dedicated views** — Overview, All Tasks, Today, Upcoming, Completed
- **Dashboard statistics** — total, active, completed count, and progress bar
- **LocalStorage persistence** — tasks survive page refreshes and browser restarts
- **Dark / Light theme toggle** with preference saved to localStorage
- **Collapsible sidebar** with navigation and daily productivity tip
- **Fully responsive** — works on desktop, tablet, and mobile (≥ 320 px)
- **Accessible** — keyboard navigation, ARIA labels, visible focus indicators, semantic HTML
- **Empty states** tailored to each view and filter context

---

## 🛠 Technology Stack

| Technology | Role |
|---|---|
| React 19 | UI component library |
| Vite 8 | Build tool and dev server |
| JavaScript (JSX) | Language |
| CSS (Vanilla + CSS Variables) | Styling and design system |
| Lucide React | Iconography |
| Browser LocalStorage | Data persistence |

No backend, database, or paid service is required.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar with collapsible support
│   ├── Header.jsx           # Top bar with search, theme toggle, new task
│   ├── DashboardStats.jsx   # Stats cards and progress bar
│   ├── FilterBar.jsx        # Status, priority filters and sort
│   ├── TaskList.jsx         # Task list container
│   ├── TaskItem.jsx         # Individual task row
│   ├── TaskForm.jsx         # Create/edit task modal
│   ├── EmptyState.jsx       # Context-aware empty states
│   └── ConfirmationDialog.jsx  # Delete confirmation
├── hooks/
│   └── useTasks.js          # Task state management and LocalStorage sync
├── utils/
│   └── taskHelpers.js       # Pure utility functions
├── App.jsx                  # Root component and state orchestration
├── App.css                  # Component styles
├── index.css                # Global design system (CSS variables, reset)
└── main.jsx                 # React entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
git clone <your-repo-url>
cd TaskFlow
npm install
```

### Development

```bash
npm run dev
```

Opens at **http://localhost:5173**

### Production Build

```bash
npm run build
```

Output goes to the `dist/` directory.

### Preview production build locally

```bash
npm run preview
```

---

## 📸 Screenshots

> _Add screenshots here after capturing the app._

| View | Description |
|---|---|
| Overview | Dashboard with stats and progress |
| All Tasks | Full task list with filters and sort |
| Today | Tasks due today and overdue |
| Upcoming | Tasks due within the next 7 days |
| Mobile | Single-column responsive layout |

---

## ☁️ Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **New Project**.
3. Import your GitHub repository.
4. Vercel auto-detects Vite. Accept the defaults:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📤 Publishing to GitHub

```bash
git init
git add .
git commit -m "feat: initial TaskFlow implementation"
git branch -M main
git remote add origin https://github.com/<your-username>/taskflow.git
git push -u origin main
```

---

## 📝 LocalStorage

Tasks are stored in the browser under the key **`taskflow-tasks`**.  
Theme preference is stored under **`taskflow-theme`**.

No personal data, passwords, or tokens are stored.

---

## ♿ Accessibility

- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<aside>`, `<dialog>`)
- ARIA roles, labels, and live regions
- Full keyboard navigation
- Visible focus indicators
- Color contrast meets WCAG AA
- Priority and status conveyed via text, not color alone
- `prefers-reduced-motion` respected

---

## 📄 License

MIT © 2024 — Built for the Auspify Technologies Frontend Developer Internship

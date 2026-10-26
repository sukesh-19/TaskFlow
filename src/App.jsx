
import { useState, useMemo, useCallback, useEffect } from 'react';
import './index.css';
import './App.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmationDialog from './components/ConfirmationDialog';

import { useTasks } from './hooks/useTasks';
import { calcStats, filterTasks } from './utils/taskHelpers';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('taskflow-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('taskflow-theme', theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() =>
    setTheme(t => t === 'light' ? 'dark' : 'light'), []);

  return { theme, toggleTheme: toggle };
}

export default function App() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created-desc');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const stats = useMemo(() => calcStats(tasks), [tasks]);
  const effectiveView = useMemo(() => {
    if (activeView === 'overview') return statusFilter;
    if (activeView === 'all') return statusFilter;
    return activeView;
  }, [activeView, statusFilter]);
  const filteredTasks = useMemo(() =>
    filterTasks(tasks, { view: effectiveView, search, priority: priorityFilter, sortBy }),
    [tasks, effectiveView, search, priorityFilter, sortBy]
  );

  const handleNewTask = useCallback(() => {
    setEditingTask(null);
    setShowTaskForm(true);
  }, []);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  }, []);

  const handleSaveTask = useCallback((formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  }, [editingTask, addTask, updateTask]);

  const handleCloseForm = useCallback(() => {
    setShowTaskForm(false);
    setEditingTask(null);
  }, []);

  const handleDeleteRequest = useCallback((task) => {
    setDeletingTask(task);
  }, []);

  const handleConfirmDelete = useCallback((id) => {
    deleteTask(id);
    setDeletingTask(null);
  }, [deleteTask]);

  const handleCancelDelete = useCallback(() => {
    setDeletingTask(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortBy('created-desc');
  }, []);

  const handleViewChange = useCallback((view) => {
    setActiveView(view);
    if (view !== 'all' && view !== 'overview') {
      setStatusFilter('all');
    }
  }, []);
  useEffect(() => {
    const isModalOpen = showTaskForm || Boolean(deletingTask);
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showTaskForm, deletingTask]);

  const showDashboard = activeView === 'overview';

  return (
    <div className="app-shell">
      
      <Sidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        stats={stats}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          activeView={activeView}
          search={search}
          onSearchChange={setSearch}
          onNewTask={handleNewTask}
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuToggle={() => setMobileSidebarOpen(o => !o)}
        />

        <main id="main-content" className="page-content" aria-label="Main content">
          {showDashboard && (
            <DashboardStats
              stats={stats}
              onNewTask={handleNewTask}
            />
          )}

          <FilterBar
            activeView={activeView}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filteredTasks.length}
            totalCount={tasks.length}
          />

          
          <TaskList
            tasks={filteredTasks}
            allTasksCount={tasks.length}
            view={activeView === 'all' || activeView === 'overview' ? statusFilter : activeView}
            search={search}
            onToggle={toggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteRequest}
            onNewTask={handleNewTask}
            onClearFilters={handleClearFilters}
          />
        </main>
      </div>

      
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseForm}
        />
      )}

      
      {deletingTask && (
        <ConfirmationDialog
          task={deletingTask}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

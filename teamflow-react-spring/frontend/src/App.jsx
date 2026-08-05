import { useCallback, useEffect, useState } from 'react';
import { taskApi } from './api.js';
import Header from './components/Header.jsx';
import Stats from './components/Stats.jsx';
import Filters from './components/Filters.jsx';
import TaskBoard from './components/TaskBoard.jsx';
import TaskForm from './components/TaskForm.jsx';

const emptyStats = { total: 0, active: 0, overdue: 0, completed: 0 };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(emptyStats);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [taskData, statData] = await Promise.all([
        taskApi.list(filters),
        taskApi.stats()
      ]);
      setTasks(taskData);
      setStats(statData);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(loadData, 180);
    return () => clearTimeout(timeout);
  }, [loadData]);

  async function saveTask(task) {
    try {
      setError('');
      if (selectedTask) {
        await taskApi.update(selectedTask.id, task);
      } else {
        await taskApi.create(task);
      }
      setIsFormOpen(false);
      setSelectedTask(null);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function deleteTask(id) {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskApi.remove(id);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function openCreateForm() {
    setSelectedTask(null);
    setIsFormOpen(true);
  }

  function openEditForm(task) {
    setSelectedTask(task);
    setIsFormOpen(true);
  }

  return (
    <div className="app-shell">
      <Header onCreate={openCreateForm} />
      <main className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">Delivery workspace</span>
            <h1>Plan work. Track progress. Ship with confidence.</h1>
            <p>One focused dashboard for priorities, ownership, deadlines, and delivery status.</p>
          </div>
        </section>

        <Stats stats={stats} />
        <Filters filters={filters} onChange={setFilters} />

        {error && <div className="alert" role="alert">{error}</div>}
        {loading ? (
          <div className="empty-state">Loading tasks…</div>
        ) : (
          <TaskBoard tasks={tasks} onEdit={openEditForm} onDelete={deleteTask} />
        )}
      </main>

      {isFormOpen && (
        <TaskForm
          task={selectedTask}
          onSave={saveTask}
          onClose={() => { setIsFormOpen(false); setSelectedTask(null); }}
        />
      )}
    </div>
  );
}

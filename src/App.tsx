import { useEffect, useState } from "react";
import tasksJson from "./data/tasks.json";
import { Task } from "./types/task";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(tasksJson);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

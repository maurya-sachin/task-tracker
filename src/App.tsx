import { useEffect, useState } from "react";
import tasksJson from "./data/tasks.json";
import { Task } from "./types/task";
import TaskCard from "./components/TaskCard";
import { groupTasksByDate } from "./utils/groupByDate";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const grouped = groupTasksByDate(tasks);

  useEffect(() => {
    setTasks(tasksJson);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {Object.entries(grouped).map(([groupName, groupTasks]) => (
        <div key={groupName} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{groupName}</h2>
          <ul className="space-y-3">
            {groupTasks.map(task => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;

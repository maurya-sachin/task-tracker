import { getAllTasks } from "./lib/tasks";
import SearchAndFilter from "./components/SearchAndFilter";
import AddTaskButton from "./components/AddTaskButton";

export default async function Home() {
  // Fetch tasks on the server
  const tasks = await getAllTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <SearchAndFilter initialTasks={tasks} />
      <AddTaskButton />
    </div>
  );
}
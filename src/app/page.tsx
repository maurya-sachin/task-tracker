"use client";
import { useEffect, useState } from "react";
import { Task } from "./types/task";
import TaskCard from "./components/TaskCard";
import { groupTasksByDate } from "./utils/groupByDate";
import { motion } from "framer-motion";
import AddTaskForm from "./components/AddTaskForm";
import { Dialog } from "@headlessui/react";
import { HiPlus } from "react-icons/hi";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const grouped = groupTasksByDate(filteredTasks);

  const handleAddTask = async (newTask: Omit<Task, "id">): Promise<void> => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      const tasks = await (await fetch("/api/tasks")).json();
      setTasks(tasks);
    }
  };


  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 rounded border w-full md:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-2">
          {["all", "pending", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full border ${statusFilter === status ? "bg-blue-600 text-white" : "bg-white text-gray-600 border-gray-300"}`}
              onClick={() => setStatusFilter(status as "all" | Task["status"])}
            >
              {status}
            </button>
          ))}
          <button
            onClick={() => setIsAddOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <HiPlus className="w-6 h-6" />
          </button>
        </div>
      </div>
      {Object.entries(grouped).map(([groupName, groupTasks]) => (
        <div key={groupName} className="mb-6">
          <h2 className="text-lg font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded-md shadow-inner">
            {groupName}
          </h2>

          <ul className="space-y-3">
            {groupTasks.map(task => (
              <li key={task.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard task={task} />
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 space-y-4 shadow-xl">
            <Dialog.Title className="text-lg font-bold">Add New Task</Dialog.Title>

            <AddTaskForm
              onAdd={handleAddTask}
            />
          </Dialog.Panel>
        </div>
      </Dialog>

    </div>
  );
}

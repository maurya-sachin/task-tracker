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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-3 rounded-lg border-2 border-indigo-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 bg-white text-gray-800 placeholder-gray-500 font-medium shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-3 flex-wrap">
          {["all", "pending", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                statusFilter === status 
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg" 
                : "bg-white/80 backdrop-blur-sm text-gray-700 border-indigo-200 hover:border-indigo-400"
              }`}
              onClick={() => setStatusFilter(status as "all" | Task["status"])}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <motion.button
            onClick={() => setIsAddOpen(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiPlus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
      {Object.entries(grouped).map(([groupName, groupTasks]) => (
        <motion.div 
          key={groupName} 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm mb-4 inline-block">
            {groupName}
          </h2>

          <ul className="space-y-4">
            {groupTasks.map((task, index) => (
              <motion.li 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard task={task} />
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} className="relative z-50">
        <motion.div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true" 
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel 
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md rounded-xl bg-white/90 backdrop-blur-sm p-6 space-y-4 shadow-xl border-2 border-indigo-100"
          >
            <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add New Task
            </Dialog.Title>

            <AddTaskForm onAdd={handleAddTask} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

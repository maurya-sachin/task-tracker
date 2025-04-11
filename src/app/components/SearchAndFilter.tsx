"use client";

import { useState } from "react";
import { Task } from "../types/task";
import TaskCard from "./TaskCard";
import { groupTasksByDate } from "../utils/groupByDate";
import { motion } from "framer-motion";

type Props = {
  initialTasks: Task[];
};

export default function SearchAndFilter({ initialTasks }: Props) {
  const [tasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const grouped = groupTasksByDate(filteredTasks);

  return (
    <>
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
              onClick={() =>
                setStatusFilter(status as "all" | Task["status"])
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
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
    </>
  );
}
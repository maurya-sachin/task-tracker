"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiPlus } from "react-icons/hi";
import { Dialog } from "@headlessui/react";
import AddTaskForm from "./AddTaskForm";
import { Task } from "../types/task";
import { useRouter } from "next/navigation";

export default function AddTaskButton() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const router = useRouter();

  const handleAddTask = async (newTask: Omit<Task, "id">): Promise<void> => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      // Close the dialog
      setIsAddOpen(false);
      // Refresh the page to get the updated tasks
      router.refresh();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsAddOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <HiPlus className="w-6 h-6" />
      </motion.button>

      <Dialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        className="relative z-50"
      >
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
    </>
  );
}
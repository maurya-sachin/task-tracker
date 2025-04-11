"use client";
import { useState } from "react";
import { Task } from "../types/task";

type Props = {
    onAdd: (task: Omit<Task, "id">) => Promise<void>;
};

export default function AddTaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<Task["status"]>("pending");
    const [priority, setPriority] = useState<Task["priority"]>("medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !dueDate) return;

        await onAdd({
            title,
            status,
            priority,
            dueDate,
        });

        setTitle("");
        setStatus("pending");
        setPriority("medium");
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <input
                type="text"
                placeholder="Task title"
                className="w-full border-2 border-indigo-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 bg-white text-gray-800 placeholder-gray-500 font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <div className="flex gap-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "pending" | "in-progress" | "completed")}
                    className="w-full border-2 border-indigo-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 bg-white text-gray-800 font-medium cursor-pointer"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
                    className="w-full border-2 border-indigo-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 bg-white text-gray-800 font-medium cursor-pointer"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <input
                type="date"
                className="w-full border-2 border-indigo-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 bg-white text-gray-800 font-medium cursor-pointer"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
                Add Task
            </button>
        </form>
    );
}
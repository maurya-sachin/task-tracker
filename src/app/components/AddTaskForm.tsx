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
        <form onSubmit={handleSubmit} className="space-y-4">

            <input
                type="text"
                placeholder="Task title"
                className="w-full border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <div className="flex gap-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "pending" | "in-progress" | "completed")}
                    className="w-full border p-2 rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
                    className="w-full border p-2 rounded"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <input
                type="date"
                className="w-full border p-2 rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Add Task
            </button>
        </form>
    );
}

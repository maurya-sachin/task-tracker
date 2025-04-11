"use client";
import dayjs from "dayjs";
import { Task } from "../types/task";
import { MdOutlineFlag, MdDateRange } from "react-icons/md";
import { FaSpinner, FaCheckCircle, FaPauseCircle } from "react-icons/fa";

type Props = {
    task: Task;
};

function getStatusColor(status: string) {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-700 font-semibold border border-yellow-200";
        case "completed":
            return "bg-green-100 text-green-700 font-semibold border border-green-200";
        case "in-progress":
            return "bg-blue-100 text-blue-700 font-semibold border border-blue-200";
        default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
    }
}

function getPriorityColor(priority: string) {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-700 font-semibold border border-red-200";
        case "medium":
            return "bg-orange-100 text-orange-700 font-semibold border border-orange-200";
        case "low":
            return "bg-gray-100 text-gray-700 font-semibold border border-gray-200";
        default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
    }
}

export default function TaskCard({ task }: Props) {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-5 shadow-lg rounded-xl border border-indigo-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="font-bold text-lg text-gray-800 mb-3">{task.title}</div>
            <div className="flex flex-wrap gap-3 text-sm">
                <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusColor(task.status)}`}>
                    {task.status === "pending" && <FaPauseCircle className="text-yellow-600" />}
                    {task.status === "in-progress" && <FaSpinner className="animate-spin text-blue-600" />}
                    {task.status === "completed" && <FaCheckCircle className="text-green-600" />}
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>

                <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getPriorityColor(task.priority)}`}>
                    <MdOutlineFlag className={`text-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'gray'}-600`} />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>

                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                    <MdDateRange className="text-indigo-600" />
                    {dayjs(task.dueDate).format("DD MMM, YYYY")}
                </span>
            </div>
        </div>
    );
}
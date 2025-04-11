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
            return "bg-yellow-500/10 text-yellow-600 font-medium";
        case "completed":
            return "bg-green-500/10 text-green-600 font-medium";
        case "in-progress":
            return "bg-blue-500/10 text-blue-600 font-medium";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

function getPriorityColor(priority: string) {
    switch (priority) {
        case "high":
            return "bg-red-500/10 text-red-600 font-medium";
        case "medium":
            return "bg-orange-500/10 text-orange-600 font-medium";
        case "low":
            return "bg-gray-500/10 text-gray-600 font-medium";
        default:
            return "bg-gray-100 text-gray-800";
    }
}


export default function TaskCard({ task }: Props) {
    return (
        <div className="bg-white p-4 shadow-sm rounded-lg border hover:shadow-md transition-all duration-200">
            <div className="font-semibold text-lg">{task.title}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                    {task.status === "pending" && <FaPauseCircle />}
                    {task.status === "in-progress" && <FaSpinner className="animate-spin" />}
                    {task.status === "completed" && <FaCheckCircle />}
                    {task.status}
                </span>

                <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    <MdOutlineFlag />
                    {task.priority}
                </span>

                <span className="flex items-center gap-1 text-gray-600">
                    <MdDateRange />
                    {dayjs(task.dueDate).format("DD MMM, YYYY")}
                </span>

            </div>
        </div>
    );
}

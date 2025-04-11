import fs from "fs";
import path from "path";
import { Task } from "../types/task";
import { cache } from "react";

const filePath = path.join(process.cwd(), "tasks.json");

// Using the cache function for data fetching to improve performance
export const getAllTasks = cache(async (): Promise<Task[]> => {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
});

export async function addTask(newTask: Omit<Task, "id">): Promise<Task> {
  try {
    const tasks = await getAllTasks();
    
    const taskWithId = {
      ...newTask,
      id: Date.now(),
    };
    
    tasks.unshift(taskWithId);
    
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
    
    return taskWithId;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
}
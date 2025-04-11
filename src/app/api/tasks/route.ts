import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "tasks.json");

// GET: Read tasks
export async function GET() {
  const fileData = fs.readFileSync(filePath, "utf-8");
  const tasks = JSON.parse(fileData);
  return NextResponse.json(tasks);
}

// POST: Add task
export async function POST(req: Request) {
  const newTask = await req.json();
  const fileData = fs.readFileSync(filePath, "utf-8");
  const tasks = JSON.parse(fileData);

  newTask.id = Date.now();
  tasks.unshift(newTask); // Add to top

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  return NextResponse.json({ message: "Task added", task: newTask });
}

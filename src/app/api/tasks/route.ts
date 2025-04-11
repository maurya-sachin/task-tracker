import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addTask, getAllTasks } from "@/app/lib/tasks";

// GET: Read tasks
export async function GET() {
  const tasks = await getAllTasks();
  return NextResponse.json(tasks);
}

// POST: Add task
export async function POST(req: NextRequest) {
  try {
    const newTask = await req.json();
    const task = await addTask(newTask);
    
    // Revalidate the home page after adding a task
    revalidatePath("/");
    
    return NextResponse.json({ message: "Task added", task }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add task" },
      { status: 500 }
    );
  }
}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return view('tasks.index', ['tasks' => Task::latest()->paginate(10)]);
    }

    public function create()
    {
        return view('tasks.form', ['task' => new Task()]);
    }

    public function store(TaskRequest $request)
    {
        $task = Task::create($request->validated());

        return redirect()->route('tasks.show', $task)->with('success', 'Task created.');
    }

    public function show(Task $task)
    {
        return view('tasks.show', ['task' => $task]);
    }

    public function edit(Task $task)
    {
        return view('tasks.form', ['task' => $task]);
    }

    public function update(TaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->route('tasks.show', $task)->with('success', 'Task updated.');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted.');
    }

    public function toggleComplete(Task $task)
    {
        $task->toggleComplete();

        return back()->with('success', 'Task updated.');
    }
}

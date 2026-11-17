@extends('layouts.app')

@section('title', 'Tasks')

@section('content')
    <p><a class="button" href="{{ route('tasks.create') }}">Add task</a></p>
    @forelse ($tasks as $task)
        <div class="card">
            <a href="{{ route('tasks.show', $task) }}" @class(['done' => $task->completed])>{{ $task->title }}</a>
        </div>
    @empty
        <p class="muted">No tasks yet.</p>
    @endforelse
    {{ $tasks->links() }}
@endsection

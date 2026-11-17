@extends('layouts.app')

@section('title', $task->title)

@section('content')
    <p><a href="{{ route('tasks.index') }}">← All tasks</a></p>
    <p>{{ $task->description }}</p>
    @if ($task->long_description)
        <p>{{ $task->long_description }}</p>
    @endif
    <p class="muted">Created {{ $task->created_at->diffForHumans() }} · Updated {{ $task->updated_at->diffForHumans() }}</p>
    <p>{{ $task->completed ? 'Completed' : 'Not completed' }}</p>
    <div class="row">
        <a class="button" href="{{ route('tasks.edit', $task) }}">Edit</a>
        <form method="POST" action="{{ route('tasks.toggle-complete', $task) }}">
            @csrf
            @method('PUT')
            <button>Mark as {{ $task->completed ? 'not completed' : 'completed' }}</button>
        </form>
        <form method="POST" action="{{ route('tasks.destroy', $task) }}">
            @csrf
            @method('DELETE')
            <button>Delete</button>
        </form>
    </div>
@endsection

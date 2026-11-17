@extends('layouts.app')

@section('title', $task->exists ? 'Edit task' : 'Add task')

@section('content')
    <form method="POST" action="{{ $task->exists ? route('tasks.update', $task) : route('tasks.store') }}">
        @csrf
        @if ($task->exists)
            @method('PUT')
        @endif
        @foreach (['title' => 'Title', 'description' => 'Description', 'long_description' => 'Long description'] as $field => $label)
            <label for="{{ $field }}">{{ $label }}</label>
            @if ($field === 'title')
                <input id="{{ $field }}" name="{{ $field }}" value="{{ old($field, $task->$field) }}">
            @else
                <textarea id="{{ $field }}" name="{{ $field }}" rows="{{ $field === 'description' ? 3 : 8 }}">{{ old($field, $task->$field) }}</textarea>
            @endif
            @error($field)
                <p class="error">{{ $message }}</p>
            @enderror
        @endforeach
        <p><button>{{ $task->exists ? 'Update' : 'Add' }} task</button></p>
    </form>
@endsection

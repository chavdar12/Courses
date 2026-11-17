@extends('layouts.app')

@section('title', $job->exists ? 'Edit job' : 'Add job')

@section('content')
    <form method="POST" action="{{ $job->exists ? route('my-jobs.update', $job) : route('my-jobs.store') }}" class="card">
        @csrf
        @if ($job->exists)
            @method('PUT')
        @endif
        @foreach (['title' => 'Title', 'location' => 'Location', 'salary' => 'Salary'] as $field => $label)
            <label for="{{ $field }}">{{ $label }}</label>
            <input id="{{ $field }}" name="{{ $field }}" value="{{ old($field, $job->$field) }}" @if ($field === 'salary') type="number" @endif required>
            <x-error :field="$field" />
        @endforeach
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="8" required>{{ old('description', $job->description) }}</textarea>
        <x-error field="description" />
        <label for="experience">Experience</label>
        <select id="experience" name="experience">
            @foreach (App\Models\OfferedJob::EXPERIENCE as $level)
                <option value="{{ $level }}" @selected(old('experience', $job->experience) === $level)>{{ Str::ucfirst($level) }}</option>
            @endforeach
        </select>
        <x-error field="experience" />
        <label for="category">Category</label>
        <select id="category" name="category">
            @foreach (App\Models\OfferedJob::CATEGORIES as $category)
                <option value="{{ $category }}" @selected(old('category', $job->category) === $category)>{{ $category }}</option>
            @endforeach
        </select>
        <x-error field="category" />
        <p><button>{{ $job->exists ? 'Update' : 'Add' }} job</button></p>
    </form>
@endsection

@extends('layouts.app')

@section('title', 'Jobs')

@section('content')
    <form method="GET" action="{{ route('jobs.index') }}" class="card">
        <label for="search">Search</label>
        <input id="search" type="search" name="search" value="{{ request('search') }}" placeholder="Title, description or company">
        <div class="row">
            <div style="flex: 1">
                <label for="min_salary">Min salary</label>
                <input id="min_salary" type="number" name="min_salary" value="{{ request('min_salary') }}">
            </div>
            <div style="flex: 1">
                <label for="max_salary">Max salary</label>
                <input id="max_salary" type="number" name="max_salary" value="{{ request('max_salary') }}">
            </div>
        </div>
        <label for="experience">Experience</label>
        <select id="experience" name="experience">
            <option value="">All</option>
            @foreach (App\Models\OfferedJob::EXPERIENCE as $level)
                <option value="{{ $level }}" @selected(request('experience') === $level)>{{ Str::ucfirst($level) }}</option>
            @endforeach
        </select>
        <label for="category">Category</label>
        <select id="category" name="category">
            <option value="">All</option>
            @foreach (App\Models\OfferedJob::CATEGORIES as $category)
                <option value="{{ $category }}" @selected(request('category') === $category)>{{ $category }}</option>
            @endforeach
        </select>
        <x-error field="min_salary" />
        <p class="row"><button>Filter</button> <a href="{{ route('jobs.index') }}">Clear</a></p>
    </form>
    @forelse ($jobs as $job)
        <x-job-card :job="$job">
            <p><a href="{{ route('jobs.show', $job) }}">Show</a></p>
        </x-job-card>
    @empty
        <p class="muted">No jobs match your filters.</p>
    @endforelse
    {{ $jobs->links() }}
@endsection

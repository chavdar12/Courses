@extends('layouts.app')

@section('title', $job->title)

@section('content')
    <p><a href="{{ route('jobs.index') }}">← All jobs</a></p>
    <x-job-card :job="$job">
        <p style="white-space: pre-line">{{ $job->description }}</p>
        @can('apply', $job)
            <a class="button" href="{{ route('jobs.apply', $job) }}">Apply</a>
        @else
            @auth
                <p class="muted">{{ Gate::inspect('apply', $job)->message() }}</p>
            @else
                <a class="button" href="{{ route('jobs.apply', $job) }}">Log in to apply</a>
            @endauth
        @endcan
    </x-job-card>
    <h2>More jobs at {{ $job->employer->company_name }}</h2>
    @foreach ($job->employer->offeredJobs->except($job->id) as $other)
        <p><a href="{{ route('jobs.show', $other) }}">{{ $other->title }}</a> · ${{ number_format($other->salary) }}</p>
    @endforeach
@endsection

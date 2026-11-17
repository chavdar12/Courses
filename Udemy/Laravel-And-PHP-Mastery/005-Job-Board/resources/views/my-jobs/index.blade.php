@extends('layouts.app')

@section('title', 'My jobs')

@section('content')
    <p><a class="button" href="{{ route('my-jobs.create') }}">Add job</a></p>
    @forelse ($jobs as $job)
        <x-job-card :job="$job">
            <h3>Applications</h3>
            @forelse ($job->jobApplications as $application)
                <p>{{ $application->user->name }} · asks ${{ number_format($application->expected_salary) }} · {{ $application->created_at->diffForHumans() }}</p>
            @empty
                <p class="muted">No applications yet.</p>
            @endforelse
            @unless ($job->deleted_at)
                <div class="row">
                    @can('update', $job)
                        <a class="button" href="{{ route('my-jobs.edit', $job) }}">Edit</a>
                    @endcan
                    <form method="POST" action="{{ route('my-jobs.destroy', $job) }}">
                        @csrf
                        @method('DELETE')
                        <button>Delete</button>
                    </form>
                </div>
            @endunless
        </x-job-card>
    @empty
        <p class="muted">You have not posted any jobs yet.</p>
    @endforelse
@endsection

@extends('layouts.app')

@section('title', 'My applications')

@section('content')
    @forelse ($applications as $application)
        <x-job-card :job="$application->offeredJob">
            <p>
                You asked for ${{ number_format($application->expected_salary) }} ·
                {{ $application->offeredJob->job_applications_count }} {{ Str::plural('applicant', $application->offeredJob->job_applications_count) }},
                average asking ${{ number_format($application->offeredJob->job_applications_avg_expected_salary) }} ·
                applied {{ $application->created_at->diffForHumans() }}
            </p>
            <form method="POST" action="{{ route('applications.destroy', $application) }}">
                @csrf
                @method('DELETE')
                <button>Withdraw</button>
            </form>
        </x-job-card>
    @empty
        <p class="muted">You have not applied to any jobs yet. <a href="{{ route('jobs.index') }}">Browse jobs</a></p>
    @endforelse
@endsection

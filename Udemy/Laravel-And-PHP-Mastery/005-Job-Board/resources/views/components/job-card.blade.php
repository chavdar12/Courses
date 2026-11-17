@props(['job'])
<div class="card">
    <div class="row" style="justify-content: space-between">
        <h2 style="margin: 0">{{ $job->title }}</h2>
        <strong>${{ number_format($job->salary) }}</strong>
    </div>
    <div class="row muted">
        <span>{{ $job->employer->company_name }}</span>
        <span>{{ $job->location }}</span>
        @if ($job->deleted_at)
            <span class="error">Deleted</span>
        @endif
    </div>
    <div class="row">
        <a href="{{ route('jobs.index', ['experience' => $job->experience]) }}">{{ Str::ucfirst($job->experience) }}</a>
        <a href="{{ route('jobs.index', ['category' => $job->category]) }}">{{ $job->category }}</a>
    </div>
    {{ $slot }}
</div>

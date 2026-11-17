@extends('layouts.app')

@section('title', 'Apply for ' . $job->title)

@section('content')
    <x-job-card :job="$job" />
    <form method="POST" action="{{ route('jobs.apply.store', $job) }}" enctype="multipart/form-data" class="card">
        @csrf
        <label for="expected_salary">Expected salary</label>
        <input id="expected_salary" type="number" name="expected_salary" value="{{ old('expected_salary') }}" required>
        <x-error field="expected_salary" />
        <label for="cv">CV (PDF, up to 2 MB)</label>
        <input id="cv" type="file" name="cv" accept="application/pdf" required>
        <x-error field="cv" />
        <p><button>Apply</button></p>
    </form>
@endsection

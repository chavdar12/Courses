@extends('layouts.app')

@section('title', 'Become an employer')

@section('content')
    <form method="POST" action="{{ route('employer.store') }}" class="card">
        @csrf
        <label for="company_name">Company name</label>
        <input id="company_name" name="company_name" value="{{ old('company_name') }}" required>
        <x-error field="company_name" />
        <p><button>Create employer account</button></p>
    </form>
@endsection

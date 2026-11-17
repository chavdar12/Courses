@extends('layouts.app')

@section('title', 'Log in')

@section('content')
    <form method="POST" action="{{ route('login') }}" class="card">
        @csrf
        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email">
        <x-error field="email" />
        <label for="password">Password</label>
        <input id="password" type="password" name="password" required autocomplete="current-password">
        <label><input type="checkbox" name="remember"> Remember me</label>
        <p><button>Log in</button></p>
    </form>
@endsection

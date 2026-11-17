@extends('layouts.app')

@section('title', 'Polls')

@section('content')
    <livewire:create-poll />
    <livewire:polls />
@endsection

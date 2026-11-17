@extends('layouts.app')

@section('title', 'Books')

@section('content')
    <form method="GET" action="{{ route('books.index') }}" class="row">
        <input type="search" name="title" placeholder="Search by title" value="{{ request('title') }}" aria-label="Search by title" style="flex: 1">
        <input type="hidden" name="filter" value="{{ request('filter') }}">
        <button>Search</button>
        <a href="{{ route('books.index') }}">Clear</a>
    </form>
    <nav aria-label="Filters" class="row" style="justify-content: flex-start; margin-top: 12px">
        @foreach ($filters as $key => $label)
            <a href="{{ route('books.index', [...request()->query(), 'filter' => $key ?: null]) }}"
               @if (request('filter', '') === $key) aria-current="page" style="font-weight: 700" @endif>{{ $label }}</a>
        @endforeach
    </nav>
    @forelse ($books as $book)
        <div class="card row" style="justify-content: space-between">
            <div>
                <a href="{{ route('books.show', $book) }}">{{ $book->title }}</a>
                <div class="muted">by {{ $book->author }}</div>
            </div>
            <div>
                <x-rating :rating="$book->reviews_avg_rating" />
                <div class="muted">{{ $book->reviews_count }} {{ Str::plural('review', $book->reviews_count) }}</div>
            </div>
        </div>
    @empty
        <p class="muted">No books found.</p>
    @endforelse
    {{ $books->links() }}
@endsection

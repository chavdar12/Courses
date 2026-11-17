@extends('layouts.app')

@section('title', $book->title)

@section('content')
    <p><a href="{{ route('books.index') }}">← All books</a></p>
    <p>by {{ $book->author }}</p>
    <p><x-rating :rating="$book->reviews_avg_rating" /> · {{ $book->reviews_count }} {{ Str::plural('review', $book->reviews_count) }}</p>
    <p><a class="button" href="{{ route('books.reviews.create', $book) }}">Add a review</a></p>
    <h2>Reviews</h2>
    @forelse ($book->reviews as $review)
        <div class="card">
            <x-rating :rating="$review->rating" /> <span class="muted">{{ $review->created_at->format('M j, Y') }}</span>
            <p>{{ $review->review }}</p>
        </div>
    @empty
        <p class="muted">No reviews yet.</p>
    @endforelse
@endsection

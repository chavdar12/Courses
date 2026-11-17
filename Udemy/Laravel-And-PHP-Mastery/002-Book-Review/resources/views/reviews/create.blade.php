@extends('layouts.app')

@section('title', 'Review ' . $book->title)

@section('content')
    <form method="POST" action="{{ route('books.reviews.store', $book) }}">
        @csrf
        <label for="review">Review</label>
        <textarea id="review" name="review" rows="6" required>{{ old('review') }}</textarea>
        @error('review')
            <p class="error">{{ $message }}</p>
        @enderror
        <label for="rating">Rating</label>
        <select id="rating" name="rating" required>
            <option value="">Select a rating</option>
            @for ($i = 1; $i <= 5; $i++)
                <option value="{{ $i }}" @selected(old('rating') == $i)>{{ $i }}</option>
            @endfor
        </select>
        @error('rating')
            <p class="error">{{ $message }}</p>
        @enderror
        <p><button>Add review</button></p>
    </form>
@endsection

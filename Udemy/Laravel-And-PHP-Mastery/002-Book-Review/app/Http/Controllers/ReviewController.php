<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function create(Book $book)
    {
        return view('reviews.create', ['book' => $book]);
    }

    public function store(Request $request, Book $book)
    {
        $book->reviews()->create($request->validate([
            'review' => ['required', 'string', 'min:15', 'max:5000'],
            'rating' => ['required', 'integer', 'between:1,5'],
        ]));

        return redirect()->route('books.show', $book)->with('success', 'Thank you for your review.');
    }
}

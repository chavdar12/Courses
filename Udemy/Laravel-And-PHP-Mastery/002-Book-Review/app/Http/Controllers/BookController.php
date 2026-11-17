<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'filter' => ['nullable', Rule::in(array_keys(Book::FILTERS))],
        ]);

        $books = Book::query()
            ->when($input['title'] ?? null, fn($q, $title) => $q->title($title))
            ->filter($input['filter'] ?? null)
            ->paginate(15)
            ->withQueryString();

        return view('books.index', ['books' => $books, 'filters' => Book::FILTERS]);
    }

    public function show(int $id)
    {
        $book = cache()->remember(
            'book:' . $id,
            3600,
            fn() => Book::with(['reviews' => fn($q) => $q->latest()])->withReviewStats()->findOrFail($id),
        );

        return view('books.show', ['book' => $book]);
    }
}

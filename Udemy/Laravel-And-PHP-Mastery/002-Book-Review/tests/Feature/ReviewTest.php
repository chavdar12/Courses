<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    private function review(Book $book, array $data = [])
    {
        return $this->post(route('books.reviews.store', $book), $data + [
            'review' => 'An honest and long enough review.',
            'rating' => 4,
        ]);
    }

    public function test_store_adds_a_review(): void
    {
        $book = Book::factory()->create();

        $this->review($book)->assertRedirect(route('books.show', $book));
        $this->assertDatabaseHas('reviews', ['book_id' => $book->id, 'rating' => 4]);
    }

    public function test_store_validates_rating_and_length(): void
    {
        $book = Book::factory()->create();

        $this->review($book, ['review' => 'too short', 'rating' => 6])->assertSessionHasErrors(['review', 'rating']);
        $this->assertDatabaseCount('reviews', 0);
    }

    public function test_review_creation_is_limited_to_three_per_hour(): void
    {
        $book = Book::factory()->create();

        foreach (range(1, 3) as $_) {
            $this->review($book)->assertRedirect();
        }
        $this->review($book)->assertTooManyRequests();
        $this->assertDatabaseCount('reviews', 3);
    }

    public function test_create_form_renders(): void
    {
        $book = Book::factory()->create(['title' => 'Dune']);

        $this->get(route('books.reviews.create', $book))->assertOk()->assertSee('Review Dune');
    }
}

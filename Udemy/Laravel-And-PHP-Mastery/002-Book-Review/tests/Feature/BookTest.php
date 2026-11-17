<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_search_by_title_treats_wildcards_literally(): void
    {
        Book::factory()->create(['title' => 'Dune']);
        Book::factory()->create(['title' => '100% Laravel']);

        $this->get('/books?title=dun')->assertSee('Dune')->assertDontSee('100% Laravel');
        $this->get('/books?title=%25')->assertSee('100% Laravel')->assertDontSee('Dune');
    }

    public function test_popular_last_month_orders_by_recent_review_count(): void
    {
        $quiet = Book::factory()->create(['title' => 'Quiet Book']);
        $busy = Book::factory()->create(['title' => 'Busy Book']);
        Review::factory(1)->for($quiet)->daysAgo(3)->create();
        Review::factory(3)->for($busy)->daysAgo(3)->create();
        Review::factory(10)->for($quiet)->daysAgo(90)->create(); // too old to count

        $this->get('/books?filter=popular_last_month')->assertSeeInOrder(['Busy Book', 'Quiet Book']);
    }

    public function test_highest_rated_needs_enough_recent_reviews(): void
    {
        $good = Book::factory()->create(['title' => 'Good Book']);
        $great = Book::factory()->create(['title' => 'Great Book']);
        $lonely = Book::factory()->create(['title' => 'Lonely Book']);
        Review::factory(2)->for($good)->rating(3)->daysAgo(5)->create();
        Review::factory(2)->for($great)->rating(5)->daysAgo(5)->create();
        Review::factory(1)->for($lonely)->rating(5)->daysAgo(5)->create();

        $this->get('/books?filter=highest_rated_last_month')
            ->assertSeeInOrder(['Great Book', 'Good Book'])
            ->assertDontSee('Lonely Book');
    }

    public function test_unknown_filter_is_rejected(): void
    {
        $this->get('/books?filter=drop_table')->assertSessionHasErrors('filter');
    }

    public function test_show_lists_reviews_and_average(): void
    {
        $book = Book::factory()->create();
        Review::factory()->for($book)->rating(4)->create(['review' => 'Loved every page of it.']);
        Review::factory()->for($book)->rating(2)->create();

        $this->get(route('books.show', $book))->assertOk()
            ->assertSee('Loved every page of it.')
            ->assertSee('3.0 out of 5')
            ->assertSee('2 reviews');
    }

    public function test_show_is_cached_and_a_new_review_invalidates_it(): void
    {
        $book = Book::factory()->create();
        $this->get(route('books.show', $book))->assertSee('0 reviews');
        $this->assertTrue(cache()->has('book:' . $book->id));

        $book->reviews()->create(['review' => 'A fresh review here.', 'rating' => 5]);
        $this->assertFalse(cache()->has('book:' . $book->id));
        $this->get(route('books.show', $book))->assertSee('1 review');
    }

    public function test_unknown_book_is_404(): void
    {
        $this->get('/books/999')->assertNotFound();
    }
}

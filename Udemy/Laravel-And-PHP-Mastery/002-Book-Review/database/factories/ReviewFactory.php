<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Review> */
class ReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'book_id' => Book::factory(),
            'review' => fake()->paragraph(),
            'rating' => fake()->numberBetween(1, 5),
            'created_at' => fake()->dateTimeBetween('-1 year'),
        ];
    }

    public function rating(int $rating): static
    {
        return $this->state(['rating' => $rating]);
    }

    public function daysAgo(int $days): static
    {
        return $this->state(['created_at' => now()->subDays($days)]);
    }
}

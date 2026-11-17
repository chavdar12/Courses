<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Book::factory(30)->create()->each(
            fn(Book $book) => Review::factory(random_int(3, 20))->for($book)->create(),
        );
    }
}

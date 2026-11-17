<?php

namespace Database\Factories;

use App\Models\Employer;
use App\Models\OfferedJob;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<OfferedJob> */
class OfferedJobFactory extends Factory
{
    public function definition(): array
    {
        return [
            'employer_id' => Employer::factory(),
            'title' => fake()->jobTitle(),
            'description' => fake()->paragraphs(3, true),
            'salary' => fake()->numberBetween(5, 150) * 1000,
            'location' => fake()->city(),
            'experience' => fake()->randomElement(OfferedJob::EXPERIENCE),
            'category' => fake()->randomElement(OfferedJob::CATEGORIES),
        ];
    }
}

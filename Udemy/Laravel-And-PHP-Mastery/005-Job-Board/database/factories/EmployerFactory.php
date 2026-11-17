<?php

namespace Database\Factories;

use App\Models\Employer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Employer> */
class EmployerFactory extends Factory
{
    public function definition(): array
    {
        return ['user_id' => User::factory(), 'company_name' => fake()->company()];
    }
}

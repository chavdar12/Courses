<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Event> */
class EventFactory extends Factory
{
    public function definition(): array
    {
        $start = fake()->dateTimeBetween('-1 month', '+2 months');

        return [
            'user_id' => User::factory(),
            'name' => fake()->unique()->sentence(3),
            'description' => fake()->paragraph(),
            'start_time' => $start,
            'end_time' => (clone $start)->modify('+2 hours'),
        ];
    }

    public function startingIn(string $offset): static
    {
        return $this->state(fn() => ['start_time' => now()->modify($offset), 'end_time' => now()->modify($offset)->addHour()]);
    }
}

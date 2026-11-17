<?php

namespace Database\Factories;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Attendee> */
class AttendeeFactory extends Factory
{
    public function definition(): array
    {
        return ['user_id' => User::factory(), 'event_id' => Event::factory()];
    }
}

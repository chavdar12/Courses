<?php

namespace Database\Seeders;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create(['email' => 'test@example.com']); // password: "password"
        $users = User::factory(20)->create();
        $events = Event::factory(30)->recycle($users)->create();

        foreach ($users as $user) {
            foreach ($events->random(5) as $event) {
                Attendee::factory()->for($user)->for($event)->create();
            }
        }
    }
}

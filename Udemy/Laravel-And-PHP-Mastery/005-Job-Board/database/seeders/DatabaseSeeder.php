<?php

namespace Database\Seeders;

use App\Models\Employer;
use App\Models\OfferedJob;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // password for every seeded user: "password"
        User::factory()->create(['email' => 'seeker@example.com']);
        $employer = Employer::factory()->for(User::factory()->state(['email' => 'employer@example.com']))->create();
        OfferedJob::factory(10)->for($employer)->create();
        Employer::factory(10)->has(OfferedJob::factory(5))->create();
    }
}

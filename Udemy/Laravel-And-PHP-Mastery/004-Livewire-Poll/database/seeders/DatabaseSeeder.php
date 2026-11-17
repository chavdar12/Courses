<?php

namespace Database\Seeders;

use App\Models\Poll;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Tabs or spaces?' => ['Tabs', 'Spaces'], 'Favourite PHP framework?' => ['Laravel', 'Symfony', 'Slim']] as $title => $options) {
            Poll::create(['title' => $title])->options()->createMany(array_map(fn($name) => ['name' => $name], $options));
        }
    }
}

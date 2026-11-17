<?php

namespace Tests\Feature;

use App\Models\Employer;
use App\Models\OfferedJob;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_filters_by_search_salary_experience_and_category(): void
    {
        $acme = Employer::factory()->create(['company_name' => 'Acme']);
        OfferedJob::factory()->for($acme)->create(['title' => 'Laravel Developer', 'salary' => 60000, 'experience' => 'senior', 'category' => 'IT']);
        OfferedJob::factory()->create(['title' => 'Accountant', 'description' => 'Numbers', 'salary' => 40000, 'experience' => 'entry', 'category' => 'Finance']);

        $this->get('/jobs?search=laravel')->assertSee('Laravel Developer')->assertDontSee('Accountant');
        $this->get('/jobs?search=acme')->assertSee('Laravel Developer')->assertDontSee('Accountant');
        $this->get('/jobs?min_salary=50000')->assertSee('Laravel Developer')->assertDontSee('Accountant');
        $this->get('/jobs?max_salary=50000')->assertSee('Accountant')->assertDontSee('Laravel Developer');
        $this->get('/jobs?experience=entry')->assertSee('Accountant')->assertDontSee('Laravel Developer');
        $this->get('/jobs?category=IT')->assertSee('Laravel Developer')->assertDontSee('Accountant');
    }

    public function test_index_rejects_unknown_filter_values(): void
    {
        $this->get('/jobs?category=Hacking&min_salary=abc')->assertSessionHasErrors(['category', 'min_salary']);
    }

    public function test_search_treats_wildcards_literally(): void
    {
        OfferedJob::factory()->create(['title' => 'Plain job', 'description' => 'nothing special']);

        $this->get('/jobs?search=%25')->assertSee('No jobs match your filters.');
    }

    public function test_show_hides_deleted_jobs(): void
    {
        $job = OfferedJob::factory()->create();
        $this->get(route('jobs.show', $job))->assertOk()->assertSee($job->title);

        $job->delete();
        $this->get(route('jobs.show', $job))->assertNotFound();
    }
}

<?php

namespace Tests\Feature;

use App\Models\Employer;
use App\Models\OfferedJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployerTest extends TestCase
{
    use RefreshDatabase;

    private array $job = [
        'title' => 'PHP Developer', 'location' => 'Sofia', 'salary' => 50000,
        'description' => 'Build things.', 'experience' => 'intermediate', 'category' => 'IT',
    ];

    public function test_non_employers_are_sent_to_register_a_company(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->get('/my-jobs')->assertRedirect(route('employer.create'));
        $this->post('/employer', ['company_name' => 'Acme'])->assertRedirect(route('my-jobs.index'));
        $this->actingAs($user->fresh()); // a real request loads the user again
        $this->get('/my-jobs')->assertOk();
        $this->get('/employer/create')->assertForbidden();
    }

    public function test_company_name_must_be_unique(): void
    {
        Employer::factory()->create(['company_name' => 'Acme']);
        $this->actingAs(User::factory()->create());

        $this->post('/employer', ['company_name' => 'Acme'])->assertSessionHasErrors('company_name');
    }

    public function test_employer_creates_and_updates_a_job(): void
    {
        $employer = Employer::factory()->create();
        $this->actingAs($employer->user);
        $this->get('/my-jobs/create')->assertOk();

        $this->post('/my-jobs', $this->job)->assertRedirect('/my-jobs');
        $job = OfferedJob::sole();
        $this->assertTrue($job->employer->is($employer));
        $this->get(route('my-jobs.edit', $job))->assertOk()->assertSee('PHP Developer');

        $this->put(route('my-jobs.update', $job), ['title' => 'Senior PHP Developer'] + $this->job)->assertRedirect('/my-jobs');
        $this->assertSame('Senior PHP Developer', $job->fresh()->title);
    }

    public function test_job_input_is_validated(): void
    {
        $this->actingAs(Employer::factory()->create()->user);

        $this->post('/my-jobs', ['salary' => 10, 'category' => 'Hacking'] + $this->job)->assertSessionHasErrors(['salary', 'category']);
        $this->assertDatabaseCount('offered_jobs', 0);
    }

    public function test_other_employers_cannot_touch_a_job(): void
    {
        $job = OfferedJob::factory()->create();
        $this->actingAs(Employer::factory()->create()->user);

        $this->get(route('my-jobs.edit', $job))->assertNotFound();
        $this->put(route('my-jobs.update', $job), $this->job)->assertNotFound();
        $this->delete(route('my-jobs.destroy', $job))->assertNotFound();
    }

    public function test_job_with_applications_cannot_be_edited_but_can_be_soft_deleted(): void
    {
        $job = OfferedJob::factory()->create();
        $job->jobApplications()->create(['user_id' => User::factory()->create()->id, 'expected_salary' => 1, 'cv_path' => 'cvs/x.pdf']);
        $this->actingAs($job->employer->user);

        $this->put(route('my-jobs.update', $job), $this->job)->assertForbidden();
        $this->delete(route('my-jobs.destroy', $job))->assertRedirect('/my-jobs');
        $this->assertSoftDeleted($job);
        $this->get('/my-jobs')->assertSee('Deleted');
    }
}

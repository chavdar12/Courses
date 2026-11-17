<?php

namespace Tests\Feature;

use App\Models\JobApplication;
use App\Models\OfferedJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class JobApplicationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    private function apply(OfferedJob $job, array $data = [])
    {
        return $this->post(route('jobs.apply.store', $job), $data + [
            'expected_salary' => 50000,
            'cv' => UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf'),
        ]);
    }

    public function test_user_applies_with_a_pdf_cv_stored_privately(): void
    {
        $user = User::factory()->create();
        $job = OfferedJob::factory()->create();

        $this->actingAs($user);
        $this->get(route('jobs.apply', $job))->assertOk();
        $this->apply($job)->assertRedirect(route('jobs.show', $job));

        $application = JobApplication::sole();
        $this->assertTrue($application->user->is($user));
        Storage::disk('local')->assertExists($application->cv_path);
        $this->assertStringStartsWith('cvs/', $application->cv_path);
    }

    public function test_cv_must_be_a_small_pdf(): void
    {
        $this->actingAs(User::factory()->create());
        $job = OfferedJob::factory()->create();

        $this->apply($job, ['cv' => UploadedFile::fake()->create('cv.exe', 10, 'application/octet-stream')])->assertSessionHasErrors('cv');
        $this->apply($job, ['cv' => UploadedFile::fake()->create('cv.pdf', 3000, 'application/pdf')])->assertSessionHasErrors('cv');
        $this->assertDatabaseCount('job_applications', 0);
    }

    public function test_cannot_apply_twice_or_to_own_job(): void
    {
        $job = OfferedJob::factory()->create();
        $this->actingAs(User::factory()->create());
        $this->apply($job)->assertRedirect();
        $this->apply($job)->assertForbidden();

        $this->actingAs($job->employer->user);
        $this->apply($job)->assertForbidden();
        $this->assertDatabaseCount('job_applications', 1);
    }

    public function test_my_applications_lists_and_withdraws_own_applications_only(): void
    {
        $user = User::factory()->create();
        $job = OfferedJob::factory()->create(['title' => 'Backend Developer']);
        $this->actingAs($user);
        $this->apply($job);
        $application = JobApplication::sole();

        $this->get('/my-applications')->assertOk()->assertSee('Backend Developer')->assertSee('1 applicant');

        $this->actingAs(User::factory()->create());
        $this->delete(route('applications.destroy', $application))->assertNotFound();

        $this->actingAs($user);
        $this->delete(route('applications.destroy', $application))->assertRedirect();
        $this->assertModelMissing($application);
        Storage::disk('local')->assertMissing($application->cv_path);
    }
}

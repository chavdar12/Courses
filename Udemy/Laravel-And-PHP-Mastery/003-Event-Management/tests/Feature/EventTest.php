<?php

namespace Tests\Feature;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    private array $valid = ['name' => 'Laravel meetup', 'start_time' => '2030-01-01 18:00', 'end_time' => '2030-01-01 20:00'];

    public function test_index_is_public_and_includes_only_allowed_relations(): void
    {
        $event = Event::factory()->create();
        Attendee::factory()->for($event)->create();

        $this->getJson('/api/events')->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonMissingPath('data.0.user');

        $this->getJson('/api/events?include=user,attendees.user,password')->assertOk()
            ->assertJsonPath('data.0.user.name', $event->user->name)
            ->assertJsonStructure(['data' => [['attendees' => [['user' => ['id', 'name']]]]]]);
    }

    public function test_user_resource_never_exposes_email(): void
    {
        $event = Event::factory()->create();

        $this->getJson("/api/events/{$event->id}?include=user")->assertJsonMissingPath('data.user.email');
    }

    public function test_store_requires_authentication(): void
    {
        $this->postJson('/api/events', $this->valid)->assertUnauthorized();
    }

    public function test_store_creates_an_event_owned_by_the_user(): void
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/events', $this->valid)->assertCreated()
            ->assertJsonPath('data.name', 'Laravel meetup')
            ->assertJsonPath('data.user.id', $user->id);
    }

    public function test_store_validates_dates(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/events', ['name' => '', 'start_time' => '2030-01-02', 'end_time' => '2030-01-01'])
            ->assertJsonValidationErrors(['name', 'end_time']);
    }

    public function test_only_the_owner_can_update_or_delete(): void
    {
        $event = Event::factory()->create();

        Sanctum::actingAs(User::factory()->create());
        $this->putJson("/api/events/{$event->id}", ['name' => 'Hijacked'])->assertForbidden();
        $this->deleteJson("/api/events/{$event->id}")->assertForbidden();

        Sanctum::actingAs($event->user);
        $this->putJson("/api/events/{$event->id}", ['name' => 'Renamed'])->assertOk()->assertJsonPath('data.name', 'Renamed');
        $this->deleteJson("/api/events/{$event->id}")->assertNoContent();
        $this->assertModelMissing($event);
    }
}

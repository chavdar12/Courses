<?php

namespace Tests\Feature;

use App\Models\Attendee;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AttendeeTest extends TestCase
{
    use RefreshDatabase;

    public function test_attending_twice_does_not_duplicate(): void
    {
        $event = Event::factory()->create();
        Sanctum::actingAs(User::factory()->create());

        $this->postJson("/api/events/{$event->id}/attendees")->assertCreated();
        $this->postJson("/api/events/{$event->id}/attendees")->assertOk();
        $this->assertSame(1, $event->attendees()->count());
    }

    public function test_attendee_routes_are_scoped_to_their_event(): void
    {
        $attendee = Attendee::factory()->create();
        $other = Event::factory()->create();

        $this->getJson("/api/events/{$attendee->event_id}/attendees/{$attendee->id}")->assertOk();
        $this->getJson("/api/events/{$other->id}/attendees/{$attendee->id}")->assertNotFound();
    }

    public function test_attendee_or_event_owner_can_remove_an_attendee(): void
    {
        $attendee = Attendee::factory()->create();
        $url = "/api/events/{$attendee->event_id}/attendees/{$attendee->id}";

        Sanctum::actingAs(User::factory()->create());
        $this->deleteJson($url)->assertForbidden();

        Sanctum::actingAs($attendee->event->user);
        $this->deleteJson($url)->assertNoContent();
        $this->assertModelMissing($attendee);
    }
}

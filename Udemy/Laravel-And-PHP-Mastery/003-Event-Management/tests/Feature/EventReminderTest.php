<?php

namespace Tests\Feature;

use App\Models\Attendee;
use App\Models\Event;
use App\Notifications\EventReminder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class EventReminderTest extends TestCase
{
    use RefreshDatabase;

    public function test_reminds_attendees_of_events_in_the_next_day_only(): void
    {
        Notification::fake();
        $soon = Attendee::factory()->for(Event::factory()->startingIn('+3 hours'))->create();
        $later = Attendee::factory()->for(Event::factory()->startingIn('+3 days'))->create();
        $past = Attendee::factory()->for(Event::factory()->startingIn('-3 hours'))->create();

        $this->artisan('app:send-event-reminders')->expectsOutput('Sent reminders for 1 event.')->assertSuccessful();

        Notification::assertSentTo($soon->user, EventReminder::class, fn($n) => $n->event->is($soon->event));
        Notification::assertNotSentTo([$later->user, $past->user], EventReminder::class);
    }

    public function test_reminder_mail_names_the_event(): void
    {
        $event = Event::factory()->create(['name' => 'Laravel meetup']);

        $mail = (new EventReminder($event))->toMail($event->user);
        $this->assertSame('Reminder: Laravel meetup', $mail->subject);
    }

    public function test_command_is_scheduled_daily(): void
    {
        $this->artisan('schedule:list')->expectsOutputToContain('app:send-event-reminders')->assertSuccessful();
    }
}

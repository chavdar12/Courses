<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Notifications\EventReminder;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:send-event-reminders')]
#[Description('Remind attendees of events starting in the next 24 hours')]
class SendEventReminders extends Command
{
    public function handle(): void
    {
        $events = Event::with('attendees.user')
            ->whereBetween('start_time', [now(), now()->addDay()])
            ->get();

        foreach ($events as $event) {
            foreach ($event->attendees as $attendee) {
                $attendee->user->notify(new EventReminder($event));
            }
        }

        $this->info("Sent reminders for {$events->count()} " . str('event')->plural($events->count()) . '.');
    }
}

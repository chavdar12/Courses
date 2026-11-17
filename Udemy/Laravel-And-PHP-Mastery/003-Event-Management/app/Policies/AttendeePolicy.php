<?php

namespace App\Policies;

use App\Models\Attendee;
use App\Models\User;

class AttendeePolicy
{
    /** The attendee can leave, and the event owner can remove anyone. */
    public function delete(User $user, Attendee $attendee): bool
    {
        return $user->id === $attendee->user_id || $user->id === $attendee->event->user_id;
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttendeeResource;
use App\Models\Attendee;
use App\Models\Event;
use Illuminate\Http\Request;

class AttendeeController extends Controller
{
    use Includes;

    public function index(Request $request, Event $event)
    {
        $attendees = $event->attendees()->with($this->includes($request, ['user']))->latest()->paginate(15);

        return AttendeeResource::collection($attendees);
    }

    public function store(Request $request, Event $event)
    {
        $attendee = $event->attendees()->firstOrCreate(['user_id' => $request->user()->id]);

        return (new AttendeeResource($attendee->load('user')))
            ->response()
            ->setStatusCode($attendee->wasRecentlyCreated ? 201 : 200);
    }

    public function show(Event $event, Attendee $attendee)
    {
        return new AttendeeResource($attendee->load('user'));
    }

    public function destroy(Event $event, Attendee $attendee)
    {
        $this->authorize('delete', $attendee);
        $attendee->delete();

        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    use Includes;

    private const RELATIONS = ['user', 'attendees', 'attendees.user'];

    public function index(Request $request)
    {
        $events = Event::with($this->includes($request, self::RELATIONS))->latest()->paginate(15);

        return EventResource::collection($events);
    }

    public function store(Request $request)
    {
        $event = $request->user()->events()->create($this->validated($request));

        return (new EventResource($event->load('user')))->response()->setStatusCode(201);
    }

    public function show(Request $request, Event $event)
    {
        return new EventResource($event->load($this->includes($request, self::RELATIONS)));
    }

    public function update(Request $request, Event $event)
    {
        $this->authorize('update', $event);
        $event->update($this->validated($request, partial: true));

        return new EventResource($event->load('user'));
    }

    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);
        $event->delete();

        return response()->noContent();
    }

    private function validated(Request $request, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'name' => [$required, 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'start_time' => [$required, 'date'],
            'end_time' => [$required, 'date', 'after:start_time'],
        ]);
    }
}

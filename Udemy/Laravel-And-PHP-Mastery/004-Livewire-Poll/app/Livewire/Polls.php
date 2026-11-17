<?php

namespace App\Livewire;

use App\Models\Option;
use App\Models\Poll;
use Livewire\Attributes\On;
use Livewire\Component;

class Polls extends Component
{
    // the option id comes from the browser, so it is looked up and must exist
    public function vote(int $optionId): void
    {
        Option::findOrFail($optionId)->votes()->create();
    }

    #[On('poll-created')]
    public function render()
    {
        $polls = Poll::with(['options' => fn($q) => $q->withCount('votes')])->latest()->get();

        return view('livewire.polls', ['polls' => $polls]);
    }
}

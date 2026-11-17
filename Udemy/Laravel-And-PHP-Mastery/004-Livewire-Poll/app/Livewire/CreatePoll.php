<?php

namespace App\Livewire;

use App\Models\Poll;
use Illuminate\Support\Facades\DB;
use Livewire\Attributes\Validate;
use Livewire\Component;

class CreatePoll extends Component
{
    #[Validate('required|string|min:3|max:255')]
    public string $title = '';

    #[Validate(['options' => 'array|min:2|max:10', 'options.*' => 'required|string|max:255|distinct'])]
    public array $options = ['', ''];

    public function addOption(): void
    {
        $this->options[] = '';
    }

    public function removeOption(int $index): void
    {
        unset($this->options[$index]);
        $this->options = array_values($this->options);
    }

    public function createPoll(): void
    {
        $this->validate();

        DB::transaction(function () {
            Poll::create(['title' => $this->title])
                ->options()
                ->createMany(array_map(fn(string $name) => ['name' => $name], $this->options));
        });

        $this->reset();
        $this->dispatch('poll-created');
    }

    public function render()
    {
        return view('livewire.create-poll');
    }
}

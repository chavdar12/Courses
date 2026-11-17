<?php

namespace Tests\Feature;

use App\Livewire\CreatePoll;
use App\Livewire\Polls;
use App\Models\Poll;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class PollTest extends TestCase
{
    use RefreshDatabase;

    private function poll(): Poll
    {
        $poll = Poll::create(['title' => 'Best editor?']);
        $poll->options()->createMany([['name' => 'Vim'], ['name' => 'VS Code']]);

        return $poll;
    }

    public function test_home_page_renders_both_components(): void
    {
        $this->get('/')->assertOk()->assertSeeLivewire(CreatePoll::class)->assertSeeLivewire(Polls::class);
    }

    public function test_options_can_be_added_and_removed(): void
    {
        Livewire::test(CreatePoll::class)
            ->set('options', ['a', 'b'])
            ->call('addOption')
            ->assertSet('options', ['a', 'b', ''])
            ->call('removeOption', 0)
            ->assertSet('options', ['b', '']);
    }

    public function test_create_poll_saves_poll_and_options_then_resets(): void
    {
        Livewire::test(CreatePoll::class)
            ->set('title', 'Tabs or spaces?')
            ->set('options', ['Tabs', 'Spaces'])
            ->call('createPoll')
            ->assertHasNoErrors()
            ->assertSet('title', '')
            ->assertSet('options', ['', ''])
            ->assertDispatched('poll-created');

        $poll = Poll::sole();
        $this->assertSame('Tabs or spaces?', $poll->title);
        $this->assertSame(['Tabs', 'Spaces'], $poll->options->pluck('name')->all());
    }

    public function test_create_poll_validates_input(): void
    {
        Livewire::test(CreatePoll::class)
            ->set('title', '')
            ->set('options', ['Same', 'Same'])
            ->call('createPoll')
            ->assertHasErrors(['title' => 'required', 'options.0' => 'distinct']);

        Livewire::test(CreatePoll::class)
            ->set('title', 'Only one?')
            ->set('options', ['One'])
            ->call('createPoll')
            ->assertHasErrors(['options' => 'min']);

        $this->assertDatabaseCount('polls', 0);
    }

    public function test_polls_lists_polls_with_vote_counts_and_counts_votes(): void
    {
        $vim = $this->poll()->options()->where('name', 'Vim')->sole();

        Livewire::test(Polls::class)
            ->assertSee('Best editor?')
            ->call('vote', $vim->id)
            ->call('vote', $vim->id)
            ->assertSeeInOrder(['Vim', '(2)', 'VS Code', '(0)']);
    }

    public function test_voting_for_a_missing_option_is_404(): void
    {
        Livewire::test(Polls::class)->call('vote', 999)->assertStatus(404);
        $this->assertDatabaseCount('votes', 0);
    }

    public function test_polls_refresh_when_a_poll_is_created(): void
    {
        $polls = Livewire::test(Polls::class)->assertSee('No polls yet.');
        $this->poll();

        $polls->dispatch('poll-created')->assertSee('Best editor?');
    }
}

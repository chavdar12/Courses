<div>
    <h2>Polls</h2>
    @forelse ($polls as $poll)
        <div class="card" wire:key="poll-{{ $poll->id }}">
            <h3>{{ $poll->title }}</h3>
            @foreach ($poll->options as $option)
                <div class="row" wire:key="option-{{ $option->id }}">
                    <button wire:click="vote({{ $option->id }})">Vote</button>
                    <span>{{ $option->name }}</span>
                    <span class="muted">({{ $option->votes_count }})</span>
                </div>
            @endforeach
        </div>
    @empty
        <p class="muted">No polls yet.</p>
    @endforelse
</div>

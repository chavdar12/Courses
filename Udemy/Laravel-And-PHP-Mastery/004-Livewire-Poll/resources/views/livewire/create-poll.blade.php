<form wire:submit="createPoll" class="card">
    <h2>New poll</h2>
    <label for="title">Poll title</label>
    <input id="title" wire:model="title">
    @error('title')
        <p class="error">{{ $message }}</p>
    @enderror

    <p><button type="button" wire:click="addOption">Add option</button></p>
    @error('options')
        <p class="error">{{ $message }}</p>
    @enderror
    @foreach ($options as $index => $option)
        <div wire:key="option-{{ $index }}">
            <label for="option-{{ $index }}">Option {{ $index + 1 }}</label>
            <div class="row">
                <input id="option-{{ $index }}" wire:model="options.{{ $index }}" style="flex: 1">
                <button type="button" wire:click="removeOption({{ $index }})">Remove</button>
            </div>
            @error("options.{$index}")
                <p class="error">{{ $message }}</p>
            @enderror
        </div>
    @endforeach

    <p><button type="submit">Create poll</button></p>
</form>

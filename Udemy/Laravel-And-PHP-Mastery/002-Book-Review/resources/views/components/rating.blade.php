@props(['rating'])
@if ($rating)
    <span title="{{ number_format($rating, 1) }} out of 5">
        @for ($i = 1; $i <= 5; $i++){{ $i <= round($rating) ? '★' : '☆' }}@endfor
    </span>
@else
    <span class="muted">No rating yet</span>
@endif

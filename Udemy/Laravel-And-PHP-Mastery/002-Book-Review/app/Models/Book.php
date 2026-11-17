<?php

namespace App\Models;

use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    /** @use HasFactory<BookFactory> */
    use HasFactory;

    public const FILTERS = [
        '' => 'Latest',
        'popular_last_month' => 'Popular last month',
        'popular_last_6months' => 'Popular last 6 months',
        'highest_rated_last_month' => 'Highest rated last month',
        'highest_rated_last_6months' => 'Highest rated last 6 months',
    ];

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function scopeTitle(Builder $query, string $title): Builder
    {
        // escape LIKE wildcards so a search for "100%" matches literally
        $pattern = '%' . str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $title) . '%';

        return $query->whereRaw("title like ? escape '\\'", [$pattern]);
    }

    /** Adds reviews_count and reviews_avg_rating, limited to reviews in the period when one is given. */
    public function scopeWithReviewStats(Builder $query, ?\DateTimeInterface $from = null): Builder
    {
        $period = fn(Builder $q) => $from ? $q->where('created_at', '>=', $from) : $q;

        return $query->withCount(['reviews' => $period])->withAvg(['reviews' => $period], 'rating');
    }

    public function scopePopular(Builder $query, \DateTimeInterface $from): Builder
    {
        return $query->withReviewStats($from)->orderByDesc('reviews_count');
    }

    /** Only books with at least $minReviews reviews in the period, best average first. */
    public function scopeHighestRated(Builder $query, \DateTimeInterface $from, int $minReviews): Builder
    {
        return $query->withReviewStats($from)
            ->whereHas('reviews', fn(Builder $q) => $q->where('created_at', '>=', $from), '>=', $minReviews)
            ->orderByDesc('reviews_avg_rating');
    }

    public function scopeFilter(Builder $query, ?string $filter): Builder
    {
        return match ($filter) {
            'popular_last_month' => $query->popular(now()->subMonth())->orderByDesc('reviews_avg_rating'),
            'popular_last_6months' => $query->popular(now()->subMonths(6))->orderByDesc('reviews_avg_rating'),
            'highest_rated_last_month' => $query->highestRated(now()->subMonth(), 2)->orderByDesc('reviews_count'),
            'highest_rated_last_6months' => $query->highestRated(now()->subMonths(6), 5)->orderByDesc('reviews_count'),
            default => $query->latest()->withReviewStats(),
        };
    }

    protected static function booted(): void
    {
        static::updated(fn(Book $book) => cache()->forget('book:' . $book->id));
        static::deleted(fn(Book $book) => cache()->forget('book:' . $book->id));
    }
}

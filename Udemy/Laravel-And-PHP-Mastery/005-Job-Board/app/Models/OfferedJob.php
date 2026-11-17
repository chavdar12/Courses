<?php

namespace App\Models;

use Database\Factories\OfferedJobFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

// "Job" would clash with Laravel's queued jobs, hence OfferedJob
#[Fillable(['title', 'description', 'salary', 'location', 'experience', 'category'])]
class OfferedJob extends Model
{
    /** @use HasFactory<OfferedJobFactory> */
    use HasFactory;
    use SoftDeletes;

    public const EXPERIENCE = ['entry', 'intermediate', 'senior'];

    public const CATEGORIES = ['IT', 'Finance', 'Sales', 'Marketing'];

    public function employer(): BelongsTo
    {
        return $this->belongsTo(Employer::class);
    }

    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function hasUserApplied(User $user): bool
    {
        return $this->jobApplications()->whereBelongsTo($user)->exists();
    }

    /** @param array{search?: ?string, min_salary?: ?int, max_salary?: ?int, experience?: ?string, category?: ?string} $filters */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query
            ->when($filters['search'] ?? null, function (Builder $q, string $search) {
                $like = '%' . str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $search) . '%';
                $q->where(fn(Builder $q) => $q
                    ->whereRaw("title like ? escape '\\'", [$like])
                    ->orWhereRaw("description like ? escape '\\'", [$like])
                    ->orWhereHas('employer', fn(Builder $q) => $q->whereRaw("company_name like ? escape '\\'", [$like])));
            })
            ->when($filters['min_salary'] ?? null, fn(Builder $q, $min) => $q->where('salary', '>=', $min))
            ->when($filters['max_salary'] ?? null, fn(Builder $q, $max) => $q->where('salary', '<=', $max))
            ->when($filters['experience'] ?? null, fn(Builder $q, $e) => $q->where('experience', $e))
            ->when($filters['category'] ?? null, fn(Builder $q, $c) => $q->where('category', $c));
    }
}

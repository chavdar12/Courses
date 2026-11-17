<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['title'])]
class Poll extends Model
{
    public function options(): HasMany
    {
        return $this->hasMany(Option::class);
    }
}

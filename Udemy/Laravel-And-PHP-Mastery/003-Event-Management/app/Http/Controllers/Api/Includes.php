<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

trait Includes
{
    /** Relations the client asked for with ?include=a,b.c, limited to the allowed ones. */
    protected function includes(Request $request, array $allowed): array
    {
        $asked = array_map('trim', explode(',', (string) $request->query('include')));

        return array_values(array_intersect($asked, $allowed));
    }
}

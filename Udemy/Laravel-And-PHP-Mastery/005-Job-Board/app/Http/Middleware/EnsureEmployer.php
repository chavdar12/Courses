<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmployer
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()->employer) {
            return redirect()->route('employer.create')->with('success', 'Register as an employer first.');
        }

        return $next($request);
    }
}

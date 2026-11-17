<?php

namespace App\Http\Controllers;

use App\Models\OfferedJob;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'min_salary' => ['nullable', 'integer', 'min:0'],
            'max_salary' => ['nullable', 'integer', 'min:0'],
            'experience' => ['nullable', Rule::in(OfferedJob::EXPERIENCE)],
            'category' => ['nullable', Rule::in(OfferedJob::CATEGORIES)],
        ]);

        $jobs = OfferedJob::with('employer')->filter($filters)->latest()->paginate(10)->withQueryString();

        return view('jobs.index', ['jobs' => $jobs]);
    }

    public function show(OfferedJob $job)
    {
        return view('jobs.show', [
            'job' => $job->load('employer.offeredJobs'),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\OfferedJob;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MyJobController extends Controller
{
    public function index(Request $request)
    {
        $jobs = $request->user()->employer->offeredJobs()
            ->with('jobApplications.user')
            ->withTrashed()
            ->latest()
            ->get();

        return view('my-jobs.index', ['jobs' => $jobs]);
    }

    public function create()
    {
        return view('my-jobs.form', ['job' => new OfferedJob()]);
    }

    public function store(Request $request)
    {
        $request->user()->employer->offeredJobs()->create($this->validated($request));

        return redirect()->route('my-jobs.index')->with('success', 'Job created.');
    }

    public function edit(OfferedJob $myJob)
    {
        $this->authorize('update', $myJob);

        return view('my-jobs.form', ['job' => $myJob]);
    }

    public function update(Request $request, OfferedJob $myJob)
    {
        $this->authorize('update', $myJob);
        $myJob->update($this->validated($request));

        return redirect()->route('my-jobs.index')->with('success', 'Job updated.');
    }

    public function destroy(OfferedJob $myJob)
    {
        $this->authorize('delete', $myJob);
        $myJob->delete();

        return redirect()->route('my-jobs.index')->with('success', 'Job deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'salary' => ['required', 'integer', 'min:5000', 'max:10000000'],
            'description' => ['required', 'string', 'max:10000'],
            'experience' => ['required', Rule::in(OfferedJob::EXPERIENCE)],
            'category' => ['required', Rule::in(OfferedJob::CATEGORIES)],
        ]);
    }
}

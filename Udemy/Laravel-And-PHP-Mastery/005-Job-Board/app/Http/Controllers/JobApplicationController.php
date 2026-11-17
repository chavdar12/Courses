<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\OfferedJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $applications = $request->user()->jobApplications()
            ->with(['offeredJob' => fn($q) => $q->withCount('jobApplications')->withAvg('jobApplications', 'expected_salary'), 'offeredJob.employer'])
            ->latest()
            ->get();

        return view('applications.index', ['applications' => $applications]);
    }

    public function create(OfferedJob $job)
    {
        $this->authorize('apply', $job);

        return view('applications.create', ['job' => $job]);
    }

    public function store(Request $request, OfferedJob $job)
    {
        $this->authorize('apply', $job);
        $data = $request->validate([
            'expected_salary' => ['required', 'integer', 'min:1', 'max:10000000'],
            'cv' => ['required', 'file', 'mimes:pdf', 'max:2048'],
        ]);

        // CVs are personal data: stored on the private disk under a random name
        $job->jobApplications()->create([
            'user_id' => $request->user()->id,
            'expected_salary' => $data['expected_salary'],
            'cv_path' => $request->file('cv')->store('cvs', 'local'),
        ]);

        return redirect()->route('jobs.show', $job)->with('success', 'Application submitted.');
    }

    public function destroy(Request $request, JobApplication $application)
    {
        abort_unless($application->user_id === $request->user()->id, 404);
        Storage::disk('local')->delete($application->cv_path);
        $application->delete();

        return back()->with('success', 'Application withdrawn.');
    }
}

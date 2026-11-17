<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployerController extends Controller
{
    public function create(Request $request)
    {
        abort_if($request->user()->employer, 403, 'You are already an employer.');

        return view('employer.create');
    }

    public function store(Request $request)
    {
        abort_if($request->user()->employer, 403, 'You are already an employer.');
        $request->user()->employer()->create($request->validate([
            'company_name' => ['required', 'string', 'min:2', 'max:255', 'unique:employers,company_name'],
        ]));

        return redirect()->route('my-jobs.index')->with('success', 'Your employer account is ready.');
    }
}

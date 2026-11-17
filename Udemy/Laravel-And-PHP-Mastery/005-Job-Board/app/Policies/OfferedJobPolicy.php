<?php

namespace App\Policies;

use App\Models\OfferedJob;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class OfferedJobPolicy
{
    public function apply(User $user, OfferedJob $job): Response
    {
        if ($job->employer->user_id === $user->id) {
            return Response::deny('You cannot apply to your own job.');
        }

        return $job->hasUserApplied($user) ? Response::deny('You already applied to this job.') : Response::allow();
    }

    public function update(User $user, OfferedJob $job): Response
    {
        if ($job->employer->user_id !== $user->id) {
            return Response::denyAsNotFound();
        }

        // applicants applied to what the job said at the time
        return $job->jobApplications()->exists()
            ? Response::deny('A job with applications cannot be changed.')
            : Response::allow();
    }

    public function delete(User $user, OfferedJob $job): Response
    {
        return $job->employer->user_id === $user->id ? Response::allow() : Response::denyAsNotFound();
    }
}

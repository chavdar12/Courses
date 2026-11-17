<?php

use App\Models\OfferedJob;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('company_name');
            $table->timestamps();
        });

        Schema::create('offered_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('salary');
            $table->string('location');
            $table->enum('experience', OfferedJob::EXPERIENCE)->default('entry');
            $table->enum('category', OfferedJob::CATEGORIES);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('offered_job_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('expected_salary');
            $table->string('cv_path');
            $table->unique(['user_id', 'offered_job_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('offered_jobs');
        Schema::dropIfExists('employers');
    }
};

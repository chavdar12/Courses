<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_and_logout(): void
    {
        $user = User::factory()->create(['email' => 'ana@example.com']);

        $this->get('/login')->assertOk();
        $this->post('/login', ['email' => 'ana@example.com', 'password' => 'password'])->assertRedirect('/jobs');
        $this->assertAuthenticatedAs($user);

        $this->delete('/logout')->assertRedirect('/jobs');
        $this->assertGuest();
    }

    public function test_wrong_password_is_rejected(): void
    {
        User::factory()->create(['email' => 'ana@example.com']);

        $this->post('/login', ['email' => 'ana@example.com', 'password' => 'nope'])->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_login_is_rate_limited(): void
    {
        foreach (range(1, 5) as $_) {
            $this->post('/login', ['email' => 'x@example.com', 'password' => 'x']);
        }
        $this->post('/login', ['email' => 'x@example.com', 'password' => 'x'])->assertTooManyRequests();
    }

    public function test_guests_are_sent_to_login(): void
    {
        $this->get('/my-applications')->assertRedirect('/login');
        $this->get('/my-jobs')->assertRedirect('/login');
    }
}

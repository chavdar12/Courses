<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_returns_a_token_that_authenticates(): void
    {
        User::factory()->create(['email' => 'ana@example.com']);

        $token = $this->postJson('/api/login', ['email' => 'ana@example.com', 'password' => 'password'])
            ->assertOk()->json('token');

        $this->withToken($token)->postJson('/api/events', [
            'name' => 'Meetup', 'start_time' => '2030-01-01 18:00', 'end_time' => '2030-01-01 20:00',
        ])->assertCreated();
    }

    public function test_login_rejects_a_wrong_password(): void
    {
        User::factory()->create(['email' => 'ana@example.com']);

        $this->postJson('/api/login', ['email' => 'ana@example.com', 'password' => 'nope'])
            ->assertUnprocessable()->assertJsonValidationErrors('email');
    }

    public function test_login_is_rate_limited(): void
    {
        foreach (range(1, 5) as $_) {
            $this->postJson('/api/login', ['email' => 'x@example.com', 'password' => 'x'])->assertUnprocessable();
        }
        $this->postJson('/api/login', ['email' => 'x@example.com', 'password' => 'x'])->assertTooManyRequests();
    }

    public function test_logout_revokes_the_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('api')->plainTextToken;

        $this->withToken($token)->postJson('/api/logout')->assertNoContent();
        $this->assertSame(0, $user->tokens()->count());
    }
}

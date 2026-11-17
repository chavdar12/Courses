<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_root_redirects_to_the_task_list(): void
    {
        $this->get('/')->assertRedirect('/tasks');
    }

    public function test_index_lists_tasks_newest_first_ten_per_page(): void
    {
        $old = Task::factory()->create(['title' => 'Oldest task', 'created_at' => now()->subDay()]);
        Task::factory(10)->create();

        $this->get('/tasks')->assertOk()->assertDontSee($old->title);
        $this->get('/tasks?page=2')->assertOk()->assertSee($old->title);
    }

    public function test_store_creates_a_task_and_redirects_to_it(): void
    {
        $response = $this->post('/tasks', ['title' => 'Buy milk', 'description' => 'Two litres']);

        $task = Task::sole();
        $response->assertRedirect(route('tasks.show', $task))->assertSessionHas('success');
        $this->assertSame('Buy milk', $task->title);
        $this->assertFalse($task->completed);
    }

    public function test_store_validates_input(): void
    {
        $this->post('/tasks', ['title' => '', 'description' => str_repeat('x', 2001)])
            ->assertSessionHasErrors(['title', 'description']);
        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_show_escapes_user_content(): void
    {
        $task = Task::factory()->create(['title' => '<script>alert(1)</script>']);

        $this->get(route('tasks.show', $task))->assertOk()
            ->assertDontSee('<script>alert(1)</script>', false)
            ->assertSee('&lt;script&gt;', false);
    }

    public function test_create_and_edit_forms_render(): void
    {
        $task = Task::factory()->create(['title' => 'Water plants']);

        $this->get('/tasks/create')->assertOk()->assertSee('Add task');
        $this->get(route('tasks.edit', $task))->assertOk()->assertSee('Water plants');
    }

    public function test_update_changes_the_task(): void
    {
        $task = Task::factory()->create();

        $this->put(route('tasks.update', $task), ['title' => 'New title', 'description' => 'New'])
            ->assertRedirect(route('tasks.show', $task));
        $this->assertSame('New title', $task->fresh()->title);
    }

    public function test_toggle_complete_flips_the_flag(): void
    {
        $task = Task::factory()->create(['completed' => false]);

        $this->put(route('tasks.toggle-complete', $task));
        $this->assertTrue($task->fresh()->completed);
        $this->put(route('tasks.toggle-complete', $task));
        $this->assertFalse($task->fresh()->completed);
    }

    public function test_destroy_deletes_the_task(): void
    {
        $task = Task::factory()->create();

        $this->delete(route('tasks.destroy', $task))->assertRedirect(route('tasks.index'));
        $this->assertModelMissing($task);
    }

    public function test_unknown_task_is_404(): void
    {
        $this->get('/tasks/999')->assertNotFound();
    }
}

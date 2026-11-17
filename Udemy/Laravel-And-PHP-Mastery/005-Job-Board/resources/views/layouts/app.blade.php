<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') · Job Board</title>
    <style>
        body { max-width: 860px; margin: 0 auto; padding: 24px 16px; font-family: system-ui, sans-serif; line-height: 1.5; color: #1f2328; }
        a { color: #0969da; }
        nav, .row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        nav { justify-content: space-between; margin-bottom: 24px; }
        label { display: block; margin-top: 12px; font-weight: 600; }
        input, textarea, select { width: 100%; padding: 8px; box-sizing: border-box; font: inherit; }
        input[type=checkbox], input[type=radio] { width: auto; }
        button, .button { padding: 8px 14px; border: 1px solid #1f2328; background: #1f2328; color: #fff; cursor: pointer; text-decoration: none; font: inherit; }
        .card { border: 1px solid #d0d7de; border-radius: 6px; padding: 16px; margin-bottom: 12px; }
        .muted { color: #59636e; }
        .error { color: #cf222e; }
        .flash { padding: 12px; background: #dafbe1; border: 1px solid #4ac26b; margin-bottom: 16px; }
        .done { text-decoration: line-through; }
    </style>
    @stack('head')
</head>
<body>
<nav>
    <a href="{{ route('jobs.index') }}"><strong>Job Board</strong></a>
    <div class="row">
        @auth
            <span>{{ auth()->user()->name }}</span>
            <a href="{{ route('applications.index') }}">My applications</a>
            <a href="{{ route('my-jobs.index') }}">My jobs</a>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                @method('DELETE')
                <button>Log out</button>
            </form>
        @else
            <a href="{{ route('login') }}">Log in</a>
        @endauth
    </div>
</nav>
@if (session('success'))
    <div class="flash" role="status">{{ session('success') }}</div>
@endif
<h1>@yield('title')</h1>
@yield('content')
@stack('scripts')
</body>
</html>

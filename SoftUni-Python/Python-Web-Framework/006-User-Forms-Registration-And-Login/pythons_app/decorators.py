from functools import wraps

from django.shortcuts import render


def group_required(groups):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            user = request.user
            if user.is_superuser or user.groups.filter(name__in=groups).exists():
                return view_func(request, *args, **kwargs)
            return render(request, "401.html", status=401)

        return wrapper

    return decorator

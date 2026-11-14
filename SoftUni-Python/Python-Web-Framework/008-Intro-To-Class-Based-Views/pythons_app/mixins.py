from django.core.exceptions import PermissionDenied


class GroupRequiredMixin:
    """
        group_required - list of strings, required param
    """
    group_required = None

    def dispatch(self, request, *args, **kwargs):
        user = request.user
        if not (user.is_superuser or user.groups.filter(name__in=self.group_required).exists()):
            raise PermissionDenied
        return super().dispatch(request, *args, **kwargs)

from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin


class OwnerRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return self.get_object().user.user == self.request.user

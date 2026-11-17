from django.contrib.auth.management import create_permissions
from django.db import migrations


def create_user_group(apps, schema_editor):
    # permissions are normally created after all migrations run, so force them now
    app_config = apps.get_app_config('pythons_app')
    app_config.models_module = True
    create_permissions(app_config, verbosity=0, apps=apps)
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    group, _ = Group.objects.get_or_create(name='User')
    group.permissions.set(Permission.objects.filter(
        content_type__app_label='pythons_app',
        codename__in=['add_python', 'view_python'],
    ))


def delete_user_group(apps, schema_editor):
    apps.get_model('auth', 'Group').objects.filter(name='User').delete()


class Migration(migrations.Migration):
    dependencies = [
        ('pythons_app', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.RunPython(create_user_group, delete_user_group),
    ]

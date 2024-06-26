from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

# Register your models here.
userModel = get_user_model()


@admin.register(userModel)
class UserAdmin(UserAdmin):

    fieldsets = (
        (None, {'fields': ('email', 'password', "role")}),

        (('Permissions'), {'fields': ('is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', "role"),
        }),
    )
    list_display = ('pk', 'email', 'is_staff', "role")
    search_fields = ('email', )
    ordering = ('pk','email',)
    list_filter = ["email"]
    readonly_fields = ["last_login"]

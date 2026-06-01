from django.utils.translation import gettext_lazy as _

from users.models import User

DEPARTMENT_SECTION = {
    "title": _("Department"),
    "separator": True,
    "items": [
        {"title": _("Departments"), "icon": "domain", "link": "/admin/departments/department/"},
        {"title": _("Heads of department"), "icon": "person", "link": "/admin/departments/headofdepartment/"},
        {"title": _("Faculty members"), "icon": "people", "link": "/admin/departments/facultymember/"},
        {"title": _("Educational programs"), "icon": "menu_book", "link": "/admin/departments/educationalprogram/"},
        {"title": _("Subjects"), "icon": "library_books", "link": "/admin/departments/programsubject/"},
        {"title": _("Department history"), "icon": "history", "link": "/admin/departments/departmenthistory/"},
        {"title": _("Tags"), "icon": "sell", "link": "/admin/departments/categorizedtag/"},
    ],
}


def get_navigation(request):
    user = request.user

    if not user.is_superuser and user.role == User.Role.DATA_OPERATOR:
        return [DEPARTMENT_SECTION]

    return [
        {
            "title": _("Main page"),
            "separator": True,
            "items": [
                {"title": _("Slider"), "icon": "photo_library", "link": "/admin/core/mainslideritem/"},
                {"title": _("Statistics"), "icon": "bar_chart", "link": "/admin/core/statisticblock/"},
                {"title": _("Partners"), "icon": "handshake", "link": "/admin/core/partner/"},
                {"title": _("FAQ"), "icon": "help", "link": "/admin/core/faq/"},
                {"title": _("Alumni"), "icon": "school", "link": "/admin/core/alumnus/"},
                {"title": _("Alumni slider"), "icon": "slideshow", "link": "/admin/core/alumnislider/"},
            ],
        },
        {
            "title": _("Events"),
            "separator": True,
            "items": [
                {"title": _("All events"), "icon": "event", "link": "/admin/events/event/"},
                {"title": _("Event categories"), "icon": "label", "link": "/admin/events/eventcategory/"},
            ],
        },
        DEPARTMENT_SECTION,
        {
            "title": _("Gallery"),
            "separator": True,
            "items": [
                {"title": _("Albums"), "icon": "photo_album", "link": "/admin/gallery/album/"},
                {"title": _("Photos"), "icon": "photo_library", "link": "/admin/gallery/albumphoto/"},
            ],
        },
        {
            "title": _("Users"),
            "separator": True,
            "items": [
                {"title": _("Users"), "icon": "manage_accounts", "link": "/admin/users/user/"},
            ],
        },
        {
            "title": _("Other"),
            "separator": True,
            "items": [
                {"title": _("Translations (Rosetta)"), "icon": "translate", "link": "/rosetta/"},
                {"title": _("OAuth tokens"), "icon": "key", "link": "/admin/oauth2_provider/accesstoken/"},
                {"title": _("OAuth applications"), "icon": "apps", "link": "/admin/oauth2_provider/application/"},
                {"title": _("Access groups"), "icon": "group", "link": "/admin/auth/group/"},
            ],
        },
    ]

import re

from rest_framework.exceptions import PermissionDenied

from .models import User

def assign_user_role(user):
    """Defines the user role for email and stores it in the database"""
    email = (user.email or "").lower()

    if re.match(r"^[a-z]+\_[a-z]+\d{2}@nuwm\.edu\.ua$", email):
        user.role = User.Role.STUDENT
    elif re.match(r"^[a-z](\.[a-z]+)+@nuwm\.edu\.ua$", email):
        user.role = User.Role.TEACHER

    user.save()

def check_user_email(email):
    """Checks if the email is valid"""

    if not email.endswith("@nuwm.edu.ua"):
        raise PermissionDenied("Only @nuwm.edu.ua emails are allowed.")
import re

from .models import User

def assign_user_role(user):
    """Defines the user role for email and stores it in the database"""
    email = (user.email or "").lower()

    if not email.endswith("@nuwm.edu.ua"):
        user.role = User.Role.GUEST
    elif re.match(r"^[a-z]+\_[a-z]+\d{2}@nuwm\.edu\.ua$", email):
        user.role = User.Role.STUDENT
    elif re.match(r"^[a-z](\.[a-z]+)+@nuwm\.edu\.ua$", email):
        user.role = User.Role.TEACHER
    else:
        user.role = User.Role.GUEST

    user.save()

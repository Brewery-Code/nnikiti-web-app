import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_rgba(value):
    """
    Validates that a string matches the RGBA format.

    The expected format is (R,G,B,A), where:
        - R, G, B are integers from 0 to 255
        - A is a float between 0 and 1 (e.g., 0.5)

    Example of valid input: (255,255,255,0.5)

    :param value: The RGBA string to validate.
    :raises ValidationError: If the value does not match the expected format.
    """
    pattern = r"^\(\d{1,3},\d{1,3},\d{1,3},(0(\.\d+)?|1(\.0)?)\)$"
    if not re.match(pattern, value):
        raise ValidationError(
            _("RGBA format should look like: (255,255,255,0.5)"),
            code="invalid_rgba",
        )

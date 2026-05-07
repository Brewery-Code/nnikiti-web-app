from drf_spectacular.openapi import AutoSchema as BaseAutoSchema
from drf_spectacular.utils import OpenApiParameter
from drf_spectacular.types import OpenApiTypes


class AutoSchema(BaseAutoSchema):
    def get_operation_parameters(self, *args, **kwargs):
        params = super().get_operation_parameters(*args, **kwargs)
        params.append(
            OpenApiParameter(
                name='Accept-Language',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.HEADER,
                description='Мова відповіді. `uk` — українська (за замовчуванням), `en` — англійська.',
                required=False,
                enum=['uk', 'en'],
            )
        )
        return params

from fastapi import APIRouter, BackgroundTasks

from app.api.deps import CurrentUser, TranslateServiceDep
from app.database.models import Translation
from app.database.schemas.Translation import (
    TranslationRequest,
    TranslationResponse,
    Translations,
)

router = APIRouter(prefix="/translation", tags=["translation"])


@router.post("/translate")
async def translate(
    translate_service: TranslateServiceDep,
    translate_req: TranslationRequest,
    background_tasks: BackgroundTasks,
) -> TranslationResponse:
    """
    Start the translation process
    """

    translation = Translation.model_validate(translate_req)
    # Start background task to generate and stream response
    background_tasks.add_task(
        translate_service.translate,
        text=translation.src,
        translate_id=str(translation.id),
    )

    return TranslationResponse.model_validate(translation)


@router.post("/get_translations")
def get_translations(
    translate_service: TranslateServiceDep, current_user: CurrentUser | None
) -> Translations:
    """
    Start the translation process
    """

    if current_user:
        translations, error = translate_service.get_translations(
            super_user=current_user.is_superuser
        )
    else:
        translations, error = translate_service.get_translations()

    if error:
        raise error

    assert translations is not None

    return translations

from fastapi import APIRouter, BackgroundTasks

from app.api.deps import CurrentUser, CurrentUserOptional, TranslateServiceDep
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
    translate_service: TranslateServiceDep, current_user: CurrentUserOptional
) -> bool:
    """
    Start the translation process
    """

    if current_user and current_user.is_superuser:
        set_status, error = translate_service.set_status(approved=False)

    if error:
        raise error

    assert set_status is not None

    return set_status


@router.post("/set_submission_status")
def set_submission_status(
    translate_service: TranslateServiceDep, current_user: CurrentUser
) -> Translations:
    """
    Start the translation process
    """

    if current_user and current_user.is_superuser:
        translations, error = translate_service.get_translations(
            super_user=current_user.is_superuser
        )
    else:
        translations, error = translate_service.get_translations()

    if error:
        raise error

    assert translations is not None

    return translations

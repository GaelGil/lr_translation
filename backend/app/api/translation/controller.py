from fastapi import APIRouter, BackgroundTasks

from app.api.deps import CurrentUser, SessionDep, TranslateServiceDep
from app.database.models import Translation
from app.database.schemas.Translation import (
    TranslationRequest,
    TranslationResponse,
    TranslationsAdmin,
    TranslationsPublic,
    TranslationUpdate,
)

router = APIRouter(prefix="/translation", tags=["translation"])


@router.post("/translate")
async def translate(
    translate_service: TranslateServiceDep,
    translate_req: TranslationRequest,
    background_tasks: BackgroundTasks,
    session: SessionDep,
) -> TranslationResponse:
    """
    Start the translation process
    """

    translation = Translation.model_validate(translate_req)
    session.add(translation)
    session.commit()
    # Start background task to generate and stream response
    background_tasks.add_task(
        translate_service.translate,
        text=translation.src,
        translate_id=str(translation.id),
    )

    return TranslationResponse.model_validate(translation)


@router.post("/set_submission_status")
def set_submission_status(
    translate_service: TranslateServiceDep,
    current_user: CurrentUser,
    translation_update: TranslationUpdate,
) -> bool:
    """
    Start the translation process
    """

    if current_user and current_user.is_superuser:
        result = translate_service.set_status(
            translation_id=translation_update.id, status=translation_update.new_status
        )
    if result.is_err:
        assert result.error
        raise result.error

    assert result.value is not None

    return result.value


@router.post("/get_translations_public")
def get_translations_public(
    translate_service: TranslateServiceDep,
) -> TranslationsPublic:
    """
    Start the translation process
    """

    result = translate_service.get_translations()

    if result.is_err:
        assert result.error
        raise result.error

    assert result.value is not None and isinstance(result.value, TranslationsPublic)

    return result.value


@router.post("/get_translations")
def get_translations(
    translate_service: TranslateServiceDep, current_user: CurrentUser
) -> TranslationsAdmin:
    """
    Start the translation process
    """

    result = translate_service.get_translations(super_user=current_user.is_superuser)

    if result.is_err:
        assert result.error
        raise result.error

    assert result.value is not None and isinstance(result.value, TranslationsAdmin)

    return result.value

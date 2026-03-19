from fastapi import APIRouter, BackgroundTasks

from app.api.deps import TranslateServiceDep
from app.database.models import Translation
from app.database.schemas.Translation import TranslationRequest, TranslationResponse

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

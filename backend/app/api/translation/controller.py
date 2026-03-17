from fastapi import APIRouter, BackgroundTasks

from app.api.deps import TranslateServiceDep
from app.database.models import Translation
from app.database.schemas.Translation import TranslationRequest

router = APIRouter(prefix="/translation", tags=["translation"])


@router.post("/translate")
async def translate(
    translate_service: TranslateServiceDep,
    translate_req: TranslationRequest,
    background_tasks: BackgroundTasks,
):
    """
    Sart the chat
    """

    req = Translation.model_validate(translate_req)
    # Start background task to generate and stream response
    background_tasks.add_task(
        translate_service.translate,
        text=req.src,
        message_id=str(req.id)
    )

    # return message

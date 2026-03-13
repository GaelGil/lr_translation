
from fastapi import APIRouter, BackgroundTasks

from app.api.deps import TranslateServiceDep
from app.database.schemas.Translate import TranslateRequest

router = APIRouter(prefix="/translation", tags=["translation"])


@router.post("/translate")
async def translate(
    translate_service: TranslateServiceDep,
    translate_req: TranslateRequest,
    background_tasks: BackgroundTasks,
) :
    """
    Sart the chat
    """


    # Start background task to generate and stream response
    background_tasks.add_task(
        translate_service.generate_response,
        text=translate_req.text
    )

    # return message

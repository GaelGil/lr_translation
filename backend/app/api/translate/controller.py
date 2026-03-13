
from fastapi import APIRouter, BackgroundTasks

from app.api.deps import SessionServiceDep
from app.database.models import Message as SessionMessage
from app.database.schemas.Session import (
    StreamResponseBody,
)

router = APIRouter(prefix="/translation", tags=["translation"])


@router.post("/translate")
async def translate(
    session_service: SessionServiceDep,
    body: StreamResponseBody,
    background_tasks: BackgroundTasks,
) :
    """
    Sart the chat
    """


    # Start background task to generate and stream response
    background_tasks.add_task(
        session_service.generate_response,
        text=body.message
    )

    # return message

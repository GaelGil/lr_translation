import asyncio
import uuid

from fastapi import HTTPException
from sqlmodel import Session, select

from app.api.websocket.ConnectionManager import manager
from app.database.models import Translation
from app.database.schemas.Translation import Translations, TranslationSimple


class TranslationService:
    def __init__(self, session: Session):
        self.session = session
        self.manager = manager

    def get_translations(
        self, super_user: bool = False
    ) -> tuple[Translations, None] | tuple[None, HTTPException]:
        try:
            translations = self.session.exec(
                select(Translation).where(Translation.public_status == super_user)
            ).all()
        except Exception as e:
            return None, HTTPException(status_code=400, detail=str(e))
        simple_translations = []
        for translation in translations:
            simple_translations.append(TranslationSimple.model_validate(translation))

        return Translations(translations=simple_translations), None

    async def translate(self, text: str, translate_id: str):
        """ """
        await self.manager.stream_response_chunk(
            translate_id=translate_id,
            chunk="",
            is_complete=False,
        )
        words = text.split()
        final_word = words[-1]
        for word in words:
            await self.manager.stream_response_chunk(
                translate_id=translate_id,
                chunk=word,
                is_complete=word == final_word,
            )
            await asyncio.sleep(5)
        translation = self.session.get(Translation, uuid.UUID(translate_id))
        assert translation
        translation.target = text
        self.session.add(translation)
        self.session.commit()
        return text

    def set_status(
        self, submission_id: uuid.UUID, status: bool
    ) -> tuple[bool, HTTPException] | tuple[bool, None]:
        submission = self.session.get(Translation, submission_id)

        assert submission is not None
        submission.public_status = status
        try:
            self.session.add(submission)
            self.session.commit()
            return True, None
        except Exception as e:
            return False, HTTPException(
                status_code=403, detail=f"Error  {e}: not able to update status"
            )

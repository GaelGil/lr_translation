import asyncio

from sqlmodel import Session

from app.api.websocket.ConnectionManager import manager


class TranslationService:
    def __init__(self, session: Session):
        self.session = session
        self.manager = manager

    async def translate(self, text: str, message_id: str):
        """

        Get APIService to generate response
        Args:
            chat_history (list): chat history
            model_name (str): model name
            session_id (uuid.UUID): session id
            message_id (uuid.UUID): message id

        """
        words = text.split()

        for i, word in enumerate(words):
            await self.manager.stream_response_chunk(
                message_id=message_id,
                chunk=word + " " if i < len(words) - 1 else word,
                is_complete=i == len(words) - 1,
            )
            if i < len(words) - 1:
                await asyncio.sleep(5)

        return text

import asyncio

from sqlmodel import Session

from app.api.websocket.ConnectionManager import manager


class TranslationService:
    def __init__(self, session: Session):
        self.session = session
        self.manager = manager

    async def translate(self, text: str, translate_id: str):
        """

        Get APIService to generate response
        Args:
            chat_history (list): chat history
            model_name (str): model name
            session_id (uuid.UUID): session id
            message_id (uuid.UUID): message id

        """
        await self.manager.stream_response_chunk(
            translate_id=translate_id,
            chunk="",
            is_complete=False,
        )
        words = text.split()
        print(f"WORDS: {words}")
        final_word = words[-1]
        for word in words:
            print(f"WORDSSSSSSSSSSSS: {word}")
            await self.manager.stream_response_chunk(
                translate_id=translate_id,
                chunk=word,
                is_complete=word == final_word,
            )
            await asyncio.sleep(2)

        # for i, word in enumerate(words):
        #     print(f"DEBUG: WORD: {word}")
        #     await self.manager.stream_response_chunk(
        #         message_id=message_id,
        #         chunk=word + " " if i < len(words) - 1 else word,
        #         is_complete=i == len(words) - 1,
        #     )
        #     if i < len(words) - 1:

        return text

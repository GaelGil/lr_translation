
from sqlmodel import Session

from app.services.APIService import APIService


class TranslateService:
    def __init__(self, session: Session, api_service: APIService):
        self.session = session
        self.api_service = api_service

    async def generate_response(
        self,
        text: str
    ):
        """

        Get APIService to generate response
        Args:
            chat_history (list): chat history
            model_name (str): model name
            session_id (uuid.UUID): session id
            message_id (uuid.UUID): message id

        """
        return text

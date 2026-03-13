from sqlmodel import Session


class TranslateService:
    def __init__(self, session: Session):
        self.session = session

    async def generate_response(self, text: str):
        """

        Get APIService to generate response
        Args:
            chat_history (list): chat history
            model_name (str): model name
            session_id (uuid.UUID): session id
            message_id (uuid.UUID): message id

        """
        return text

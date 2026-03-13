from sqlmodel import Field, SQLModel
from enum import Enum





class TranslationStatus(Enum):
    INPROGRESS= "inporgress"
    FAILED = "failed"
    COMPLTED = "completed"



class TranslateRequest(SQLModel):
    text: str = Field(nullable=False)


class TranslateResponse(SQLModel):
    message: str
    status: TranslationStatus = Field(default=TranslationStatus.INPROGRESS)

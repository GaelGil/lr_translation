from enum import Enum
from sqlmodel import Field, SQLModel
from sqlalchemy import Column, Text




class TranslationStatus(Enum):
    INPROGRESS= "inporgress"
    FAILED = "failed"
    COMPLETE = "completed"



class TranslateRequest(SQLModel):
    text: str = Field(nullable=False)


class MessageBase(SQLModel):
    text: str = Field(sa_column=Column(Text, nullable=False))
    status: TranslationStatus = Field(default=TranslationStatus.COMPLETE, nullable=False)

class TranslateResponse(SQLModel):
    message: str
    status: TranslationStatus = Field(default=TranslationStatus.INPROGRESS)

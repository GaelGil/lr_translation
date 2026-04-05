import uuid
from enum import Enum

from sqlalchemy import Column, Text
from sqlmodel import Field, SQLModel


class TranslationStatus(Enum):
    INPROGRESS = "inporgress"
    FAILED = "failed"
    COMPLETE = "completed"


class TranslationResponseType(Enum):
    TRANSLATION_CHUNK = "translation_chunk"


class TranslationBase(SQLModel):
    src: str = Field(sa_column=Column(Text, nullable=False))
    target: str | None = Field(sa_column=Column(Text, nullable=True))
    status: TranslationStatus = Field(
        default=TranslationStatus.COMPLETE, nullable=False
    )
    public_status: bool = Field(default=False, nullable=False)


class TranslationRequest(TranslationBase):
    pass


class TranslationResponse(TranslationBase):
    id: uuid.UUID

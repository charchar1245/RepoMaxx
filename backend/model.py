from datetime import datetime
from sqlalchemy import String, Text, Datetime
from sqlalchemy.orm import Mapped, mapped_column

from database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(Datetime, default=datetime.utcnow)
    
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from database import engine, Base, SessionLocal
from models import Incident
from schemas import IncidentCreate

Base.metadata.create_all(bind=engine)

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://repomaxx.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/hello")
def hello():
    return {"message": "Hello from fastAPI"}

@app.post("/incidents")
def create_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    new_incident = Incident(
        title=incident.title,
        description=incident.description
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return new_incident
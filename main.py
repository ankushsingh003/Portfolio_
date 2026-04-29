from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./portfolio.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ContactModel(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    number = Column(String(20))
    message = Column(Text)

Base.metadata.create_all(bind=engine)

# Pydantic schema
class ContactSchema(BaseModel):
    name: str
    email: EmailStr
    number: str = ""
    message: str

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/contact")
def create_contact(contact: ContactSchema, db: Session = Depends(get_db)):
    db_contact = ContactModel(
        name=contact.name,
        email=contact.email,
        number=contact.number,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return {"message": "Thank you for contacting me! Your message has been saved."}

@app.get("/admin/messages")
def get_messages(db: Session = Depends(get_db)):
    messages = db.query(ContactModel).all()
    return messages

@app.get("/")
def read_root():
    return {"message": "Portfolio API is running"}

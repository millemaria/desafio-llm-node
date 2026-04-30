import os
import sys
from dotenv import load_dotenv

# Carrega o .env localizado na raiz da pasta python-llm
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

if not os.getenv("HF_TOKEN"):
    print("AVISO: HF_TOKEN não encontrado no arquivo .env!")
else:
    print(f"Sucesso: Token carregado (Início: {os.getenv('HF_TOKEN')[:5]}...)")

sys.path = sys.path + [os.path.join(base_dir, "app")]

from fastapi import FastAPI
from pydantic import BaseModel
from services.llm_service import LLMService

app = FastAPI()
llm_service = LLMService()


class TextData(BaseModel):
    text: str
    lang: str


@app.get("/")
async def root():
    return {"message": "API is running"}


@app.post("/summarize")
async def summarize(data: TextData):
    summary = llm_service.summarize_text(data.text, data.lang)
    return {"summary": summary}

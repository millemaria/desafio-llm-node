import os
import sys
from dotenv import load_dotenv

# Load env
load_dotenv('python-llm/.env')

sys.path.append(os.path.abspath('python-llm/app'))
from services.llm_service import LLMService

llm = LLMService()
res = llm.summarize_text("A inteligência artificial é muito importante para o futuro da humanidade.", "en")
print("RESULTADO:", res)

import os
from huggingface_hub import InferenceClient
from langchain.prompts import PromptTemplate


LANGUAGE_MAP = {
    "pt": "Português",
    "en": "English",
    "es": "Español",
}


class LLMService:
    def __init__(self):
        self.token = os.getenv("HF_TOKEN")
        # Qwen 2.5 7B é excelente para este tipo de tarefa
        self.model = "Qwen/Qwen2.5-7B-Instruct"
        self.url = f"https://api-inference.huggingface.co/models/{self.model}"

    def summarize_text(self, text: str, lang: str) -> str:
        language = LANGUAGE_MAP.get(lang, "Português")
        try:
            import requests
            
            # Prompt formatado para o modelo Qwen
            prompt = (
                f"<|im_start|>system\nYou are an expert translator and summarizer. "
                f"Provide a concise summary translated entirely into {language}. "
                f"Output ONLY the summary.<|im_end|>\n"
                f"<|im_start|>user\n{text}<|im_end|>\n"
                f"<|im_start|>assistant\nSummary in {language}:"
            )
            
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": 500,
                    "temperature": 0.3,
                    "return_full_text": False
                },
                "options": {
                    "wait_for_model": True
                }
            }
            
            headers = {"Authorization": f"Bearer {self.token}"}
            
            response = requests.post(self.url, headers=headers, json=payload)
            response.raise_for_status()
            
            result = response.json()
            
            # O retorno pode ser uma lista ou um dict dependendo do modelo
            if isinstance(result, list) and len(result) > 0:
                summary = result[0].get("generated_text", "").strip()
            else:
                summary = str(result).strip()
            
            # Limpeza caso o modelo inclua prefixos
            marker = f"Summary in {language}:"
            if marker in summary:
                summary = summary.split(marker)[-1].strip()
            
            return summary
        except Exception as e:
            print(f"Erro ao chamar o LLM via Requests ({self.model}): {e}")
            # Se for erro de JSON no response.text, mostra o texto pra debug
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response body: {e.response.text[:200]}")
            return f"[Erro]: Falha na comunicação com a API (LLM). Detalhes: {str(e)[:100]}"

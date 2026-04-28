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
        # Mistral-7B é excelente para instruções multilinguagem
        self.client = InferenceClient(
            model="mistralai/Mistral-7B-Instruct-v0.2",
            token=os.getenv("HF_TOKEN"),
        )

        self.prompt_template = PromptTemplate(
            input_variables=["text", "language"],
            template=(
                "Summarize the following text concisely and clearly. "
                "The summary MUST be written in {language}.\n\n"
                "Text:\n{text}\n\n"
                "Summary:"
            ),
        )

    def summarize_text(self, text: str, lang: str) -> str:
        language = LANGUAGE_MAP.get(lang, "Português")
        try:
            prompt = self.prompt_template.format(text=text, language=language)
            
            response = self.client.text_generation(
                prompt,
                max_new_tokens=250,
                temperature=0.4,
            )
            
            summary = response.strip()
            # Limpeza caso o modelo repita o marcador "Summary:"
            if "Summary:" in summary:
                summary = summary.split("Summary:")[-1].strip()
            
            return summary
        except Exception as e:
            print(f"Erro ao chamar o LLM: {e}")
            # Fallback que avisa sobre o erro e o idioma alvo
            return f"[Resumo Parcial (Erro de Conexão)]: {text[:120]}... [Idioma solicitado: {language}]"

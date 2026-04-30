import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv('python-llm/.env')
token = os.getenv("HF_TOKEN")

# Test list of models that are usually available
models_to_test = [
    "Qwen/Qwen2.5-1.5B-Instruct",
    "microsoft/Phi-3.5-mini-instruct",
    "google/gemma-2-2b-it",
    "facebook/bart-large-cnn"
]

for model_id in models_to_test:
    print(f"Testing {model_id}...")
    try:
        client = InferenceClient(model=model_id, token=token)
        # Use simple completion
        res = client.post(json={"inputs": "Hello", "parameters": {"max_new_tokens": 5}})
        print(f"SUCCESS: {res}")
    except Exception as e:
        print(f"FAILED: {e}")

import requests
import os
from dotenv import load_dotenv

load_dotenv('python-llm/.env')
token = os.getenv("HF_TOKEN")

url = "https://api-inference.huggingface.co/models/gpt2"
headers = {"Authorization": f"Bearer {token}"}
payload = {"inputs": "Summarize: The sky is blue.", "parameters": {"max_new_tokens": 20}}

print(f"Testing with verify=False...")
try:
    # Disable SSL verification
    response = requests.post(url, headers=headers, json=payload, verify=False)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")

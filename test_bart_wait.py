import os
import requests
from dotenv import load_dotenv

load_dotenv('python-llm/.env')
token = os.getenv("HF_TOKEN")

model_id = "facebook/bart-large-cnn"
url = f"https://api-inference.huggingface.co/models/{model_id}"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
    "x-wait-for-model": "true"
}
payload = {"inputs": "Summarize: Artificial Intelligence is transforming the world."}

print(f"Testing {model_id} with x-wait-for-model...")
try:
    response = requests.post(url, headers=headers, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

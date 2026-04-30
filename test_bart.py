import os
import requests
from dotenv import load_dotenv

load_dotenv('python-llm/.env')
token = os.getenv("HF_TOKEN")

# Model that is VERY likely to be on the free tier
model_id = "facebook/bart-large-cnn"
url = f"https://api-inference.huggingface.co/models/{model_id}"
headers = {"Authorization": f"Bearer {token}"}
payload = {"inputs": "The sky is blue because of Rayleigh scattering. Sunlight reaches Earth's atmosphere and is scattered in all directions by all the gases and particles in the air. Blue light is scattered more than the other colors because it travels as shorter, smaller waves. This is why we see a blue sky."}

print(f"Testing {model_id}...")
try:
    response = requests.post(url, headers=headers, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

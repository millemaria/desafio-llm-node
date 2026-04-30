import requests
import os
from dotenv import load_dotenv

load_dotenv('python-llm/.env')
token = os.getenv("HF_TOKEN")

# Use IP from ping
ip = "108.139.119.60" 
url = f"https://{ip}/models/Qwen/Qwen2.5-7B-Instruct"
headers = {
    "Host": "api-inference.huggingface.co",
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
payload = {"inputs": "Summarize: The sky is blue."}

print(f"Testing with IP {ip} and Host header...")
try:
    # Disable SSL verification because the certificate won't match the IP
    response = requests.post(url, headers=headers, json=payload, verify=False)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")

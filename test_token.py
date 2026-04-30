import os
from dotenv import load_dotenv
from huggingface_hub import whoami

load_dotenv('python-llm/.env')
token = os.getenv("HF_TOKEN")

print(f"Testing token: {token[:10]}...")
try:
    user_info = whoami(token=token)
    print(f"Token is VALID. User: {user_info['name']}")
except Exception as e:
    print(f"Token is INVALID: {e}")

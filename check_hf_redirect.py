import requests
url = "https://api-inference.huggingface.co/models/gpt2"
try:
    res = requests.get(url)
    print(f"Final URL: {res.url}")
    print(f"Status: {res.status_code}")
    print(f"History: {res.history}")
    print(f"Body: {res.text[:200]}")
except Exception as e:
    print(f"Error: {e}")

import requests
try:
    res = requests.post("http://localhost:8000/summarize", json={"text": "A inteligência artificial é o futuro.", "lang": "en"})
    print(res.json())
except Exception as e:
    print(f"Error: {e}")

import requests

url = 'http://localhost:5000/results'
r = requests.post(url,json={'text':5, 'label1':200})

print(r.json())
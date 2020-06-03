import requests

url = 'http://localhost:5000/results'
r = requests.post(url,json={'text':5, 'label1':200, 'label2':200, 'label3':200, 'label4':200, 'label5':200})

print(r.json())
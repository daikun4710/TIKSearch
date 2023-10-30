import requests
from bs4 import BeautifulSoup

url = "https://www.ikyu.com/kankou/area8050/"

response = requests.get(url)
response.encoding = response.apparent_encoding

bs = BeautifulSoup(response.text, 'html.parser')

for i in bs.select("h3"):
    print(i.getText())
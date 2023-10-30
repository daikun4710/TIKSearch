import requests
from bs4 import BeautifulSoup
import os

ms_token = os.environ.get("ms_token", None)
base_url = "https://www.tiktok.com"

def fetch_html(url, headers):
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    return None

def extract_tiktok_data(html):
    if html is not None:
        soup = BeautifulSoup(html, 'html.parser')
        # ページから必要な情報を抽出して処理する
        # ビデオ情報を抽出する例
        video_elements = soup.find_all('div', class_='video-feed-item')  # ビデオ情報を含む要素を取得

        for video_element in video_elements:
            video_title = video_element.find('h1').text
            print(video_title)

def search_tiktok(keyword):
    url = f"{base_url}/api/discover/{keyword}?lang=en"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }

    html = fetch_html(url, headers)
    extract_tiktok_data(html)

if __name__ == "__main__":
    search_tiktok('グルメ')

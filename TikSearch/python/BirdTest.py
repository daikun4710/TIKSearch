import requests
from playwright.sync_api import sync_playwright


class TikTokAPI:
    def __init__(self):
        self.playwright = sync_playwright().start()

    def search(self, keyword):
        """キーワード検索を行う"""
        browser = self.playwright.chromium.launch(timeout=6000000)
        page = browser.new_page()

        # Playwrightをウォームアップ
        page.goto("https://www.google.com/")

        # TikTokの検索ページにアクセス
        page.goto("https://www.tiktok.com/explore")

        # 検索ワードを入力
        page.fill("input[name='keyword']", keyword, timeout=600000)

        # 検索ボタンをクリック
        page.click("button[type='submit']", timeout=600000)

        response = page.content()
        browser.close()
        return response

    def get_video_info(self, response):
        """動画情報を取得する"""
        videos = response.find_all("div", class_="video-item")
        for video in videos:
            info = {
                "id": video["data-id"],
                "title": video["data-title"],
                "author": video["data-author"],
                "view_count": video["data-view-count"],
                "like_count": video["data-like-count"],
                "share_count": video["data-share-count"],
                "comment_count": video["data-comment-count"],
            }
            yield info


if __name__ == "__main__":
    api = TikTokAPI()
    response = api.search("猫")
    for info in api.get_video_info(response):
        print(info)
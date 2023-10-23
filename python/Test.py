from TikTokApi import TikTokApi

async def search_and_display_videos(api, keyword, count=10):
    # キーワードで検索
    search_results = await api.search(keyword, count=count)

    for video in search_results:
        print(f"Video ID: {video.id}")
        print(f"Video URL: {video.url}")
        print(f"Author: {video.author.username}")
        print(f"Description: {video.description}")
        print(f"Likes: {video.stats['diggCount']}")
        print(f"Shares: {video.stats['shareCount']}")
        print(f"Comments: {video.stats['commentCount']}")
        print(f"Views: {video.stats['playCount']}")
        print("\n")

if __name__ == "__main__":
    # TikTokApiの初期化
    api = TikTokApi()

    # キーワードで検索
    keyword = "キーワードをここに入力"
    count = 10  # 取得する動画の数
    await search_and_display_videos(api, keyword, count)

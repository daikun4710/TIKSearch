from TikTokApi import TikTokApi
import asyncio
import os

ms_token = os.environ.get("ms_token", None)  # 自分のms_tokenを設定します

async def search_videos_by_keyword():
    api = TikTokApi.get_instance(custom_verifyFp="your_verifyFp_here")  # カスタムのverifyFpを指定してインスタンスを取得
    await api.suggested_for_you()

    keyword = "cat"  # 検索したいキーワードを指定します
    count = 10  # 取得する動画の数を指定します
    videos = await api.search_for_hashtags(keyword, count=count)
    
    for video in videos:
        # 動画情報を表示するか、必要に応じて処理を行います
        print("Video ID:", video['id'])
        print("Author:", video['author']['uniqueId'])
        print("Description:", video['desc'])
        print("Likes:", video['stats']['diggCount'])
        print("Shares:", video['stats']['shareCount'])
        print("Comments:", video['stats']['commentCount'])
        print("Views:", video['stats']['playCount'])
        print("\n")

if __name__ == "__main__":
    asyncio.run(search_videos_by_keyword())

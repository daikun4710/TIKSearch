from TikTokApi import TikTokApi
from TikTokApi.api.keyword import Keyword
import asyncio
import os

ms_token = os.environ.get("ms_token", None)

async def user_example():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        
        keyword_search = Keyword()
        keyword_search.parent = api  # Keyword クラスに親の TikTokApi インスタンスを設定
        
        async for related_video in keyword_search.search(keyword='funny', count=10):
            print(related_video)

if __name__ == "__main__":
    asyncio.run(user_example())
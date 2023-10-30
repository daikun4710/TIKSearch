from TikTokApi import TikTokApi
import asyncio
import os

ms_token = os.environ.get("ms_token", "7-Xer3neNEVCuOhzJ4T6ah5XPvHJ7evMgLWT4fzw7otBMKZcK2L06kXtRBgZZKnGhtHDfAPdRvlcIi1xZUvAlyTDHDr1UlQKqfTh2Vxl0v-LmYe04lCCD2LO6NTVsWh3KnKGtuV6jppZTgUQ") # get your own ms_token from your cookies on tiktok.com

async def trending_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        async for video in api.trending.videos(count=1):
            print(video)
            # print(video.as_dict)

if __name__ == "__main__":
    asyncio.run(trending_videos())
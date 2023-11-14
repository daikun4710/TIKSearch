from TikTokApi import TikTokApi
import asyncio
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
#utf-8エンコーディング

ms_token = os.environ.get("ms_token","7-Xer3neNEVCuOhzJ4T6ah5XPvHJ7evMgLWT4fzw7otBMKZcK2L06kXtRBgZZKnGhtHDfAPdRvlcIi1xZUvAlyTDHDr1UlQKqfTh2Vxl0v-LmYe04lCCD2LO6NTVsWh3KnKGtuV6jppZTgUQ")  # set your own ms_token

async def get_hashtag_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        tag = api.hashtag(name="福岡グルメ")
        async for video in tag.videos(count=35,cursor=0):
            # print(video.as_dict)
            address=""
            video_description = video.as_dict['desc'] 
            if 'poi' in video.as_dict:
                address = video.as_dict['poi']['address']
                video_description= address+'　'+video_description
            print(video_description) #概要　住所
            # print(video)
            print(video.as_dict['video']['zoomCover']['960'])
            print(video.as_dict['author']['uniqueId'])
            # 住所取得 poiが存在し　郵便番号がある場合
            

if __name__ == "__main__":
    asyncio.run(get_hashtag_videos())
from TikTokApi import TikTokApi
import asyncio
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
#utf-8エンコーディング

ms_token = os.environ.get("ms_token","E7hDXPgowjq7BqwVr0wDUiiT5-FvJBa2PBbqVSglGVMtc0FJOn-Ycxh1fe_mIAx-zu9knGwbABXjmFCqWFV405-By_qdd_NUUin3sAAwjNyqann4wSQw3kUDIwv8jCVqmkBDoRFf6O2KvtI=")  # set your own ms_token

async def get_hashtag_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        tage = 0
        result = 30
        while tage < result:
            tag = api.hashtag(name="観光スポット")
            async for video in tag.videos(count=35,cursor=tage):
                # 住所取得 poiが存在し　郵便番号がある場合
                address = ""
                if 'poi' in video.as_dict:
                    address = video.as_dict['poi']['address']
                video_description = video.as_dict['desc']
                print("動画の概要欄+住所:", video_description+address)
                print(video.as_dict['id'])
                tage += 1

if __name__ == "__main__":
    asyncio.run(get_hashtag_videos())
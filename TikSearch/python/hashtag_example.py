import argparse
from TikTokApi import TikTokApi
import asyncio
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

# コマンドライン引数の解析
parser = argparse.ArgumentParser(description="Get TikTok videos by hashtag")
parser.add_argument("--hashtag", type=str, help="Hashtag to search for", required=True)
args = parser.parse_args()

ms_token = os.environ.get("ms_token","9YKCs1YoKTLYWjaGyFOEUwIqjiun59MZH4fLnoGIyciHAN_3krAsU4KT0kF8jA-m22enIuKr_o2xFCqg_WWfUb7x5GmITLssl35bzHsScqqBLmJjjHBUt2He6RKG0OafJpYtt65mzS-s39IOmWE=")  # set your own ms_token

async def get_hashtag_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        tage = 0
        result = 30
        while tage < result:
            tag = api.hashtag(name=args.hashtag)
            async for video in tag.videos(count=35,cursor=tage):
                video_description = video.as_dict['desc']
                # 住所取得 poiが存在する場合
                if 'poi' in video.as_dict:
                    address = video.as_dict['poi']['address']
                    #住所と概要を結合
                    video_description= address+'　'+video_description
                print(video_description) #概要　住所
                print(video.as_dict['id']) #ID
                print(video.as_dict['author']['uniqueId']) #ユーザー名
                print(video.as_dict['video']['zoomCover']['960']) #サムネ
                tage += 1

if __name__ == "__main__":
    asyncio.run(get_hashtag_videos())
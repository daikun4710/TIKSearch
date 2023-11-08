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

ms_token = os.environ.get("ms_token", "E7hDXPgowjq7BqwVr0wDUiiT5-FvJBa2PBbqVSglGVMtc0FJOn-Ycxh1fe_mIAx-zu9knGwbABXjmFCqWFV405-By_qdd_NUUin3sAAwjNyqann4wSQw3kUDIwv8jCVqmkBDoRFf6O2KvtI=")  # set your own ms_token

async def get_hashtag_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        tag = api.hashtag(name="福岡グルメ")
        async for video in tag.videos(count=35, cursor=0):
            # print("ビデオID:" + video.as_dict['id'])
            print("ビデオ詳細" + video.as_dict['desc'])
            # 住所取得 poiが存在し　郵便番号がある場合
            # if 'poi' in video.as_dict:
                # address = video.as_dict['poi']['address']
            #     print(address.encode('utf-8').decode('utf-8') + "\n")
            #     print(video)
                # if '〒' in address:
                # postal_code_index = address.index('〒')
                # "〒"から始まる部分を含む全体の住所を取得
                # full_address = address[postal_code_index:]
                # print("住所情報" + full_address.encode('utf-8').decode('utf-8') + "\n")
                # print(full_address.encode('utf-8').decode('utf-8') + "\n")
            # いいね数 diggCount
            # digg = video['stats']['diggCount']
            # print(digg + address)
            # print("ビデオ詳細" + video + "\n")
            # break

if __name__ == "__main__":
    asyncio.run(get_hashtag_videos())
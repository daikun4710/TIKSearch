from TikTokApi import TikTokApi
import asyncio
import os

ms_token = os.environ.get("ms_token","7-Xer3neNEVCuOhzJ4T6ah5XPvHJ7evMgLWT4fzw7otBMKZcK2L06kXtRBgZZKnGhtHDfAPdRvlcIi1xZUvAlyTDHDr1UlQKqfTh2Vxl0v-LmYe04lCCD2LO6NTVsWh3KnKGtuV6jppZTgUQ")  # set your own ms_token


async def get_hashtag_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        tag = api.hashtag(name="福岡")
        async for video in tag.videos(count=30,cursor=30):
            print(video)
            # 住所取得 poiが存在し　郵便番号がある場合
            if 'poi' in video.as_dict:
                address = video.as_dict['poi']['address']
                if '〒' in address:
                    postal_code_index = address.index('〒')
                    # "〒"から始まる部分を含む全体の住所を取得
                    full_address = address[postal_code_index:]
                    print(full_address)
            # いいね数 diggCount
            digg = video.as_dict['stats']['diggCount']
            print(digg)
            # print(video.as_dict)
            # break


if __name__ == "__main__":
    asyncio.run(get_hashtag_videos())
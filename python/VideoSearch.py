from TikTokApi import TikTokApi
import asyncio
import os

ms_token = os.environ.get(
    "ms_token","E7hDXPgowjq7BqwVr0wDUiiT5-FvJBa2PBbqVSglGVMtc0FJOn-Ycxh1fe_mIAx-zu9knGwbABXjmFCqWFV405-By_qdd_NUUin3sAAwjNyqann4wSQw3kUDIwv8jCVqmkBDoRFf6O2KvtI="
)  # set your own ms_token, think it might need to have visited a profile


async def user_example():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        video = api.video(
            url="https://www.tiktok.com/@_high_genkides/video/7293473846148091138"
        )
        # print(video.as_dict)
        # async for related_video in video.related_videos(count=10):
        #     print(related_video)
        #     print(related_video.as_dict)

        video_info = await video.info()  # is HTML request, so avoid using this too much
        print(video_info)


if __name__ == "__main__":
    asyncio.run(user_example())
from TikTokApi import TikTokApi
import asyncio
import os

ms_token = os.environ.get("ms_token", "nxa3rzq8uaVKFFhZxz0pvU_G4YROIkkO1gAK7X2evXIT0vh6AjvOEZFbDlzquyEmSL6HAEkyppKmKCC-BF6P7aaY61_E2OPH89w0ikVhxbqdeD6XSM7XxJ3encoFOYY1_NjSog==")  # set your own ms_token



async def get_hashtag_videos():
    ct = 0
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        tag = api.hashtag(name="funny")
        x = 0
        async for video in tag.videos(count=24,cursor=x):
            print(video)
            ct += 1
            print(ct)

if __name__ == "__main__":
    asyncio.run(get_hashtag_videos())
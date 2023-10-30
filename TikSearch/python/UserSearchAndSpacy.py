from TikTokApi import TikTokApi
import asyncio
import os
import spacy
import re

nlp = spacy.load("ja_core_news_sm")

ms_token = os.environ.get(
    "ms_token", "3ARsPWncJH4MCquTIhx2XOgajWF0PTWqMpNOJsapW8dNpYztWNG2SDeHxrs2CMFlg_xWvEyzNYlDDIF9VS5ngBtu2_Y4F7Angzxl4tDPVkSl-k4LvVZXJSqZYbGs5eaIGefMLA=="
)

def extract_unique_store_names(text):
    doc = nlp(text)
    store_names = set()
    for ent in doc.ents:
        if ent.label_ == "ORG":  # 組織（固有名詞）の場合のみ抽出
            store_names.add(ent.text)
    return list(store_names)

async def user_example():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        user = api.user("_high_genkides")
        user_data = await user.info()

        async for video in user.videos(count=5):
            video_description = video.as_dict['desc']
            print("動画の概要欄:", video_description)
            
            unique_store_names1 = extract_unique_store_names(video_description)
            print("一意の店名:", unique_store_names1)
        
            doc = nlp(video_description)
            for ent in doc.ents:
                print(f"テキスト: {ent.text}, カテゴリ: {ent.label_}")

            pattern = r"([^\d\s]+)"
            matches = re.findall(pattern, video_description)
            print("matches配列の型", type(matches))

            for match in matches:
                print("店名:", match)

if __name__ == "__main__":
    asyncio.run(user_example())

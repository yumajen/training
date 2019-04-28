import pandas as pd
from bs4 import BeautifulSoup
import requests

# 過去のニコニコニュースからキーワードに合致する記事タイトルを抽出してくる
keys = ["令和", "新元号", "元年"]
limit_pages = 10
# データフレームを作成。列名 name=記事名, url=url
columns = ["name", "url"]
df = pd.DataFrame(columns=columns)

for i in range(1, limit_pages + 1):
    base = "https://news.nicovideo.jp/search?news_ref=top_newCommentsMore&page=%i&q="
    url = base % i
    print(url)

    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    tags = soup.find_all("a", {"class": "news-article-link"})

    for tag in tags:
        name = tag.text
        # name = tag.string # .stringだとNoneになる
        url = tag.get("href")

        for key in keys:
            if key in name:
                se = pd.Series([name, url], columns)
                df = df.append(se, columns)
                break

print('------------')
print(df)

CSVに出力
filename = "niconews.csv"
df.to_csv(filename, encoding = 'utf-8')
files.download(filename)

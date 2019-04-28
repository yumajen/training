import pandas as pd
from bs4 import BeautifulSoup
import requests
import datetime

# ワード検索を使いyahooニュースからカテゴリ別の記事タイトルとURLを取得
# 取得期間を指定
# 今後、複数のニュースサイトを選べるような画面を作りたい

columns = ['date', 'name', 'url']
df = pd.DataFrame(columns=columns)

base_url = 'https://news.yahoo.co.jp'
r = requests.get(base_url, verify=False) # verify=FalseでSSLサーバ証明書の警告を無視（安全な接続先と分かっている場合だけの方がいい）
soup = BeautifulSoup(r.content, 'html.parser')

# カテゴリタイトルとURLの取得
tags = soup.select('a[data-ylk^="rsec:snavi;slk"]')
categories = {} # カテゴリデータを格納する辞書
for tag in tags:
    name = tag.string
    url = tag.get('href')
    # 何故か経済カテゴリだけは「もっと見る」ページのカテゴリ表記が異なる（business -> economy）
    if 'business' in url:
        url = url.replace('business', 'economy')
    # 取得したurlを各カテゴリの「もっと見る」ページのurlに変換する
    categories[name] = url.replace('/categories/', '/list/?c=') + '&p=' if ('/categories/' in url) else url + 'list/?p='
# print(categories)

# 記事を取得したいカテゴリ名と検索ワードを指定
search_category = '経済'
search_words = ['ゴーン'] # AND検索
print('検索ワード%i語' % len(search_words))

# 記事検索処理
target_url = base_url + categories[search_category]

# 期間の指定
oldest_date = '2019/4/10' # 今日から遡ってoldest_dateまでを記事取得の対象期間とする（YYYY/MM/DD）
oldest_date = datetime.datetime.strptime(oldest_date, '%Y/%m/%d')
limit = 200 # 検索範囲の最大ページ（念の為の検索ループ強制終了用）

for i in range(1, limit + 1):
    page_url = target_url + str(i)
    print(page_url)

    r = requests.get(page_url)
    soup = BeautifulSoup(r.content, 'html.parser')
    tags = soup.find_all('li', {'class': 'ListBoxwrap'})

    for tag in tags:
        name = tag.find('dt').string
        url = tag.find('a').get('href') if tag.find('a') else ''
        article_date = tag.find('dd').find('time').text
        article_date = article_date[0:article_date.find('(')]
        # MM/DDの5文字以下なら年がついていないので追加
        if len(article_date) <= 5:
            article_date = str(datetime.date.today().year) + '/' + article_date
            article_date = datetime.datetime.strptime(article_date, '%Y/%m/%d')

        # 記事の日付が指定したoldest_dateより過去になったら検索終了
        if article_date < oldest_date:
            break

        for j, word in enumerate(search_words):
            if not word in name:
                continue
            if j == len(search_words) - 1:
                se = pd.Series([article_date, name, url], columns)
                df = df.append(se, columns)
    else:
        continue
    break

print('%i件の記事タイトルとURLを取得しました' % len(df))
print(df)

# CSVに出力
filename = 'yahoo_news.csv'
df.to_csv(filename, encoding = 'utf-8')
files.download(filename)

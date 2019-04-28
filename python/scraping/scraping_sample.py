# coding: UTF-8
import pandas as pd
from bs4 import BeautifulSoup
import requests
#from google.colab import files

#ちなみにBeautifulSoupとは
#htmlファイルをタグ情報から解析し、抽出データを格納したインスタンスを返す。
#htmlの構造とpythonの基礎が分かっていれば、非常に使いやすい。

#ちなみにrequestsとは
#urlを開くためのライブラリです。以上！

#ちなみにpandasとは
#Pythonでデータ分析を効率的に行うためのライブラリ
#本コードではデータフレーム作成を目的に使用してます。
#name=記事名,URL=urlのような連想配列チックなものをつくるのにしようしてます。
#ライブラリがcythonおよびCで記述されているので高速です。


# アクセスするURL = ニュートピ
url = "https://newstopics.jp/"

# htmlを取得、BeautifulSoupで扱う
r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')
# BeautifulSoupの初期化 指定サイトのURLをhtmlパースを指定している。
# HTMLパースとは、HTML文法規則にのっとった文字列を、その文法に基づいて字句解析し、意味や構造を解釈することをいい、HTMLパースを行うプログラムのことをHTMLパーサといいます

# aタグの中から、class=titleの含まれたものを取得
# find_allメソッドは検索対象と完全一致するものをすべて返すもの正規表現も使えます。
# 今回の記述ではaタグのclass:titleをすべて返しています。

tags = soup.find_all("a", {"class": "title"})
# データフレームを作成。列名 name=記事名, url=url
columns = ["name", "url"]
df = pd.DataFrame(columns=columns)

# 抽出したa要素を行列に入れ込む
#
for tag in tags:
    print(tag)
    name = tag.string #　記事名の取得
    url = tag.get("href") #リンクの取得
    se = pd.Series([name, url], columns) # 行を追加
    #print(se)
    df = df.append(se, columns)
# print(df)

# CSVに出力
# filename = "topics.csv" # ファイル名の指定
# df.to_csv(filename, encoding = 'utf-8') #csvへの変換、encoding指定(おまじない)
# files.download(filename) # ダウンロード

import os
import sys
import requests
import pandas as pd
import search_query

client_id = "mIi3pzvEmKNwGSH54RZS"
client_secret = "Gk_CbiaUFu"
df = pd.DataFrame(columns=['code', 'title', 'link', 'image', 'pubDate', 'director', 'actors', 'rating'])
movie_data = search_query.data
index = 0

for j in range(10):
    movie_index = movie_data['index'][j]
    movie = movie_data['movie'][j]
    movie = movie.split('(')[0].strip()

    header_params = {"X-Naver-Client-Id":client_id, "X-Naver-Client-Secret":client_secret}
    url = f"https://openapi.naver.com/v1/search/movie.json?query={movie}"
    res = requests.get(url, headers=header_params)
    data = res.json()

    for i in range(len(data['items'])):
        index += 1

        title = data['items'][i]['title'].strip("</b>")
        link = data['items'][i]['link']
        code = link.split('=')[1]
        image = data['items'][i]['image']
        date = data['items'][i]['pubDate']
        director = data['items'][i]['director'].split('|')[0]
        actors = data['items'][i]['actor'].split('|')[:-1]
        rating = float(data['items'][i]['userRating'])

        df.loc[index] = [code, title, link, image, date, director, actors, rating]

        # # curl 요청
        # os.system("curl " + image + " > img/poster" +
        #           str(movie_index) + str(i) + ".jpg")

df.to_csv('data/naver_movie.csv', encoding='euc-kr')

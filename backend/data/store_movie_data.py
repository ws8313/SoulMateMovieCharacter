# -*- coding: utf-8 -*-
import csv
import os
import sys
from app import db
from models import *
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
import json


def store_movie():
    f = open('data/real/naver_movie_story.csv', 'r', encoding="utf-8")
    rdr = csv.reader(f)

    cnt = 0
    for line in rdr:
        if cnt > 16:
            break

        line[13] = line[13].strip()
        if line[13][-2] != "분":
            print("분 아님")
            continue
        else: 
            line[13] = line[:-2]
        print(cnt)
        print(line[13][-2])
        print(line[4], line[5], line[8], line[9], line[10], line[12], line[7], line[13])
        movie = Movie(line[4], line[5], line[8], line[9], line[10], line[12], line[7], line[13])
        cnt += 1
        db.session.add(movie)
    # db.session.commit()

def store_movie_json():
    with open('./data/real/naver_movie_story.json', 'r', encoding="utf-8") as f:
        movies = json.load(f)
        # print(json.dumps(movies, ensure_ascii=False, indent=4))
        
        cnt = 1
        for movie in movies['data']:
            rtime = movie['rtime'].strip()
            try:
                rtime = int(rtime[:-1])
                # print(rtime)
            except:
                # print("continue")
                continue
            # print(json.dumps(movie, ensure_ascii=False, indent=4))
            kor_title = movie['title']
            eng_title = movie['subtitle']
            image_link = movie['image']
            pub_year = movie['pubDate']
            director = movie['director']
            rating = movie['rating']
            story = movie['story']

            if kor_title and eng_title and image_link and pub_year and director and rating and story:
                db.session.add(Movie(movie['title'], movie['subtitle'], movie['image'], movie['pubDate'], movie['director'], movie['rating'], movie['story'], rtime))

            genres = movie['genre'].split()
            # print(genres)
            for genre in genres:
                db.session.add(MovieGenre(genre, cnt))

            actors = movie['actors'][1:-1].split(', ')
            for actor in actors:
                db.session.add(ActorInMovie(actor[1:-1], cnt))

            cnt += 1
    db.session.commit()

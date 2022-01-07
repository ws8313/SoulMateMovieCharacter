# -*- coding: utf-8 -*-
import csv
import os
import sys
from app import db
from models import *
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


def store_movie():
    f = open('data/real/naver_movie_story.csv', 'r', encoding="utf-8")
    rdr = csv.reader(f)

    cnt = 0
    for line in rdr:
        if cnt > 1:
            break

        line[13] = line[13].strip()
        if line[13][-1] != "분":
            continue
        else: 
            line[13] = line[:-1]
        print(line[4], line[5], line[8], line[9], line[10], line[12], line[7], line[13])
        movie = Movie(line[4], line[5], line[8], line[9], line[10], line[12], line[7], line[13])
        cnt += 1
        # db.session.add(movie)
    # db.session.commit()
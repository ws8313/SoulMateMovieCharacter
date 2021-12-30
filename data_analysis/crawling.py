import re
import os
from random import randrange

import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import openpyxl
from urllib.request import urlretrieve

data = pd.read_csv('data/naver_movie.csv', encoding='euc-kr')
story_store = []
rtime_store = []

# 특수문자 제거 위한 함수
def cleanText(readData):
    # 텍스트에 포함되어 있는 특수 문자 제거
    text = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》 ]', '', readData)
    return text


def crawling():
    try:
        # (0) HTML 파싱
        # 저장 된 영화와 포스터의 행을 맞추기 위한 정수 j
        j = 0
        # 청소년 관람 불가, 평점 없는 영화 제외
        # 네이버영화의 영화 코드 범위 지정
        print(len(data['code']))
        for i in range(len(data['code'])):
            movie_code = str(data['code'][i])
            print(movie_code)
            raw = requests.get("https://movie.naver.com/movie/bi/mi/basic.nhn?code=" + movie_code)
            html = bs(raw.text, 'html.parser')

            # (1) 전체 컨테이너
            movie = html.select("div.article")

            # (2) 전체 컨테이너가 갖고 있는 영화관련 정보
            for a, m in enumerate(movie):

                # (3-6) 영화줄거리 수집
                story = m.select("div.story_area p.con_tx")

                # (3-8) 영화 상영시간 수집
                rtime = m.select_one("dl.info_spec dd p span:nth-of-type(3)")

                story_list = [s.text for s in story]
                if len(story_list) == 0:
                    story_str = 'None'
                else:
                    story_str = ' '.join(story_list)
                
                story_store.append(story_str)
                    
                if rtime == None:
                    rtime_store.append('None')
                else:
                    rtime_store.append(rtime.text)
                

            print(len(data['code']), " 중 ", i, "번째")

    except Exception as ex:
        print("에러발생", ex)
    finally:
        print("완료")
    
    data['story'] = story_store
    data['runTime'] = rtime_store
    data.to_csv('data/naver_movie_story.csv')
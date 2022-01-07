from konlpy.tag import *
from numpy import vectorize
import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfTransformer, TfidfVectorizer, CountVectorizer
import nltk
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import wordcloud

mbti_key = ['ENFP', 'INFP', 'ESFP', 'ISFP',
            'ENTP', 'INTP', 'ENFJ', 'INFJ',
            'ESTP', 'ISTP', 'ESTJ', 'ISTJ',
            'ESFJ', 'ISFJ', 'ENTJ', 'INTJ']

# POS tag a sentence
data = pd.read_csv('data/naver_movie_story.csv')
df = pd.DataFrame(columns=[])

"""한글, 숫자, 영어 빼고 전부 제거"""
def sub_special(s):
  return re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣0-9a-zA-Z ]','',s)

STOP_WORDS = ['의','가','이','은','로','에게','것','들','는','좀','잘','걍','과','도','을','를','으로','자','에','와','한','하다', '되다', '후', '줄', '에서', '에서는', '에도', '다']

def morph_and_stopword(s):
  token_ls = []
  #형태소 분석
  s = sub_special(s)
  tmp = Okt().morphs(s, stem=True)

  #불용어 처리
  for token in tmp:
    if token not in STOP_WORDS:
      token_ls.append(token)
  
  return token_ls

# words = Okt().pos(sentence)
# words_filtering = [x for x, y in words if y in ['Noun', 'Adjective', 'Verb']]

for i in range(16):
  mbti_movie = data['mbti'].str.contains(mbti_key[i])
  set_mbti = data[mbti_movie]
  top10 = set_mbti.nlargest(10, 'rating', keep='all')
  
  total_story = []
  for s in top10['story'].head():
    total_story.append(' '.join(morph_and_stopword(s)))
  
  vectorizer = CountVectorizer(min_df=1)
  bow = vectorizer.fit_transform(total_story)
  
  transformer = TfidfTransformer()
  tfidf = transformer.fit_transform(bow.toarray())
  
  # wordcloud
  wordcloud = WordCloud(font_path=r'C:\Windows\Fonts\H2HDRM.TTF', background_color='white')
  word_tfidf = dict(zip(vectorizer.get_feature_names(),tfidf.toarray()[4]))
  image = wordcloud.generate_from_frequencies(word_tfidf).to_image()
  image.save("img/wordcloud_" + mbti_key[i] + ".jpg")


  # img = Image.open('12.jpg')
  # img_array = np.array(img)

  # from wordcloud import WordCloud
  # wc = WordCloud(font_path='./fonts/truetype/nanum/NanumBarunGothic.ttf', background_color = 'white', mask=img_array).generate(query)
  # plt.imshow(wc, interpolation=’bilinear’)
  # plt.axis(“off”)
  # plt.show()
  

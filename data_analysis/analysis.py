from konlpy.tag import *
import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk

# POS tag a sentence
data = pd.read_csv('data/naver_movie_story.csv')

"""한글, 숫자, 영어 빼고 전부 제거"""
def sub_special(s):
  return re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣0-9a-zA-Z ]','',s)

STOP_WORDS = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']

def morph_and_stopword(s):
  token_ls = []
  #형태소 분석
  tmp = Okt().morphs(s, stem=True)

  #불용어 처리
  for token in tmp:
    if token not in STOP_WORDS:
      token_ls.append(token)

# words = Okt().pos(sentence)
# words_filtering = [x for x, y in words if y in ['Noun', 'Adjective', 'Verb']]

sentence = data['story'][0]
sentence = sub_special(sentence)
words = morph_and_stopword(sentence)

tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(words)

print(tfidf_matrix.shape)


# # Define a chunk grammar, or chunking rules, then chunk
# grammar = """
# NP: {<N.*>*<Suffix>?}   # Noun phrase
# VP: {<V.*>*}            # Verb phrase
# AP: {<A.*>*}            # Adjective phrase
# """
# parser = nltk.RegexpParser(grammar)
# chunks = parser.parse(words)
# print("# Print whole tree")
# print(chunks.pprint())

# print("\n# Print noun phrases only")
# for subtree in chunks.subtrees():
#     if subtree.label()=='NP':
#         print(' '.join((e[0] for e in list(subtree))))
#         print(subtree.pprint())

# # Display the chunk tree
# chunks.draw()
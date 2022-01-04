from konlpy.tag import *
import nltk

# POS tag a sentence
sentence = u'만 6세 이하의 초등학교 취학 전 자녀를 양육하기 위해서는 맛있는 간식'
words = Okt().pos(sentence)

words_filtering = [x for x, y in words if y in ['Noun', 'Adjective', 'Verb']]

print(words)
print(words_filtering)

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
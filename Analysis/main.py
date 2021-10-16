"""

Made by TheBreeze129 (H.W. Lee)

main.

"""


#import
from pymysql import NULL
from analysis import *
import DBinfo
import connectDB


#exmaple_variables
unit = 1234
branch_unit1 = '1'
branch_unit2 = '2'

content_data = [{'id' : 11111, 'title' : '삶이란 어떤 것일까.', 'content' : '나는 오늘 하루를 살아간다. 근데 왜 살아가는 것일가. 자살하는 것과 크게 다른 차이가 있는것일까?'},
                {'id' : 11122, 'title' : '죽을까 그냥', 'content' : '군생활이 끝이 안보인다. 걍 자살하는게 맞는걸까'}]



#main

#variables
boardlist = ['free_post']
keywordnumlist = []
keyworddetectiondict = {}
numkeyworddict = {}
rankdict = {}
keytags = ['NNG','NNP','NP','VV']
pos_num = 0
neg_num = 0
neu_num = 0
COUNT = 0

#DB open
conn, cursor = connectDB.connect_RDB(DBinfo.info_in())

#load keywords have to founded
keywordfindlist = keyword_selection(cursor, unit, branch_unit1, branch_unit2)

#load users id in unit.
cursor.execute(SQL.load_users_id_sqlline, unit)
user_ids = []
for user_id in cursor.fetchall():
    user_ids.append(user_id['id'])

for user_id in user_ids:
    for board in boardlist:
        content_data = post_selection(board,cursor,user_id)
        comment_data = comment_selection(board,cursor,user_id)
        if content_data is False and comment_data is False:
            print("Content and comment Not loaded")
            print("user_id :" + user_id)
            print("board : "+board)
            continue
        elif content_data is False:
            print("Content Not loaded")
            print("user_id :" + user_id)
            print("board : "+board)
            content_data = comment_data
        elif comment_data is False:
            print("Comment Not loaded")
            print("user_id :" + user_id)
            print("board : "+board)
        elif content_data==() and comment_data==():
            print("There is no data in id : "+user_id+", board : "+board)
            continue
        elif content_data==():
            content_data = comment_data
        elif comment_data==():
            print(" ")
        else:
            content_data.append(comment_data)     
        localrankdict = rank_keywords(keytags, content_data)
        lpos_num, lneg_num, lneu_num = analysis_posnegneu(content_data)
        pos_num = pos_num + lpos_num
        neg_num = neg_num + lneg_num
        neu_num = neu_num + lneu_num
        keywordnumlist.append(localrankdict.values())
        detectdict = detect_keyword(content_data, keywordfindlist)
        if detectdict is False:
            continue       
        for morpheme in detectdict:
            try:
                keyworddetectiondict[morpheme][1] = keyworddetectiondict[morpheme][1] + detectdict[morpheme][1]
                keyworddetectiondict[morpheme][2].append(detectdict[morpheme][2][0])
            except KeyError:
                keyworddetectiondict[morpheme] = detectdict[morpheme]
        

for kwsets in keywordnumlist:
    for kwset in kwsets:
        try:
            numkeyworddict[kwset[1]].append(kwset[0])
        except KeyError:
            numkeyworddict[kwset[1]] = [kwset[0]]

for key in sorted(numkeyworddict.keys(),reverse=True):
    for values in numkeyworddict[key]:
        COUNT = COUNT + 1
        if COUNT <= 10:
            rankdict[COUNT] = [values, key]
        else:
            break

while COUNT <= 10:
    COUNT = COUNT + 1
    rankdict[COUNT] = [NULL, NULL]


all_num = pos_num + neg_num + neu_num
pos_percent = pos_num / all_num
neg_percent = neg_num / all_num
neu_percent = neu_num / all_num


#insertion
analysis_posnegneu_insertion(conn, cursor, unit, branch_unit1, branch_unit2, pos_percent, neg_percent, neu_percent)
analysis_keywordrank_insertion(conn,cursor, unit, branch_unit1,branch_unit2,rankdict)
analysis_detect_insertion(conn, cursor, unit, branch_unit1, branch_unit2, keyworddetectiondict, board)
"""

Made by TheBreeze129 (H.W. Lee)

select, insert, update, delete, create and so on to management db data.

"""

#import
import connectDB
import DBinfo
import pymysql

#connect
conn, cursor = connectDB.connect_RDB(DBinfo.info_in())

sqllinecta1 = """CREATE TABLE analysis_attention_keywords (
            analysis_attention_keywords_id bigint NOT NULL,
            unit_code int NOT NULL,
            branch_unit1 varchar(255) NOT NULL,
            branch_unit2 varchar(255),
            keyword_1 varchar(100),
            keyword_2 varchar(100),
            keyword_3 varchar(100),
            keyword_4 varchar(100),
            keyword_5 varchar(100),
            keyword_6 varchar(100),
            keyword_7 varchar(100),
            keyword_8 varchar(100),
            keyword_9 varchar(100),
            keyword_10 varchar(100),
            num_1 smallint unsigned default 0,
            num_2 smallint unsigned default 0,
            num_3 smallint unsigned default 0,
            num_4 smallint unsigned default 0,
            num_5 smallint unsigned default 0,
            num_6 smallint unsigned default 0,
            num_7 smallint unsigned default 0,
            num_8 smallint unsigned default 0,
            num_9 smallint unsigned default 0,
            num_10 smallint unsigned default 0,
            PRIMARY KEY(analysis_attention_keywords_id)
            ) ENGINE = InnoDB CHARSET=utf8;"""


sqllineap = """CREATE TABLE analysis_posnegneu (
            analysis_posnegneu_id bigint NOT NULL,
            unit_code int NOT NULL,
            branch_unit1 varchar(255) NOT NULL,
            branch_unit2 varchar(255),
            postive_percent float NOT NULL,
            negative_percent float NOT NULL,
            neutral_percent float NOT NULL,
            PRIMARY KEY(analysis_posnegneu_id)
            ) ENGINE = InnoDB CHARSET=utf8;"""

sqllineka = """CREATE TABLE analysis_keyword_all (
            analysis_keyword_all_id bigint NOT NULL,
            unit_code int NOT NULL,
            branch_unit1 varchar(255) NOT NULL,
            branch_unit2 varchar(255),
            keyword_1 varchar(255) NOT NULL,
            keyword_2 varchar(255) NOT NULL,
            keyword_3 varchar(255) NOT NULL,
            keyword_4 varchar(255) NOT NULL,
            keyword_5 varchar(255) NOT NULL,
            keyword_6 varchar(255) NOT NULL,
            keyword_7 varchar(255) NOT NULL,
            keyword_8 varchar(255) NOT NULL,
            keyword_9 varchar(255) NOT NULL,
            keyword_10 varchar(255) NOT NULL,
            num_1 smallint unsigned default 0,
            num_2 smallint unsigned default 0,
            num_3 smallint unsigned default 0,
            num_4 smallint unsigned default 0,
            num_5 smallint unsigned default 0,
            num_6 smallint unsigned default 0,
            num_7 smallint unsigned default 0,
            num_8 smallint unsigned default 0,
            num_9 smallint unsigned default 0,
            num_10 smallint unsigned default 0,
            link_id_1 mediumtext,
            link_id_2 mediumtext,
            link_id_3 mediumtext,
            link_id_4 mediumtext,
            link_id_5 mediumtext,
            link_id_6 mediumtext,
            link_id_7 mediumtext,
            link_id_8 mediumtext,
            link_id_9 mediumtext,
            link_id_10 mediumtext,
            PRIMARY KEY(analysis_keyword_all_id)
            ) ENGINE = InnoDB CHARSET=utf8;"""



#print DESC line to show well (pandas doesn't working in codespaces....)
def DESC_print_well(data):
    strFormat = '| %-20s| %-15s| %-7s| %-7s| %-10s| %-7s|'
    print('|'+'-'*77+'|')
    print(strFormat %('Field','Type','NULL','Key','Default','Extra'))
    print('|'+'-'*77+'|')
    for i in data:
        for key in i.keys():
            if i[key] == None:
                i[key] = ""
        print(strFormat %(i['Field'],i["Type"],i["Null"],i["Key"],i['Default'],i["Extra"]))
    print('|'+'-'*77+'|')


#print SELECT line to show well (pandas doesn't working in codespaces....)
def SELECT_print_well(data):
    key = data[0].keys()
    strformat = ''
    for i in key:
        if len(str(data[0][i])) < 15 and len(str(i)) < 15 :
            strformat = strformat + '| %-15s'
        else:
            strformat = strformat + '| %-30s'
    strformat = strformat + "|"
    print(strformat % tuple(key))
    for dic in data:
        for a in dic.keys():
            if dic[a] == pymysql.NULL:
                dic[a] = 'NULL'
        print(strformat % tuple(dic.values()))


sqlline = ('desc analysis_attention_keywords')

sqlinsert_user_info = '''insert into user_info (id, birth, branch_unit1, branch_unit2, cellphone, discharge_date, enlist_date, mil_num, unit_code, user_pw, user_rank, user_name)
                values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s)'''

sqlinsert_anal_keyset = '''insert into analysis_attention_keywords (analysis_attention_keywords_id, unit_code, branch_unit1, branch_unit2, keyword_1, keyword_2, keyword_3, keyword_4, keyword_5, keyword_6, keyword_7, keyword_8, keyword_9, keyword_10)
                values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''

sqlinsert_unit_info = '''insert into unit_info (id, unit_belong, unit_code, unit_name) values (%s, %s, %s, %s)'''
a= '5군단'




# file = open('Analysis/user_info_dummy.csv', 'r',encoding='CP949')

# data = file.readlines()[1]
# for i in [data]:
#     i = i.strip('\n').split(',')
#     name = i[0]
#     user_id = i[1]
#     bith = i[2]
#     unit_code = 3
#     branch_unit1 = '1'
#     branch_unit2 = '2'
#     phonenum = i[6]
#     a = i[7].split('.')
#     enlist_date = '20'+a[0]+'-'+a[1]+'-'+a[2]
#     b = i[8].split('.')
#     discharge_date = '20'+b[0]+'-'+b[1]+'-'+b[2]
#     milnum = i[9]
#     pw = i[10]
#     rank = 'commander'
#     cursor.execute(sqlinsert_user_info, (user_id, bith, branch_unit1, branch_unit2, phonenum, discharge_date, enlist_date, milnum, unit_code, pw, rank, name))
#     conn.commit()




# file.close()




cursor.execute("""select * from user_info""")
SELECT_print_well(cursor.fetchall())
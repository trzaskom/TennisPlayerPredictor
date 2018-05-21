import csv
import mysql.connector
import datetime

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()

add_player = "INSERT INTO players (id, player_key, name, slug) VALUES ('', %s, %s, %s)"

array = []
filename = "match_scores_2017-2017.csv"
with open(filename, 'rb') as input_file:
    foo = csv.reader(input_file)
    for row in foo:
        array.append([str(row).split(',')[7], str(row).split(',')[8], str(row).split(',')[9]])

seen = set()
result = []
for item in array:
    if item[0] not in seen:
        seen.add(item[0])
        result.append(item)

# append data to table players
#for elem in result:
#   cursor.execute(add_player, (elem[1], elem[0], elem[2]))

# creating logs and append into logs/main_logs.log
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'
# fo = open('load_data_' + time + '.txt', "w")

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for elem in result:
        log_sql_file.write('INSERT INTO players (id, player_key, name, slug) VALUES ("",' + elem[1] + ',' + elem[0] + ',' + elem[2] + ")" + "\n")

with open('logs/main_logs.log', "a") as log_file:
    log_file.write(time + ' - loading data about players into database with SQL file: ' + log_sql_file_name + '\n')

cnx.commit()
cursor.close()
cnx.close()

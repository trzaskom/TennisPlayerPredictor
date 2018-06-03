import datetime
import mysql.connector

top_ids = ['n409', 'f324', 'z355', 'c977', 'd875', 'd683', 'a678', 'tb69', 'gb88', 'i186', 'cd85', 'sm37', 'bd06', 'sm25',
       'q927', 'pf39', 'e831', 'f510', 'ch27', 'ba47', 'n552', 'd643', 'ke17', 'k435', 'su55', 'me82', 'kb05', 'r975',
       'd923', 'w367', 're44', 'g628', 'l397', 'ma30', 'v306', 'r772', 'mc65', 'ke29', 'te51', 'cg80', 'f401', 'md56',
       'g967', 'h756', 'f724', 'j386', 'mc10', 'se73', 'sh90', 'sa93', 'pd31', 't786', 'mm58', 'sl08', 'd801', 'h940',
       'dc58', 'td51', 'mh30', 'l987', 'j551', 'b747', 'j267', 'z168', 'sd32', 'bh09', 'g476', 'fb98', 'd874', 'mn13',
       'sl28', 'cf01', 'e690', 'l503', 'c882', 'cf59', 'bg23', 'pc11', 'd864', 'v708', 'be67', 'da81', 'k926', 'b837',
       'n771', 'ca12', 'h996', 'pd07', 't840', 'mb02', 'tc61',
       'k336', 'bf55', 'ca99', 'kc29', 'bk40', 'a829', 'y061', 'l797', 'i165']

matches = []

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()
add_match = 'INSERT INTO matches (id, tournament_key, winner_id, loser_id) VALUES ('', %s, %s, %s)'

with open("data/match_scores_2009-2018.csv", "r") as scores_file:
    for line in scores_file:
        if line.split(",")[8] in top_ids or line.split(",")[11] in top_ids:
            matches.append([line.split(",")[0], line.split(",")[8], line.split(",")[11]])

# creating logs and append into logs/main_logs.log
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for match in matches:
            cursor.execute(add_match, (match[0], match[1], match[2]))
            log_sql_file.write(
                'INSERT INTO matches (id, tournament_key, winner_id, loser_id) VALUES ("",' + '"' +
                match[0] + '"' + ', ' + '"' + match[1] + '"' + ', ' + '"' + match[2] + '");' + "\n")

with open('logs/main_logs.log', "a") as log_file:
    log_file.write(time + ' - loading data about tournaments into database with SQL file: ' + log_sql_file_name + '\n')

cnx.commit()
cursor.close()
cnx.close()

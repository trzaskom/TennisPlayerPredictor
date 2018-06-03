import datetime
import mysql.connector

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()

cursor.execute('SELECT player_key FROM players ORDER BY points DESC LIMIT 100')
top_ids = str(cursor.fetchall()).encode("ascii")
matches = []

with open("data/match_scores_2009-2018.csv", "r") as scores_file:
    for line in scores_file:
        if line.split(",")[8] in top_ids or line.split(",")[11] in top_ids:
            matches.append([line.split(",")[0], line.split(",")[8], line.split(",")[11]])

# inserting matches into database and creating logs
add_match = 'INSERT INTO matches (id, tournament_key, winner_id, loser_id) VALUES ('', %s, %s, %s)'
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

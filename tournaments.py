import datetime
import sys

import mysql.connector

from functions import tournaments

# Command line input
start_year = str(sys.argv[1])

# Iterate through the years and scrape tourney data

print ''
print 'Year    Tournaments'
print '----    -----------'

tourney_data = []
for h in xrange(int(start_year), int(start_year) + 1):
    year = str(h)
    tourney_data += tournaments(year)

# Output to CSV
filename = 'tournaments_' + start_year + '-' + start_year
#array2csv(tourney_data, filename)

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()

add_tournament = "INSERT INTO tournaments (id, tournament_year_id, tournament_id, tournament_name, year, location, placement, surface, winner_id) VALUES ('', %s, %s, %s, %s, %s, %s, %s, %s)"

# creating logs and append into logs/main_logs.log
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'

# append data to table players
for elem in tourney_data:
    if not elem[18]:
        break
    else:
        if str(elem[5]).find(',') > 0:
            location = str(elem[5]).split(', ')[0] + " - " + str(elem[5]).split(', ')[1]
        else:
            location = elem[5]
        cursor.execute(add_tournament,
                       (elem[27], str(elem[3]), elem[2], str(elem[0]), location, elem[11], elem[12], elem[18]))

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for elem in tourney_data:
        if not elem[18]:
            break
        else:
            if str(elem[5]).find(',') > 0:
                location = str(elem[5]).split(', ')[0] + " - " + str(elem[5]).split(', ')[1]
            else:
                location = elem[5]
            log_sql_file.write(
                'INSERT INTO tournaments (id, tournament_year_id, tournament_id, tournament_name, year, location, placement, surface, winner_id) VALUES ("",' + '"' +
                elem[27] + '"' + ', ' + '"' + str(elem[3]) + '"' + ', ' + '"' + elem[2] + '"' + ', ' + '"' + str(
                    elem[0])
                + '"' + ', ' + '"' + location + '"' + ', ' + '"' + elem[11] + '"' + ', ' + '"' + elem[12] + '"' + ', '
                + '"' + elem[18] + '");' + "\n")

    with open('logs/main_logs.log', "a") as log_file:
        log_file.write(
            time + ' - loading data about tournaments into database with SQL file: ' + log_sql_file_name + '\n')

cnx.commit()
cursor.close()
cnx.close()

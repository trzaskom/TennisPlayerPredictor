import sys, requests, datetime
import mysql.connector
from bs4 import BeautifulSoup

week = sys.argv[1]
page = requests.get("http://www.atpworldtour.com/en/rankings/singles?rankDate=" + week + "&rankRange=1-3000")
soup = BeautifulSoup(page.content, 'html.parser')

names = soup.find_all('td', class_="player-cell")
ages = soup.find_all('td', class_="age-cell")
points = soup.find_all('td', class_="points-cell")

players = [[0 for x in range(4)] for y in range(len(names))]

for i in range(0, len(names)):
    players[i][0] = names[i].a.get_text().strip()
    players[i][1] = ages[i].get_text().strip()
    players[i][2] = points[i].get_text().strip().replace(',', '')
    players[i][3] = str(names[i].a["href"]).split('/')[4]

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()
add_player = 'INSERT INTO players (player_key, name, age, points) VALUES (%s, %s, %s, %s)'

# append data to players table
for player in players:
    cursor.execute(add_player, (player[3], player[0], player[1], player[2]))

# creating logs and append into logs/main_logs.log
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for player in players:
        log_sql_file.write(
            'INSERT INTO players (player_key, name, age, points) VALUES (' + '"' + player[3] + '"' + ', ' + '"' +
            player[0] + '"' + ', ' + '"' + player[1] + '"' + ', ' + '"' + player[2] + '"' + ");" + "\n")

with open('logs/main_logs.log', "a") as log_file:
    log_file.write(time + ' - loading data about players into database with SQL file: ' + log_sql_file_name + '\n')

cnx.commit()
cursor.close()
cnx.close()

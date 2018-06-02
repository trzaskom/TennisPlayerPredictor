import sys
import datetime
import requests
import mysql.connector
from lxml import html

year = sys.argv[1]

page = requests.get("http://www.atpworldtour.com/en/scores/results-archive?year=" + year)
tree = html.fromstring(page.content)
num_of_tourneys = len(tree.xpath('//*[@id="scoresResultsArchive"]/table/tbody/tr'))
pre_xpath = '//*[@id="scoresResultsArchive"]/table/tbody/tr['
tournaments = []

for i in range(1, num_of_tourneys):
    year_id = year + "-" + \
              str([href.get('href') for href in tree.xpath(pre_xpath + str(i) + ']/td[4]/div/div/a[1]')]).split("/")[5]
    name = tree.xpath(pre_xpath + str(i) + ']/td[3]/span[1]/text()')[0].strip().encode('utf-8')
    location = tree.xpath(pre_xpath + str(i) + ']/td[3]/span[2]/text()')[0].strip().encode('utf-8')
    placement = tree.xpath(pre_xpath + str(i) + ']/td[5]/div/div/text()')[0].strip()
    surface = tree.xpath(pre_xpath + str(i) + ']/td[5]/div/div/span/text()')[0].strip()
    winner_id = str([href.get('href') for href in tree.xpath(pre_xpath + str(i) + ']/td[7]/div[1]/a')]).split("/")[4]
    tournament_id = \
    str([href.get('href') for href in tree.xpath(pre_xpath + str(i) + ']/td[4]/div/div/a[1]')]).split("/")[5]
    tournaments.append([year_id, tournament_id, name, year, location, placement, surface, winner_id])

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()

add_tournament = "INSERT INTO tournaments (id, tournament_year_id, tournament_id, tournament_name, year, location, placement, surface, winner_id) VALUES ('', %s, %s, %s, %s, %s, %s, %s, %s)"

# creating logs and append into logs/main_logs.log
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for tournament in tournaments:
        if not tournament[7]:  # checks whether tournament has beed played already
            break
        else:
            if str(tournament[4]).find(',') > 0:  # adjusts location name to inputting to db
                location = str(tournament[4]).split(', ')[0] + " - " + str(tournament[4]).split(', ')[1]
            else:
                location = tournament[4]
            cursor.execute(add_tournament, (
            tournament[0], tournament[1], tournament[2], tournament[3], tournament[4], tournament[5], tournament[6],
            tournament[7]))
            log_sql_file.write(
                'INSERT INTO tournaments (id, tournament_year_id, tournament_id, tournament_name, year, location, placement, surface, winner_id) VALUES ("",' + '"' +
                tournament[0] + '"' + ', ' + '"' + tournament[1] + '"' + ', ' + '"' + tournament[2] + '"' + ', ' + '"' +
                tournament[3]
                + '"' + ', ' + '"' + location + '"' + ', ' + '"' + tournament[5] + '"' + ', ' + '"' + tournament[
                    6] + '"' + ', '
                + '"' + tournament[7] + '");' + "\n")

with open('logs/main_logs.log', "a") as log_file:
    log_file.write(time + ' - loading data about tournaments into database with SQL file: ' + log_sql_file_name + '\n')

cnx.commit()
cursor.close()
cnx.close()

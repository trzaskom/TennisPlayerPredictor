import datetime
import mysql.connector

surfaces = ["Grass", "Clay", "Hard"]
placements = ["Outdoor", "Indoor"]
outcomes = ["winner", "loser"]
ids = []
result = []
stats = []
ratios = []

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='tennisapp')
cursor = cnx.cursor()

query = 'SELECT player_key FROM players ORDER BY points DESC LIMIT 100'
cursor.execute(query)
for row in cursor.fetchall():
    ids.append(str(row).split('\'')[1])

for player_id in ids:
    result.append(player_id)
    for surface in surfaces:
        for placement in placements:
            for outcome in outcomes:
                cursor.execute(
                    'SELECT COUNT(*) FROM matches as m join (SELECT tournament_year_id, surface, placement FROM tournaments)'
                    ' as t ON( m.tournament_key = t.tournament_year_id ) '
                    'WHERE  m.' + outcome + '_id ="' + player_id + '" AND t.surface = "' + surface + '" AND t.placement = "' + placement + '"')
                result.append(cursor.fetchone()[0])

for i in xrange(0, len(result), 13):
    stats.append((result[i], result[i + 1], result[i + 2], result[i + 3], result[i + 4], result[i + 5], result[i + 6],
                  result[i + 7], result[i + 8],
                  result[i + 9], result[i + 10], result[i + 11], result[i + 12]))

# ratios of matches won to matches played on different surfaces
for stat in stats:
    grass_out = 0 if (stat[1] + stat[2]) == 0 else round(stat[1]/float(stat[1] + stat[2]), 4)
    grass_in = 0 if (stat[3] + stat[4]) == 0 else round(stat[3]/float(stat[3] + stat[4]), 4)
    clay_out = 0 if (stat[5] + stat[6]) == 0 else round(stat[5]/float(stat[5] + stat[6]), 4)
    clay_in = 0 if (stat[7] + stat[8]) == 0 else round(stat[7]/float(stat[7] + stat[8]), 4)
    hard_out = 0 if (stat[9] + stat[10]) == 0 else round(stat[9]/float(stat[9] + stat[10]), 4)
    hard_in = 0 if (stat[11] + stat[12]) == 0 else round(stat[11]/float(stat[11] + stat[12]), 4)
    ratios.append((stat[0], grass_out, grass_in, clay_out, clay_in, hard_out, hard_in))

# inserting stats into database and creating logs
add_stat = 'INSERT INTO stats (player_id, grass_out_wins, grass_out_losses, grass_in_wins, grass_in_losses,' \
           ' clay_out_wins, clay_out_losses, clay_in_wins, clay_in_losses, hard_out_wins, hard_out_losses,' \
           ' hard_in_wins, hard_in_losses) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for stat in stats:
        cursor.execute(add_stat, (
            stat[0], stat[1], stat[2], stat[3], stat[4], stat[5], stat[6], stat[7], stat[8], stat[9], stat[10],
            stat[11],
            stat[12]))
        log_sql_file.write(
            '''INSERT INTO stats (player_id, grass_out_wins, grass_out_losses, grass_in_wins, grass_in_losses,
            clay_out_wins, clay_out_losses, clay_in_wins, clay_in_losses, hard_out_wins, hard_out_losses,
            hard_in_wins, hard_in_losses) VALUES ('%s');\n''' % "', '".join(map(str, stat)))

with open('logs/main_logs.log', "a") as log_file:
    log_file.write(time + ' - loading data about tournaments into database with SQL file: ' + log_sql_file_name + '\n')

#inserting ratios into database and creating logs
add_ratio = 'INSERT INTO ratios (player_id, grass_out, grass_in, clay_out, clay_in, hard_out, hard_in) VALUES (%s, %s, %s, %s, %s, %s, %s)'
time = str(datetime.datetime.now()).split(' ')
time = str(time[0] + '_' + time[1]).split('.')[0].replace(':', '_')
log_sql_file_name = 'load_data_' + time + '.log'

with open('logs/' + log_sql_file_name, "w") as log_sql_file:
    for ratio in ratios:
        cursor.execute(add_ratio, (ratio[0], ratio[1], ratio[2], ratio[3], ratio[4], ratio[5], ratio[6]))
        log_sql_file.write(
            '''INSERT INTO ratios (player_id, grass_out, grass_in, clay_out, clay_in, hard_out, hard_in) VALUES ('%s');\n''' % "', '".join(map(str, ratio)))

with open('logs/main_logs.log', "a") as log_file:
    log_file.write(time + ' - loading data about tournaments into database with SQL file: ' + log_sql_file_name + '\n')

cnx.commit()
cursor.close()
cnx.close()

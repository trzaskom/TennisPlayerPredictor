from mysql.connector import (connection)

cnx = connection.MySQLConnection(user='root', password='',
                                 host='127.0.0.1',
                                 database='tennisapp')
cnx.close()
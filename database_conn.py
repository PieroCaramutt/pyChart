import sqlite3

#Database Connection 
con = sqlite3.connect('statements.db')
cur = con.cursor()

#DB creation
cur.execute('''CREATE TABLE IF NOT EXISTS statements
                    (transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_date DATE, posting_date DATE, description,  amount REAL, year DATE)''')
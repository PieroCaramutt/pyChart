import pandas as pd
import database_conn as db

# Define the path to your CSV file
file_path = 'statement.csv'

# Read the CSV file
df = pd.read_csv(file_path)

data=[]
 
for i in range(0, len(df), 1):
    data.append(df.iloc[i])

#executing insert
db.cur.executemany("INSERT OR IGNORE INTO statements(description,amount, year) VALUES(?,?,?)", data)
db.con.commit()

select_statement = "SELECT  description, SUM(amount) FROM statements  WHERE description IS NOT NULL GROUP BY description"

#Display info
for row in db.cur.execute(select_statement):
    print(row)




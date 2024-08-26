const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch data from SQLite database
app.get('/data', (req, res) => {
    const db = new sqlite3.Database('statements.db');

    const labels = [];
    const dataValues = [];

    db.serialize(() => {
        db.each("SELECT description, SUM(amount) AS amount FROM statements WHERE description NOT LIKE 'PAYMENT%' GROUP BY description ", (err, row) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            labels.push(row.description); // Label column
            dataValues.push(row.amount); // Data column
        }, () => {
            // Send the data as JSON after all rows are fetched
            res.json({
                labels: labels,
                dataValues: dataValues
            });
        });
    });

    db.close();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
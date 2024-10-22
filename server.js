const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'meera@1213',
    database: 'solar_install'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for the solar calculator form submission
app.post('/submit-calculator', (req, res) => {
    const { panelCapacity, roofArea, budget, electricityCost, state, customerCategory } = req.body;

    // Log the received data for debugging
    console.log('Calculator Form Data:', req.body);

    // Validate input
    if (!panelCapacity || !roofArea || !budget || !electricityCost || !state || !customerCategory) {
        return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
    }
    // Insert data into the solar_calculator_data table
    const sql = `INSERT INTO solar_calculator_data (panel_capacity, roof_area, budget, electricity_cost, state, customer_category)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [panelCapacity, roofArea, budget, electricityCost, state, customerCategory];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting calculator data:', err);
            return res.status(500).json({ success: false, error: 'Error submitting calculator data' });
        }
        console.log('Calculator data inserted into MySQL:', result);
        res.json({ success: true, message: 'Your data has been submitted successfully!' });
    });
});
app.post('/submit-calculator', (req, res) => {
    const { 'panel-capacity': panelCapacity, 'roof-area': roofArea, budget, 'electricity-cost': electricityCost, state, 'customer-category': customerCategory } = req.body;

    // Log received data for debugging
    console.log('Calculator Form Data:', req.body);

    // Validate input
    if (!panelCapacity || !roofArea || !budget || !electricityCost || !state || !customerCategory) {
        return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
    }

    // Insert data into the solar_calculator_data table
    const sql = `INSERT INTO solar_calculator_data (panel_capacity, roof_area, budget, electricity_cost, state, customer_category)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [panelCapacity, roofArea, budget, electricityCost, state, customerCategory];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting calculator data:', err);
            return res.status(500).json({ success: false, error: 'Error submitting calculator data' });
        }
        console.log('Calculator data inserted into MySQL:', result);
        res.json({ success: true, message: 'Your data has been submitted successfully!' });
    });
});

// Route for contact form submission
app.post('/submit-contact', (req, res) => {
    const { fullName, email, phone, message } = req.body;

    // Log the received data for debugging
    console.log('Contact Form Data:', req.body);

    // Validate input
    if (!fullName || !email || !phone || !message) {
        return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
    }

    // Insert data into the contact_form table
    const sql = `INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)`;
    
    const values = [fullName, email, phone, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting contact data:', err);
            return res.status(500).json({ success: false, error: 'Error submitting contact form' });
        }
        console.log('Contact data inserted into MySQL:', result);
        res.json({ success: true, message: 'Your message has been sent successfully!' });
    });
});


// Route to get all service requests
app.get('/get-all-services', (req, res) => {
    const sql = `SELECT * FROM solar_services`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).json({ success: false, error: 'Error retrieving service data' });
        }
        res.json({ success: true, data: results });
    });
});

// Route to get all contact data
app.get('/get-contact-data', (req, res) => {
    const sql = `SELECT * FROM contact_form`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).json({ success: false, error: 'Error retrieving contact data' });
        }
        res.json({ success: true, data: results });
    });
});

// Route to get all calculator data
app.get('/get-calculator-data', (req, res) => {
    const sql = `SELECT * FROM solar_calculator_data`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).json({ success: false, error: 'Error retrieving calculator data' });
        }
        res.json({ success: true, data: results });
    });
});
// Route to get notifications
app.get('/get-notifications', (req, res) => {
    const sql = `SELECT * FROM notifications ORDER BY created_at DESC`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving notifications:', err);
            return res.status(500).json({ success: false, error: 'Error retrieving notifications' });
        }
        res.json({ success: true, data: results });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

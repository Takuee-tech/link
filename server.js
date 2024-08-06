require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users[username] = { password };
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User created' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

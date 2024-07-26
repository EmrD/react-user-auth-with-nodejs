const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 5000; // Vercel portunu kullan

app.use(bodyParser.json());
app.use(cors());

let users = {};
let codes = {};

// Kullanıcı kaydı ve kod gönderme
app.post('/register', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'User already registered' });
    }

    const code = uuidv4();
    codes[username] = code;
    users[username] = { registered: false };

    res.json({ code });
});

// Kod doğrulama
app.post('/verify', (req, res) => {
    const { username, code } = req.body;

    if (!username || !code) {
        return res.status(400).json({ message: 'Username and code are required' });
    }

    if (codes[username] === code) {
        users[username].registered = true;
        delete codes[username];
        res.json({ success: true });
    } else {
        res.status(400).json({ message: 'Invalid code' });
    }
});

app.get('/status/:username', (req, res) => {
    const { username } = req.params;

    if (users[username]) {
        res.json({ registered: users[username].registered });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const path = require('path');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/gigs', (req, res) => {
    const userSkills = req.query.skills ? req.query.skills.toLowerCase().split(',') : [];
    let db = new sqlite3.Database('gigs.db');
    db.all('SELECT * FROM gigs', [], (err, gigs) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const filteredGigs = gigs.map(gig => {
            const gigSkills = gig.skills.toLowerCase().split(', ');
            const matches = userSkills.filter(skill => gigSkills.includes(skill.trim()));
            const score = (matches.length / gigSkills.length) * 100;
            return { ...gig, score };
        }).filter(gig => gig.score > 0)
          .sort((a, b) => b.score - a.score);
        res.json(filteredGigs);
    });
    db.close();
});

app.get('/skills-trends', (req, res) => {
    let db = new sqlite3.Database('gigs.db');
    db.all('SELECT skills FROM gigs', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const skillsCount = {};
        rows.forEach(row => {
            const skills = row.skills.toLowerCase().split(', ');
            skills.forEach(skill => {
                skillsCount[skill] = (skillsCount[skill] || 0) + 1;
            });
        });
        res.json(skillsCount);
    });
    db.close();
});

app.listen(process.env.PORT || 3000, () => console.log('Server running on port', process.env.PORT || 3000));
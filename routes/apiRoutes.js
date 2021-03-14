// LOAD DATA
const path = require('path');
const fs = require('fs');
const database = require('../db/db.json');
const hyperid = require('hyperid');


// ROUTING

module.exports = (app) => {

    // HTML GET REQUESTS
    app.get('/api/notes', (req, res) => res.json(database));

    // API POST REQUESTS
    // receive a new note to save on req.body, add it to the db.json file, return new note to client, give unique id when saved (hyperid)
    app.post('/api/notes', (req, res) => {
        const instance = hyperid();
        const id = instance();
        req.body['id'] = id;
        database.push(req.body);
        fs.writeFileSync('./db/db.json', JSON.stringify(database));
        console.log(req.body);
        res.json(database);
    })
}
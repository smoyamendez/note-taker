// LOAD DATA
const fs = require('fs');
const database = require('../db/db.json');
const generateUniqueId = require('generate-unique-id');


// ROUTING

module.exports = (app) => {

    // HTML GET REQUESTS
    app.get('/api/notes', (req, res) => res.json(database));

    // API POST REQUESTS
    // receive a new note to save on req.body, add it to the db.json file, return new note to client, give unique id when saved (hyperid)
    app.post('/api/notes', (req, res) => {
        const id = generateUniqueId();
        req.body['id'] = id;
        database.push(req.body);
        fs.writeFileSync('./db/db.json', JSON.stringify(database));
        console.log(req.body);
        res.json(database);
    })

    app.delete('/api/notes/:id', (req, res) => {
        let idIndex = database.findIndex(i => i.id === req.params.id);
        database.splice(idIndex, 1);
        fs.writeFileSync('./db/db.json', JSON.stringify(database));
        res.send();
    })
}
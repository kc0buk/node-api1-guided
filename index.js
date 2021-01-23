// import the server and start it
// import express from 'express'; // ES2015 modules

const express = require('express'); // CommonJS modules, similar to the line above, but backwards compatible

const server = express();

// Teach express how to read JSON data from body
server.use(express.json()) // Needed for POST & PUT

let hubs = [
    {
        id: 1,
        name: 'Node33 API Intro',
        lessonId: 1,
        cohort: 'node 33',
    },
    {
        id: 2,
        name: 'Node33 Server Side Routing',
        lessonId: 2,
        cohort: 'node 33',
    },
];

server.get('/', (req, res) => {
    res.status(200).json({ hello: "Hello from Express ..." })
});

// List hubs
server.get('/hubs', (req, res) => {
    res.status(200).json({ data: hubs })
})


// Create hub
server.post('/hubs', (req, res) => {
    const hub = req.body;

    hubs.push(hub);

    res.status(201).json({ data: hubs })
})

// Modify existing record
server.put('/hubs/:id', (req, res) => {
    const changes = req.body;
    // Convert ID to number right away
    const id = Number(req.params.id);

    let found = hubs.find(hub => hub.id === id)
    
    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'Record not found' })
    }
});

// Delete hub
server.delete('/hubs/:id', (req, res) => {
    // Convert ID to number right away
    const id = Number(req.params.id);

    // All values coming from the URL are strings
    hubs = hubs.filter(hub => hub.id !== id);

   // res.status(204).end();
   res.status(200).json({ data: hubs })
});

const port = 8000;
server.listen(port, () => console.log(`Server is listening on port ${port} ...`));

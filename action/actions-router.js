const express = require('express');

const db = require('../data/helpers/actionModel');

const router = express.Router();

// GET actions

router.get('/', (req, res) => {
    db.get()
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve data.' })
        })
})

// GET action by id

router.get('/:id', (req, res) => {
    const actionId = req.params.id;

    db.get(actionId)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Action data could not be retrieved.' })
        })
})

// POST (add new action)

router.post('/', (req, res) => {
    const newAction = req.body;

    if(!newPost.description) {
        res.status(400).json({ errorMessage: 'This action requires a description.' })
    }

    db.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not add action to database.' })
        })
})

// PUT (update action)

router.put('/:id', (req, res) => {
    const actionId = req.params.id;
    const updatedAction = req.body;

    db.insert(actionId, updatedAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'This item could not be updated.' })
        })
})

// DELETE action

router.delete('/:id', (req, res) => {
    const actionId = req.params.id;

    db.remove(actionId)
        .then(() => {
            res.status(200).end();
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'This action could not be deleted.' })
        })
})

module.exports = router;
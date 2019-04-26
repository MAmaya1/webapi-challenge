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
            if (action) {
                db.get(actionId)
                    .then(action => {
                        res.status(201).json(action)
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'Action data could not be retrieved.' })
                    })
            } else {
                res.status(404).json({ errorMessage: 'An action with the specified ID does not exist.' })
            }
        })
})

// POST (add new action)

router.post('/', (req, res) => {
    const newAction = req.body;

    if (!newAction.description) {
        res.status(400).json({ errorMessage: 'This action requires a description (128 characters max).' })
    }

    if (newAction.project_id) {
        db.insert(newAction)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Could not add action to database.' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide a valid project ID.' })
    }

})

// PUT (update action)

router.put('/:id', (req, res) => {
    const actionId = req.params.id;
    const updatedAction = req.body;

    if (!updatedAction.description) {
        res.status(400).json({ errorMessage: 'This action requires a description (128 characters max).' })
    }

    db.get(actionId)
        .then(action => {
            if (action) {
                db.update(actionId, updatedAction)
                    .then(action => {
                        res.status(201).json(action)
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'This item could not be updated.' })
                    })
            } else {
                res.status(404).json({ errorMessage: 'An action with the specified ID does not exist.' })
            }
        })
})

// DELETE action

router.delete('/:id', (req, res) => {
    const actionId = req.params.id;

    db.get(actionId)
        .then(action => {
            if (action) {
                db.remove(actionId)
                    .then(() => {
                        res.status(200).end();
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'This action could not be deleted.' })
                    })
            } else {
                res.status(404).json({ errorMessage: 'An action with the specified ID does not exist.' })
            }
        })
})

module.exports = router;
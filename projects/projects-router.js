const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

// GET projects

router.get('/', (req, res) => {
    db.get()
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve project data.' })
        })
})

// GET projects by ID

router.get('/:id', (req, res) => {
    const projectId = req.params.id;

    db.get(projectId)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve project data.' })
        })
})

// GET project actions

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;

    db.getProjectActions(projectId)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve project actions.' })
        })
})

// POST new project

router.post('/', (req, res) => {
    const newProject = req.body;
    
    if (!newPost.name || !newPost.description) {
        res.status(400).json({ errorMessage: 'New projects require a name and description.' })
    }

    db.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Project could not be added to database.' })
        })
})

// PUT (edit project)

router.post('/:id', (req, res) => {
    const projectId = req.params.id;
    const updatedProject = req.body;

    if (!updatedProject.name || !updatedProject.description) {
        res.status(400).json({ errorMessage: 'Projects require a name and description.' })
    }

    db.update(projectId, updatedProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Project could not be updated.' })
        })
})

// DELETE project

router.delete('/:id', (req, res) => {
    const projectId = req.params.id;

    db.remove(projectId)
        .then(() => {
            res.status(200).end();
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Project could not be deleted.' })
        })
})

module.exports = router;
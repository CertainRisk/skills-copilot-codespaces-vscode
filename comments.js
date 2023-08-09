// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/comment');

// Get all comments
router.get('/', (req, res) => {
    Comment.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(`Error in retrieving comments: ${JSON.stringify(err, undefined, 2)}`);
        }
    });
});

// Get comment by id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    Comment.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(`Error in retrieving comment: ${JSON.stringify(err, undefined, 2)}`);
        }
    });
});

// Create comment
router.post('/', (req, res) => {
    const comment = new Comment({


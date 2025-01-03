const express = require('express');
const fs = require('fs');
const { redisClient: redis } = require('./../../config/redisConfig');

const Story = require('../models/story');

const router = express.Router();

const { getVoteKey } = require('./../utils/index');

// List
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find();

        if (stories.length === 0)
            return res.status(400).send({ error: 'No stories found' });

        return res.send({ stories });
    } catch (error) {
        return res.status(400).send({ error: 'Error listing stories' });
    }
});

// Get Current Day
router.get('/day', async (req, res) => {
    try {
        const filePath = 'day.json';
        const data = fs.readFileSync(filePath, 'utf-8');
        const day = JSON.parse(data);

        return res.send(day);
    } catch (error) {
        return res.status(400).send({ error: 'Error getting current day' });
    }
});

// Get Current Vote Count
router.get('/get_votes', async (req, res) => {
    try {
        const keys = await redis.keys('vote-*');
        const values = await redis.mget(...keys);

        const voteCount = {};
        keys.forEach((key, index) => {
            voteCount[key] = values[index];
        });

        return res.send(voteCount);
    } catch (error) {
        return res.status(400).send({ error: 'Error getting vote count' });
    }
});

// Show Story By Day
router.get('/show_by_day', async (req, res) => {
    try {
        const filePath = 'day.json';
        const data = fs.readFileSync(filePath, 'utf-8');
        const day = JSON.parse(data);

        const story = await Story.findOne(day);

        if (!story)
            return res.status(400).send({ error: 'Story not found' });

        return res.send(story);
    } catch (error) {
        return res.status(400).send({ error: 'Error showing story' });
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        const lastStory = await Story.findOne().sort({ day: -1 });
        let newDay = 1;

        if (lastStory) {
            newDay = lastStory.day + 1;
        }

        const story = await Story.create({ day: newDay, ...req.body });

        return res.send({ story });
    } catch (error) {
        return res.status(400).send({ error: 'Error creating new story' });
    }
});

// Update Story Votes
router.put('/vote', async (req, res) => {
    const { vote } = req.body;

    try {
        let voteKey = getVoteKey(vote);

        await redis.incr(`vote-${voteKey}`);
        const updatedVoteValue = await redis.get(`vote-${voteKey}`);

        if (!updatedVoteValue) {
            return res.status(400).send({ error: 'Vote count not found' });
        }

        return res.send({ voteCount: `${vote} vote count: ${updatedVoteValue}` });
    } catch (error) {
        return res.status(400).send({ error: 'Error updating story' });
    }
});

// Update
router.put('/:day', async (req, res) => {
    const { day } = req.params;

    try {
        const story = await Story.findOneAndUpdate({ day }, req.body, { runValidators: true, new: true });

        if (!story)
            return res.status(400).send({ error: 'Story not found' });

        return res.send({ story });
    } catch (error) {
        return res.status(400).send({ error: 'Error updating story' });
    }
});

// Delete
router.delete('/:storyId', async (req, res) => {
    const { storyId } = req.params;

    try {
        const story = await Story.findByIdAndRemove(storyId);

        if (!story)
            return res.status(400).send({ error: 'Story not found' });

        return res.send({ message: 'Successfully deleted' });
    } catch (error) {
        return res.status(400).send({ error: 'Error deleting story' });
    }
});

module.exports = app => app.use('/story', router);
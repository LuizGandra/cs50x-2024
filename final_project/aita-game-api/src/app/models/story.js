const mongoose = require('../../database/index');

const StorySchema = new mongoose.Schema({
    day: {
        type: Number,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: 'The value is not a valid integer'
        },
        unique: true,
        required: true
    },
    titleEn: {
        type: String,
        required: true
    },
    titlePtbr: {
        type: String,
        required: true
    },
    textEn: {
        type: String,
        required: true
    },
    textPtbr: {
        type: String,
        required: true
    },
    results: {
        type: [Number]
    }
});

const Story = mongoose.model('Story', StorySchema, 'Story');

module.exports = Story;
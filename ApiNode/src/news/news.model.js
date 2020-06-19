const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
    author: { 
        type : String,
        require: true
    },
    comment_text: { 
        type : String,
        require: true
    },
    story_id: { 
        type : String,
        require: true
    },
    story_title: { 
        type : String,
        require: true
    },
    story_url: { 
        type : String,
        require: true
    },
    created_at: {
        type: Date
    },
    deleted: { 
        type : Boolean,
        require: true
    },
});

module.exports = newSchema;
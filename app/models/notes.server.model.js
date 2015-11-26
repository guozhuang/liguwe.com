// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define a new 'NotesSchema'
var NotesSchema = new Schema({
    guid: {
        type:String,
        index:true
    },
    title: {
        type:String,
        index:true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    contentHash: {},
    contentLength: Number,
    created: Number,
    updated: Number,
    deleted: Number,
    active: Boolean,
    updateSequenceNum: Number,
    notebookGuid: String,
    tagGuids: [],
    resources: [],
    attributes: {},
    tagNames: []
});

mongoose.model('Notes', NotesSchema);


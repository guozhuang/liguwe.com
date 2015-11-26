// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'NoteBooksSchema'
var NoteBooksSchema = new Schema({
    guid: {
        type:String,
        index:true,
        trim: true
    },
    name: {
        type:String,
        index:true
    },
    updateSequenceNum: Number,
    defaultNotebook: Boolean,
    serviceCreated: Number,
    serviceUpdated: Number,
    publishing: {},
    published: Boolean,
    stack: String,
    sharedNotebookIds: [],
    sharedNotebooks: [],
    businessNotebook: {},
    contact: {},
    restrictions: {}
});

mongoose.model('NoteBooks', NoteBooksSchema);


'use strict';

var EvernoteService = require('./evernote.js'),
    mongoose = require('mongoose'),
    Notes = mongoose.model("Notes"),
    NoteBooks = mongoose.model('NoteBooks');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};
// Create a new 'render' controller method
exports.render = function (req, res) {
    res.render('index', {
        //title: 'Hello World'
        //user: JSON.stringify(req.user)
    });
};

exports.listNoteBooks = function (req, res) {
    NoteBooks.find({}, 'guid name stack serviceUpdated serviceCreated').sort({name: 1}).exec(function (err, noteBooks) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the noteBooks
            var books = [],
                bookStacks = [];
            var len = noteBooks.length;
            for (var i = 0; i < len; i++) {
                if (!noteBooks[i].stack) {
                    bookStacks.push({
                        stack: null,
                        book: noteBooks[i]
                    });
                }
                else {
                    for (var j = i; j < len; j++) {
                        if (noteBooks[i].stack == noteBooks[j].stack) {
                            if (books.indexOf(noteBooks[j].stack) == -1) {
                                bookStacks.push({
                                    stack: noteBooks[i].stack,
                                    books: [noteBooks[i]]
                                });
                            } else if (noteBooks[i].guid != noteBooks[j].guid) {
                                bookStacks[bookStacks.length - 1].books.push(noteBooks[i]);
                            }
                            books.push(noteBooks[j].stack);
                        }
                    }
                }
            }
            res.json(bookStacks);
        }
    })
};

exports.listNotesByNoteBookGuId = function (req, res) {
    Notes.find({notebookGuid: req.params.noteBookGuid}, 'guid title created updated deleted notebookGuid')
        .sort({title: 1}).exec(function (err, notes) {
        if (err) console.log("listNotesByNoteBookGuId():" + err + "\n");
        if (!notes) console.log('Failed to load noteBooks list:' + req.noteBookGuid + '\n');
        NoteBooks.findOne({guid: req.params.noteBookGuid}, 'name guid').exec(function (err, book) {
            if (err) console.log(err);
            notes.unshift(book);
            res.json(notes);
        });
    })
};


exports.listNotesByNoteBookGuId = function (req, res) {
    Notes.find({notebookGuid: req.params.noteBookGuid}, 'guid title created updated deleted notebookGuid')
        .sort({title: 1}).exec(function (err, notes) {
        if (err) console.log("listNotesByNoteBookGuId():" + err + "\n");
        if (!notes) console.log('Failed to load noteBooks list:' + req.noteBookGuid + '\n');
        NoteBooks.findOne({guid: req.params.noteBookGuid}, 'name guid').exec(function (err, book) {
            if (err) console.log(err);
            notes.unshift(book);
            res.json(notes);
        });
    })
};


exports.readNoteByGuId = function (req, res) {
    Notes.findOne({guid: req.params.noteGuid}, 'guid title created updated notebookGuid content').exec(function (err, note) {
        if (err) next(err);
        if (!note) return next(new Error('Failed to load noteBooks ' + req.noteBookGuid));
        note.content = note.content.split(/^<html><head><meta[\w\W]+<\/head><body[\w\W]+?>/)[1].split(/<\/body><\/html>$/)[0];
        res.json(note);
    })
};
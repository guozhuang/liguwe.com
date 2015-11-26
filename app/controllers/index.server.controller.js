'use strict';

var EvernoteService = require('../../config/evernote.js'),
    evernote = new EvernoteService(),
    mongoose = require('mongoose'),
    //Notes = mongoose.model("Notes"),
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
    res.render('home', {});
};

exports.listNoteBooks = function (req, res) {
    NoteBooks.find({}, 'guid name stack serviceUpdated serviceCreated').sort({name: 1}).exec(function (err, noteBooks) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            var books = [],
                bookStacks = [];
            var len = noteBooks.length;
            for (var i = 0; i < len; i++) {
                if (!noteBooks[i].stack) {
                    bookStacks.push({
                        stack: null,
                        book: noteBooks[i]
                    });
                    books.push(noteBooks[i].stack);
                }
                else {
                    if (books.indexOf(noteBooks[i].stack) == -1) {
                        bookStacks.push({
                            stack: noteBooks[i].stack,
                            books: [noteBooks[i]]
                        });
                        books.push(noteBooks[i].stack);
                    } else {
                        !!bookStacks[books.indexOf(noteBooks[i].stack)].books && bookStacks[books.indexOf(noteBooks[i].stack)].books.push(noteBooks[i]);
                    }
                }
            }
            res.json(bookStacks);
        }
    })
};

exports.listNotesByNoteBookGuId = function (req, res) {
    NoteBooks.findOne({guid: req.params.noteBookGuid}, 'name guid').exec(function (err, book) {
        if (err) console.log("listNotesByNoteBookGuId():" + err + "\n");
        evernote.listNotesByNoteBookGuid(req.params.noteBookGuid).then(function (data) {
            var notesList = data.notes;
            notesList.unshift(book);
            res.json(notesList);
        }, function (e) {
            console.log(" evernote.listNotesByNoteBookGuid():\n" + e, e.stack)
        });
    });
};

exports.readNoteByGuId = function (req, res) {
    evernote.getNoteByGuid(req.params.noteGuid).then(function (note) {
        note.content = note.content.split(/^<html><head><meta[\w\W]+<\/head><body[\w\W]+?>/)[1].split(/<\/body><\/html>$/)[0];
        res.json(note);
    }, function (e) {
        console.log(" evernote.getNoteByGuid():\n" + e, e.stack)
    });
};
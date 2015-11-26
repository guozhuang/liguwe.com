'use strict';

var note = require('../../app/controllers/index.server.controller');

module.exports = function(app) {

    app.get('/',note.render);

    app.route('/api/noteBooks').get(note.listNoteBooks);

    app.route('/api/notes/:noteBookGuid').get(note.listNotesByNoteBookGuId);

    app.route('/api/note/:noteGuid').get(note.readNoteByGuId);

};
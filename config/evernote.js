var Evernote = require('evernote').Evernote,
    Promise = require("rsvp").Promise,
    enml = require('enml-js'),
    authToken = require("./config").authToken;

function EvernoteService() {

    this.client = new Evernote.Client({
        token: authToken,
        sandbox: false
    });

    this.noteStore = this.client.getNoteStore("https://app.yinxiang.com/shard/s43/notestore");
    //this.noteStore = this.client.getNoteStore();

    return this;
}


EvernoteService.prototype.listNotebooks = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.noteStore.listNotebooks(authToken, function (err, notebooks) {
            if (err) {
                console.log("listNotebooks():" + err);
                return reject(err);
            }
            var needSaveBook = [];
            for(var i = 0,len= notebooks.length;i<len;i++){
                //if(notebooks[i].stack != "笔记本组1"){
                if(notebooks[i].stack != "0_private" && notebooks[i].stack != "废纸篓"){
                    needSaveBook.push(notebooks[i]);
                }
/*                if( notebooks[i].stack == "废纸篓"){
                    needSaveBook.push(notebooks[i]);
                }*/
            }
            return resolve(needSaveBook);
        });
    })
};

/*
 * 参数说明：
 * orderStyle: order style
 *   CREATED 1
 *   UPDATED 2
 *   RELEVANCE 3
 *   UPDATE_SEQUENCE_NUMBER 4
 *   TITLE	5
 * guid: noteBook's guid
 * isAscending: false
 * */
EvernoteService.prototype.listNotesByNoteBookGuid = function (guid/*, orderStyle, isAscending*/) {
    var self = this,
        filter = new Evernote.NoteFilter({
            //order: orderStyle
            notebookGuid: guid
            //ascending: isAscending
        }),
        resultSpec = new Evernote.NotesMetadataResultSpec({
            includeTitle:true,
            //includeContentLength:true,
            includeCreated:true,
            includeUpdated:true,
            includeDeleted:true,
            //includeUpdateSequenceNum:true,
            includeNotebookGuid:true
            //includeTagGuids:true,
            //includeAttributes:true,
            //includeLargestResourceMime:true,
            //includeLargestResourceSize:true
        });
    filter.order = 5;
    filter.ascending = true;

    return new Promise(function (resolve, reject) {
        self.noteStore.findNotesMetadata(authToken, filter, 0, 10000, resultSpec, function (err, notes) {
            if (err) {
                console.log("findNotesMetadata()出错:" + err + "\n");
                return reject(err);
            }
            return resolve(notes);
        });
    });
};

EvernoteService.prototype.getNoteByGuid = function (guid) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.noteStore.getNote(authToken, guid, true, true, true, true, function (err, note) {
            if (err) {
                console.log("getNoteByGuid()出错" + err + "\n");
                return reject(err);
            }
            if(!note.deleted){
                var noteHtml = note;
                //转enml --->  html
                noteHtml.content = enml.HTMLOfENML(noteHtml.content, noteHtml.resources);
                return resolve(noteHtml);
            }

        });
    });
};


module.exports = EvernoteService;







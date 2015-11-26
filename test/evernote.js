//var developerToken = "S=s1:U=912ae:E=15860598577:C=15108a857c8:P=1cd:A=en-devtoken:V=2:H=182f5f10c7a255adb6cbb27d754386ac";
//https://sandbox.evernote.com/shard/s1/notestore

var Evernote = require('evernote').Evernote;
var fs = require("fs");
var rsvp = require("rsvp");

var authToken = "S=s1:U=912ae:E=15860598577:C=15108a857c8:P=1cd:A=en-devtoken:V=2:H=182f5f10c7a255adb6cbb27d754386ac";

var client = new Evernote.Client({token: authToken, sandbox: true});
var noteStore = client.getNoteStore();



function yinxiangServer(){

    this.client = new Evernote.Client({
        token: authToken,
        sandbox: true
    });

    this.noteStore = this.client.getNoteStore();

    return this;

}



var promise = new RSVP.Promise(function(resolve, reject) {

    noteStore.listNotebooks(function (err, notebooks) {
        if (err) {
            console.log("listNotebooks:" + err);
        }
        //console.log(notebooks.length);

        //fs.writeFile('./noteBooks.json',JSON.stringify(notebooks),function(err){
        //    if(err) console.log('写文件操作失败。');
        //    else  console.log('写文件操作成功。');
        //});

        var noteArr = [];

        for (var i = 0, len = notebooks.length; i < len; i++) {

            var filter = new Evernote.NoteFilter({
                //CREATED	1
                //UPDATED	2
                //RELEVANCE	3
                //UPDATE_SEQUENCE_NUMBER	4
                //TITLE	5
                order:5,
                notebookGuid: notebooks[i].guid,
                ascending:false
            });


            noteStore.findNotes(filter, 0, 10000, function (err, notes) {
                if (err) {
                    console.log("findNotes:" + err);
                }

                console.log("--------------------\n"+JSON.stringify(notes));

                noteArr.push(notes);

                fs.writeFileSync("./notes.json", JSON.stringify(notes));


                //noteStore.getNoteContent(notes.notes[j].guid, function (err, content) {
                //    if (err) {
                //        console.log("getNoteContent():", err);
                //    }
                //    console.log("---------------------\n" + content);
                //});

            });


        }




    });

    // succeed
    resolve(value);
    // or reject
    reject(error);
});


notebooks = noteStore.listNotebooks(function (err, notebooks) {
    if (err) {
        console.log("listNotebooks:" + err);
    }
    //console.log(notebooks.length);

    //fs.writeFile('./noteBooks.json',JSON.stringify(notebooks),function(err){
    //    if(err) console.log('写文件操作失败。');
    //    else  console.log('写文件操作成功。');
    //});

    var noteArr = [];

    for (var i = 0, len = notebooks.length; i < len; i++) {

        var filter = new Evernote.NoteFilter({
            //CREATED	1
            //UPDATED	2
            //RELEVANCE	3
            //UPDATE_SEQUENCE_NUMBER	4
            //TITLE	5
            order:5,
            notebookGuid: notebooks[i].guid,
            ascending:false
        });


        noteStore.findNotes(filter, 0, 10000, function (err, notes) {
            if (err) {
                console.log("findNotes:" + err);
            }

            console.log("--------------------\n"+JSON.stringify(notes));

            noteArr.push(notes);

            fs.writeFileSync("./notes.json", JSON.stringify(notes));


            //noteStore.getNoteContent(notes.notes[j].guid, function (err, content) {
            //    if (err) {
            //        console.log("getNoteContent():", err);
            //    }
            //    console.log("---------------------\n" + content);
            //});

        });


    }




});








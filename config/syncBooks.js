require('./mongoose.js')();

var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var EvernoteService = require('./evernote.js');
var noteBooksModel = require('mongoose').model('NoteBooks');
//var notesModel = require('mongoose').model('Notes');
var is = require('util').inspect;

var ns = new EvernoteService();

var mapSeries = function (array, iterator, context) {
    var length = array.length;
    var current = Promise.resolve();
    var results = new Array(length);
    for (var i = 0; i < length; ++i) {
        current = results[i] = current.then(function (i) {
            return iterator.call(context, array[i], i, array)
        }.bind(undefined, i))
    }
    return Promise.all(results)
};

var t1 = Date.now();


ns.listNotebooks().then(function (books) {
    var p1 = books.map(function (book) {
        var saveMongodbPromise = function(model,Model) {
            return new Promise(function (resolve, reject) {
                return Model.findOne({guid: model.guid}).exec(function(err,note) {
                    if (err) return reject(err);
                    if(!note){
                        var newModel = new Model(model);
                        return newModel.save(function (err) {
                            if (err){
                                console.log("出错："+ model.name + "\n");
                                return reject(err);
                            }
                            console.log('新创建：' + model.name );
                            return resolve(model);
                        });
                    }
                    if(model.updated == note.updated) {
                        console.log('未修改：'  + model.title);
                        return resolve(model);
                    }
                    return note.update({$set: model}, function (err) {
                        if (err) return reject(err);
                        console.log('更新：' + model.name );
                        return resolve(model);
                    });
                });
            })
        };
        var p2 = saveMongodbPromise(book,noteBooksModel).then(function () {
            console.log('updateBooks: %s', book.name);
        });
        return RSVP.all([p2]);
    });
    return RSVP.all(p1);
}).then(function () {
    console.log("\n 数据导入完毕!!!！");
    console.log('Sync complete! Cost: %sms', Date.now() - t1);
}, function (e) {
    console.error("Error : %s \n    %s", e, e.stack);
});

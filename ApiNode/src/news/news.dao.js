const mongoose = require("mongoose");
const newsSchema = require("./news.model");

newsSchema.statics = {
    create: function (data, cb){
        const news = new this(data);
        news.save(cb);
    },
    get: function (query, cb){
        this.find(query, cb).sort( { created_at: -1 } );
    },
    getByDelete: function (query, cb){
        this.find(query, cb);
    },
    getById: function (query, cb){
        this.find(query, cb);
    },
    update: function (query, updateData, cb){
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },
    delete: function (query, cb){
        this.findOneAndDelete(query, cb);
    }
}

const newsModel = mongoose.model('News',newsSchema);
module.exports = newsModel;
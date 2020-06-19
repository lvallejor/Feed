const News = require("./news.dao");

exports.createNews = (req, res, next) => {
    const news = {
        author: req.body.author,
        comment_text: req.body.comment_text,
        story_id: req.body.story_id,
        story_title: req.body.story_title,
        story_url: req.body.story_url,
        created_at: req.body.created_at,
        deleted: false
        }
    News.create(news, (err, news)=>{
        if (err) res.json({error: err});
        res.json({message:'News created successfully'});
    });
}

exports.getNews = (req, res, next) => {
    News.get({}, (err, news)=>{
        if (err) res.json({error: err});
        res.header('Access-Control-Allow-Origin', '*');
        res.json({News:news});
    });
}

exports.getById = (req, res, next) => {
    News.get({ story_id:req.params.story_id }, (err, news)=>{
        if (err) res.json({error: err});
        res.json({News:news});
    });
}

exports.getByDelete = (req, res, next) => {
    News.get({ deleted:false }, (err, news)=>{
        if (err) res.json({error: err});
        res.json({News:news});
    });
}

exports.updateNews = (req, res, next) => {
    const news = {
        // author: req.body.author,
        // comment_text: req.body.comment_text,
        // story_id: req.body.story_id,
        // story_title: req.body.story_title,
        // story_url: req.body.story_url,
        deleted:true
        }
        console.log("llego..");

    News.update({ _id:req.params._id }, news, (err, news)=>{
        if (err) res.json({error: err});
        res.json({message:'News updated successfully'});
    });
}

exports.removeNews = (req, res, next) => {
    News.delete({ _id:req.params._id }, (err, news)=>{
        if (err) res.json({error: err});
        res.json({message:'News deleted successfully'});
    });
}
const News = require("./news.controller");

module.exports = (router) => {
    router.post('/add', News.createNews);
    router.get('/news', News.getNews);
    router.get('/allnews', News.getByDelete);
    router.get('/news/:story_id', News.getById);
    router.put('/news/:_id', News.updateNews);
    router.delete('/news/:_id', News.removeNews);
}
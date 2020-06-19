const express = require("express");
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
var CronJob = require('node-cron');
const properties = require("./config/properties");
const newsRoutes = require('./news/news.routes');
const db = require("./config/database");
const News = require("./news/news.dao");
const chalk = require("chalk");

const insertar = chalk.bold.cyan;
const descartar = chalk.bold.red;

//init database
db();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});
const app = express();
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

//init routes
const router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
//use express router
app.use('/api', router);
newsRoutes(router);

async function API(url){
    const baseURL = "http://localhost:4000/api/news/";
    const response = await fetch(baseURL+url);
    const data = await response.json();
    return data;
}

const createNews = (data) => {
    const news = {
        author: data.author,
        comment_text: data.comment_text,
        story_id: data.story_id,
        story_title: data.story_title,
        story_url: data.story_url,
        created_at: data.created_at,
        deleted: false
        }

    News.create(news, res={}, (err, news)=>{
        if (err) data = {error: err};
        return {message:'News created successfully'};
    });
}

CronJob.schedule('0 */1 * * * *', async () => {
    const baseURL = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs";
    const response = await fetch(baseURL);
    const data = await response.json();
    // Insertar
    for (let x in data.hits) {
        //console.log(data.hits[x].author);
        if(data.hits[x].story_id !== null)
            API(data.hits[x].story_id).then(item => {
                if(item.News.length>0) return console.log(descartar("Existe registros: "+data.hits[x].story_id));
                console.log(insertar("No hay registros: "+data.hits[x].story_id));
                createNews(data.hits[x]);
                return;
            });
    }
});


app.listen(properties.PORT, ()=>console.log(`Server is running on port: ${properties.PORT}`));
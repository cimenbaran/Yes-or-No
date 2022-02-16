require('dotenv').config();

const express = require('express')
const http = require('http')
const fetch = require('node-fetch');


const app = express()

const router = express.Router();

router.get('/', (req, res) => {

    const index = Math.floor(Math.random() * 2);
    const random = Math.floor(Math.random() * 4999) + 1;
    const answer = index === 1 ? "yes" : "no";
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${answer}&limit=1&offset=${random}` ).then(ress => ress.json())
    .then(json => res.status(200).send(`<html> <head><style> h1 {text-align: center;} iframe {text-align:center; width:100%;}</style></head><body><h1> ${answer} </h1> <iframe src="${json.data[0].embed_url}" width="500" height="500" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></body></html>`));
    
    // res.status(200).send();
})

app.use('/', router);



app.listen(3000, () => {console.log("Server is up.")})
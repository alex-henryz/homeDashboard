const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const sprintf = require('sprintf-js').sprintf
const axios = require('axios');
const { Pool } = require ('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'admin',
  port: 5432,
})

const MYID = "76561198035272382"
const STEAMURL = 'http://api.steampowered.com/IPlayerService/%3$s/v0001/?key=%1$s&steamid=%2$s'
const GAMEURL = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0001/?key=%1$s&appid=%2$s'
const IMAGEURL = 'https://steamcdn-a.akamaihd.net/steam/apps/%s/header.jpg'
var apiData = require('./apiconfig.json')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//POSTGRES DATABASE ROUTES

app.get('/api/getTodoData'), (req, res) => {
  pool.query('SELECT * FROM todo', (error, result) => {
    if (error){
      throw error
    }
    console.log(result.rows)
    res.send("hello")
  })
}



//STEAM API ROUTES
app.get('/api/getOwnedGames', (req, res) => {
  let url = sprintf(STEAMURL, apiData.steam.key, MYID, 'GetOwnedGames')
  axios.get(url)
  .then(data => {
    res.send(JSON.stringify(data.data.response))
  })
  .catch(error => res.send(error));
});

app.get('/api/getPlayedTime', (req, res) => {
  res.setHeader('Content-Type', 'application/json', )
  let url = sprintf(STEAMURL, apiData.steam.key, MYID, 'GetRecentlyPlayedGames')
  axios.get(url)
  .then(data => res.send(JSON.stringify(data.data.response.games)))
  .catch(error => res.send(error))
});

app.get('/api/getGameImage', (req, res) => {
  const appid = req.query.appid || "4000";
  let url = sprintf(IMAGEURL, appid)
})

app.get('/api/getTotalPlaytime', (req, res) =>{
  let url = sprintf(STEAMURL, apiData.steam.key, MYID, 'GetRecentlyPlayedGames')
  axios.get(url)
  .then(data =>{
    console.log(data.data.response)
    var i, total;
    for(i=0, total=0; i < data.data.response.games.length; i++){
      total += data.data.response.games[i].playtime_2weeks/60
    }
    res.send(JSON.stringify(total))
  })
  .catch(error => res.send(error))
})

app.get('/api/getGameTitle', (req, res) => {
  const appid = req.query.appid || "218620";
  let url = sprintf(GAMEURL, apiData.steam.key, appid)
  axios.get(url)
  .then(data =>{
    res.send(JSON.stringify(data.data.game.gameName))
  })
  .catch(error => res.send(error))
});

app.listen(3001, () =>
  console.log('Server is running on localhost:3001')
);
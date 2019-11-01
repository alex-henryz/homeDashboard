const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const sprintf = require('sprintf-js').sprintf
const axios = require('axios')


const MYID = "76561198035272382"
const STEAMURL = 'http://api.steampowered.com/IPlayerService/%3$s/v0001/?key=%1$s&steamid=%2$s'
const GAMEURL = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0001/?key=%1$s&appid=%2$s'
const IMAGEURL = 'https://steamcdn-a.akamaihd.net/steam/apps/%s/header.jpg'
var apiData = require('./apiconfig.json')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/getOwnedGames', (req, res) => {
  let url = sprintf(STEAMURL, apiData.steam.key, MYID, 'GetOwnedGames')
  axios.get(url)
  .then(data => {
    res.send(JSON.stringify(data.data.response))
  })
  .catch(error => res.send(error));
});

app.get('/api/getPlayedTime', (req, res) => {
  let url = sprintf(STEAMURL, apiData.steam.key, MYID, 'GetRecentlyPlayedGames')
  axios.get(url)
  .then(data => res.send(JSON.stringify(data.data.response.games)))
  .catch(error => res.send(error))
});

app.get('/api/getGameImage', (req, res) => {
  const appid = req.query.appid || "4000";
  let url = sprintf(IMAGEURL, appid)
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
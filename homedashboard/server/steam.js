var axios = require('axios')
var apiData = require('./apiconfig.json')
var sprintf = require('sprintf-js').sprintf

const STEAMURL = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=%1$s&steamid=%2$s&format=json'


function getPwnedGames(id){

}

function getOwnedGames(id){
    return(sprintf(STEAMURL, apiData.steam.key, id))
}

console.log(getOwnedGames("hello"))
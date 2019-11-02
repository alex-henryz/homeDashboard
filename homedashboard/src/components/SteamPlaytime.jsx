import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'


const styles = {
    body: {
        overflowX: "hidden",
        overflowY: "hidden"
    },

    root: {
        flexGrow: 1,
        marginTop: 4,
        marginLeft: 2,
        width: "vw - 8px"
    },
}

export default class SteamPlaytime extends Component {

    state = {
        games: [],
        images: [],
        gameTime: [],
        totalTime: 0
    }

    componentDidMount(){
        this.getPlaytime()
    }

    getFullData(){
        let games = []
        for(let i=0; i < this.state.gameTime.length; i++){
            let playtime = 0
            if(this.state.gameTime[i].playtime_2weeks >= 60){
                playtime = this.state.gameTime[i].playtime_2weeks / 60
                playtime = Number((playtime).toFixed(1));
                playtime = `${playtime}h`
            }else{
                playtime = this.state.gameTime[i].playtime_2weeks
                playtime = `${playtime}min`
            }
            let img = `https://steamcdn-a.akamaihd.net/steam/apps/${JSON.stringify(this.state.gameTime[i].appid)}/header.jpg`
            games.push({name: this.state.gameTime[i].name, gameTime: playtime, imageUrl: img})
            this.setState({totalTime: Number((this.state.gameTime[i].playtime_2weeks/60).toFixed(1))+this.state.totalTime})
        }
        this.setState({games: games})
    }


    getPlaytime(){
        axios.get("http://localhost:3001/api/getPlayedTime")
        .then(data => {
            this.setState({gameTime: data.data})
            this.getGameBanners(this.state.gameTime)
            this.getFullData()
        })
        .catch(err => console.log(err))
    }



    getGameBanners(arr){
        let imgArr = []
        if(arr.length < 8){
            for(let i=0; i < arr.length; i++){
                imgArr.push(`https://steamcdn-a.akamaihd.net/steam/apps/${JSON.stringify(arr[i].appid)}/header.jpg`)
            }
        }
        this.setState({images: imgArr})
    }

    render() {
        return (
            <div style={styles.body}>
                <h1>Total Time: {this.state.totalTime}h</h1>
                <Grid container spacing={1} style={styles.root} justify="space-between">
                    {this.state.games.map((item, i) => 
                    <Grid item xs={3}>
                        <img key={i} src={item.imageUrl} alt={i}></img>
                        <Typography>{item.name}: {item.gameTime}</Typography>
                    </Grid>)}
                </Grid>
            </div>
        )
    }
}

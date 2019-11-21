import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Typography, Button } from '@material-ui/core'
import PieChart from 'react-minimal-pie-chart'
import randomcolor from 'randomcolor'


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
    PieChart: {
        height: 250
    },
    border: {
        borderWidth: 5
    }
}

export default class SteamPlaytime extends Component {

    state = {
        games: [],
        images: [],
        gameTime: [],
        totalTime: 0,
        pieData: [],
        colors: [],
    }

    componentDidMount(){
        this.getPlaytime()
    }

    getFullData(){
        let games = []
        for(let i=0; i < this.state.gameTime.length; i++){
            let playtime = 0
            let unit = ""
            if(this.state.gameTime[i].playtime_2weeks >= 60){
                playtime = this.state.gameTime[i].playtime_2weeks / 60
                playtime = Number((playtime).toFixed(1));
                unit = "h"
            }else{
                playtime = this.state.gameTime[i].playtime_2weeks
                unit = "min"
            }
            let img = `https://steamcdn-a.akamaihd.net/steam/apps/${JSON.stringify(this.state.gameTime[i].appid)}/header.jpg`
            games.push({name: this.state.gameTime[i].name, gameTime: playtime, imageUrl: img, unit: unit})
            this.setState({totalTime: Number(((this.state.gameTime[i].playtime_2weeks/60)+this.state.totalTime).toFixed(1))})
        }
        this.setState({games: games})
        this.getPieChartData()
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

    getPieChartData(){
        this.setState({colors: randomcolor({count: this.state.games.length, luminosity:'dark'})})
        let pieData = []
        for(let i = 0; i < this.state.games.length; i++){
            let time = 0;
            if(this.state.games[i].unit === "min"){
                time = Math.round(this.state.games[i].gameTime/60 * 100) / 100
            }else{
                time = this.state.games[i].gameTime
            }
            pieData.push({title: this.state.games[i].name, value: time, color: this.state.colors[i]})
        }
        this.setState({pieData: pieData})
    }

    getGameData(s){
        console.log(s)
        console.log(this.state.hovered)
    }

    getGameBanners(arr){
        let imgArr = []
        if(arr.length < 9){
            for(let i=0; i < arr.length; i++){
                imgArr.push(`https://steamcdn-a.akamaihd.net/steam/apps/${JSON.stringify(arr[i].appid)}/header.jpg`)
            }
        }
        this.setState({images: imgArr})
    }

    render() {
        return (
            <div style={styles.body}>
                <h3>Total Time: {this.state.totalTime}h</h3>
                <Button to="/allgames">View All Steam Games</Button>
                <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    cx={50}
                    cy={50}
                    data={this.state.pieData} 
                    radius={50} 
                    style={styles.PieChart}
                    label
                    labelPosition={60}
                    labelStyle={{
                        fontFamily: 'sans-serif',
                        fontSize: '5px'
                    }}
                    lengthAngle={360}
                    lineWidth={20}
                    onClick={undefined}
                    onMouseOut={undefined}
                    onMouseOver={undefined}
                    paddingAngle={18}
                    radius={50}
                    ratio={1}
                    rounded
                    startAngle={0}
                ></PieChart>
                <Grid container spacing={1} style={styles.root} justify="space-between">
                    {this.state.games.map((item, i) => 
                    <Grid item xs={3}>
                        <img key={i} src={item.imageUrl} style={{borderStyle: "solid",borderWidth: 3, borderColor: this.state.colors[i]}} alt={i} onClick={()=>this.getGameData(this.state.games[i])}></img>
                        <Typography>{item.name}: {item.gameTime+item.unit}</Typography>
                    </Grid>)}
                </Grid>
            </div>
        )
    }
}

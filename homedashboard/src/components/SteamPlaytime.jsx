import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Typography, Button } from '@material-ui/core'
import PieChart from 'react-minimal-pie-chart'
import randomcolor from 'randomcolor'


const styles = {
    gridroot: {
        flexGrow: 1,
    },
    griditems: {
        
        marginLeft: 2,
        
    },
    PieChart: {
        height: 250
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
            let mobImg = `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${JSON.stringify(this.state.gameTime[i].appid)}/${this.state.gameTime[i].img_logo_url}.jpg`
            games.push({name: this.state.gameTime[i].name, gameTime: playtime, imageUrl: img, mobileUrl: mobImg, unit: unit})
            this.setState({totalTime: Number(((this.state.gameTime[i].playtime_2weeks/60)+this.state.totalTime).toFixed(1))})
        }
        this.setState({games: games})
        this.getPieChartData()
    }


    getPlaytime(){
        axios.get("http://localhost:3001/api/getPlayedTime")
        .then(data => {
            this.setState({gameTime: data.data})
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

    checkWindowsize(i){
        return(window.innerWidth >= 650 ? this.state.games[i].imageUrl : this.state.games[i].mobileUrl) 
    }

    render() {
        return (
            <div>
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
                    ratio={1}
                    rounded
                    startAngle={0}
                ></PieChart>
                <div style={{width: '100%'}}>
                    <Grid container style={styles.gridroot} spacing={2} alignContent="center" justify="center" wrap={"wrap"}>
                        {this.state.games.map((item, i) => 
                        <Grid container item xs={3} key={i}>
                            <img key={i+"a"} src={item.imageUrl} style={{borderStyle: "solid",borderWidth: 3, borderColor: this.state.colors[i], maxWidth: "85%", margin: 'auto'}} alt={i}></img>
                            <Typography key={i+"b"} style={{margin: 'auto', fontSize: '1vw'}}>{item.name}: {item.gameTime+item.unit}</Typography>
                        </Grid>)}
                    </Grid>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Card, Checkbox } from '@material-ui/core'


const URL = "http://localhost:3001/api/"

const styles = {
    todoCards : {
        marginTop: 4,
    }
}


export default class Todo extends Component {

    state = {
        todoData: [],
        checked: []
    }

    componentDidMount(){
        this.getTodoData()
    }

    todos = () => {
        this.state.todoData.map((item, i) => {
            return(
                <div>
                    <h1 key={i}>{item.title}</h1>
                    <p>{item.description}</p>
                </div>
            );
        })
    }

    isChecked(completed){
        if(completed === "true"){
            return true;
        }else{
            return false;
        }
    }

    getTodoData(){
        let respData = null
        axios.get(URL+"getTodoData")
        .then(resp => {
            respData = resp.data
            this.setState({todoData: respData})
            let checkArr = [];
            for(let i=0; i < this.state.todoData.length; i++){
                checkArr.push(this.isChecked(respData[i].completed))
            }
            this.setState({checked: checkArr})
        })
        .catch(err =>{
            console.log(err)
        })
    }

    updateTodoData(){
        
    }


    checkBox(index){
        if(this.state.checked[index]){
            return(<Checkbox checked={true}></Checkbox>)
        }else{
            return(<Checkbox checked={false}></Checkbox>)
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={1} style={styles.todoCards} justify="center" alignItems="center" alignContent="center">
                    {this.state.todoData.map((item, i) => (
                        <Grid item xs={3} key={i+"a"}>
                            <Card>
                                <div key={i}>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                    {this.checkBox(i)}
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}

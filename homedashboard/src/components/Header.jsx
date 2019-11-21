import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const styles = {
    root: {
        "flexGrow": 1
    },
    title: {
        "flexGrow": 1
    },
    drawer: {
        width: 250
    }
}

export default class Header extends Component {
    state = {
        menuOpen: false,
        links: [{name:"Home", icon: "", route: "/"}, {name: "Steam", icon: "", route: "/Steam"}]
    }

    toggleDrawer(bool){
        this.setState({menuOpen: bool });
      };

    render() {
        return (
            <div style={styles.root}>
                <AppBar position="static" isOpen>
                <Drawer open={this.state.menuOpen} onClose={()=> this.toggleDrawer(false)}>
                    <List style={styles.drawer}>
                    {this.state.links.map((obj,i) =>
                        <ListItem button component={Link} to={obj.route} key={i} onClick={() =>this.toggleDrawer(false)}>
                            <ListItemText primary={obj.name} />
                        </ListItem>
                    )}
                    </List>
                </Drawer>
                    <Toolbar>
                        <IconButton edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={() => this.toggleDrawer(true)}>
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" style={styles.title}>
                                Dashboard
                            </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

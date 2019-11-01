import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'


const styles = {
    root: {
        "flexGrow": 1
    },
    title: {
        "flexGrow": 1
    }
}

export default class Header extends Component {
    render() {
        return (
            <div style={styles.root}>
                <AppBar position="static" isOpen>
                    <Toolbar>
                        <IconButton edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                                            >
                            <Menu/>
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

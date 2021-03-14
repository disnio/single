import React from 'react'
import {ThemeProvider} from "@material-ui/core";
import {theme} from "./theme";
import Dialog from "./Dialog";


function MainPage() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1>Material UI App</h1>
                <Dialog />
            </div>
        </ThemeProvider>
    );
}

export default MainPage

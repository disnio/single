import { Route, Switch } from "react-router-dom";

import StartPage from "./MuiDefaultPage";
import React from "react";

const Routes = () => (
    <Switch>
        <Route path="/">
            <StartPage />
        </Route>
    </Switch>
);

export default Routes;

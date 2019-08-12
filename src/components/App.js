import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import GamePage from "../pages/game/GamePage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/statistics" component={StatisticsPage} />
        <Route path="/game" component={GamePage} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

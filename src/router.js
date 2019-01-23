import React from "react";
import { Redirect, Route, Switch } from "react-router";
import EditHero from "./pages/heroes/EditHero";
import EditVillain from "./pages/villains/EditVillain";
import Heroes from "./pages/heroes/Heroes";
import Villains from "./pages/villains/Villains";

const Router = () => (
  <Switch>
    <Route path="/heroes" component={Heroes} />
    <Route path="/villains" component={Villains} />
    <Route path="/edit-hero/:id" component={EditHero} />
    <Route path="/edit-villain/:id" component={EditVillain} />
    <Redirect from="/" exact to="/heroes" />
  </Switch>
);

export default Router;

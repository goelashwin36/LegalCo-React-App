// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./components/userComponents/landingPage.jsx";
import AppLayout from "./components/protectedComponents/appLayout.jsx";
import { ProtectedRoute } from "./components/protectedRoute.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


// import Route  from "react-router-dom";
// import BrowserRouter  from "react-router-dom";
// import Switch  from "react-router-dom";
import {Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/app" component={AppLayout} />
        <Route path="*" component={LandingPage} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  rootElement
);

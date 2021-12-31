import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../../pages/home";
import X from "../../pages/_temp";
import Obesenec from "../../pages/Obesenec";
import Pexeso from "../../pages/pexeso";
import Signup from "../../pages/signup";
import Login from "../../pages/login";

function Navigation() {
  return (
    <Router>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/obesenec" class="nav-link">
                Oběšenec
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/pexeso" class="nav-link">
                Pexeso
              </Link>
            </li>
          </ul>
        </div>
        <div class="mx-auto order-0">
          <Link to="/" class="navbar-brand mx-auto">
            WORDGAME
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".dual-collapse2"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link to="/login" class="nav-link">
                Registrovat se
              </Link>
            </li>

            <li class="nav-item active">
              <Link to="/signup" class="nav-link">
                Přihlásit se
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/obesenec">
          <Obesenec />
        </Route>
        <Route exact path="/pexeso">
          <Pexeso />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navigation;

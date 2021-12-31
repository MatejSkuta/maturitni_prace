import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="index.html">
              Oběšenec
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="index.html">
              Pexeso
            </a>
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="index.html">
          WORDGAME
        </a>
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
            <a class="nav-link" href="index.html">
              Registrovat se
            </a>
          </li>

          <li class="nav-item active">
            <a class="nav-link" href="index.html">
              Přihlásit se
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

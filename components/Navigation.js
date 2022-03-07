import React, { useContext } from "react";
import UserContext from "./userContext";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a href="/Obesenec" class="nav-link">
              Oběšenec
            </a>
          </li>
          <li class="nav-item active">
            <a href="/hadani" class="nav-link">
              Hadani
            </a>
          </li>
          <li class="nav-item active">
            <a href="/pexeso" class="nav-link">
              Pexeso
            </a>
          </li>
          <li class="nav-item active">
            <a href="/spojovacka" class="nav-link">
              Spojovačka
            </a>
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <a href="/" class="navbar-brand mx-auto">
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
          <li>
            <span>{user}</span>
          </li>
          {!user ? (
            <li class="nav-item active">
              <a href="/login" class="nav-link">
                Registrovat se
              </a>
            </li>
          ) : (
            <li class="nav-item active">
              <a href="/profil" class="nav-link">
                Profil
              </a>
            </li>
          )}
          {!user ? (
            <li class="nav-item active">
              <a href="/signup" class="nav-link">
                Přihlásit se
              </a>
            </li>
          ) : (
            <li class="nav-item active">
              <a href="/signup" class="nav-link" onClick={() => setUser(null)}>
                Odhlásit se
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

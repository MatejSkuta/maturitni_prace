import React, { useContext, useEffect, useState } from "react";

import UserContext from "./userContext";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
    console.log(user);
  }, [user]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="/Obesenec" className="nav-link">
              Oběšenec
            </a>
          </li>
          <li className="nav-item active">
            <a href="/hadani" className="nav-link">
              Hadani
            </a>
          </li>
          <li className="nav-item active">
            <a href="/pexeso" className="nav-link">
              Pexeso
            </a>
          </li>
          <li className="nav-item active">
            <a href="/spojovacka" className="nav-link">
              Spojovačka
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <a href="/" className="navbar-brand mx-auto">
          WORDGAME
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-collapse2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        {!isloading && (
          <ul className="navbar-nav ml-auto">
            {user && user === "admin@email.cz" && (
              <li className="nav-item active">
                <a href="/administraceUzivatelu" className="nav-link">
                  Administrace uživatelů
                </a>
              </li>
            )}
            {user && user === "admin@email.cz" && (
              <li className="nav-item active">
                <a href="/administraceSlovicek" className="nav-link">
                  Administrace slovíček
                </a>
              </li>
            )}
            {!user ? (
              <li className="nav-item active">
                <a href="/login" className="nav-link">
                  Registrovat se
                </a>
              </li>
            ) : (
              <li className="nav-item active">
                <a href="/profil" className="nav-link">
                  Profil
                </a>
              </li>
            )}
            {!user ? (
              <li className="nav-item active">
                <a href="/signup" className="nav-link">
                  Přihlásit se
                </a>
              </li>
            ) : (
              <li className="nav-item active">
                <a href="/" className="nav-link" onClick={() => setUser(null)}>
                  Odhlásit se
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

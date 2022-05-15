import React, { useContext, useEffect, useState } from "react";

import UserContext from "./userContext";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
  }, [user]);

  return (
    !isloading && (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            WORDGAME
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              {user && (
                <>
                  <li className="nav-item active">
                    <a href="/sibenice" className="nav-link">
                      Oběšenec
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
                  <li className="nav-item active">
                    <a href="/test" className="nav-link">
                      Test
                    </a>
                  </li>
                </>
              )}
              {!user ? (
                <li className="nav-item active ">
                  <a href="/login" className="nav-link">
                    Registrovat se
                  </a>
                </li>
              ) : (
                <li className="nav-item  ">
                  <a href="/profil" className="nav-link">
                    Profil
                  </a>
                </li>
              )}
              {!user ? (
                <li className="nav-item active ">
                  <a href="/signup" className="nav-link">
                    Přihlásit se
                  </a>
                </li>
              ) : (
                <li className="nav-item  ">
                  <a
                    href="/"
                    className="nav-link"
                    onClick={() => setUser(null)}
                  >
                    Odhlásit se
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    )
  );
}

export default Navigation;

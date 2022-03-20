import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import UserContext from "./userContext";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const [isloading, setIsloading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(user === "admin@email.cz");
  const myref = useRef();

  useEffect(() => {
    setIsloading(false);
    /* if (user === "admin@email.cz" && !isloading) {
      setIsAdmin(true);
      myref.current.click();
    }
    console.log(user);
   /// if (user === "admin@email.cz"){return () => {
    //if (user != "admin@email.cz") setIsAdmin(false);*
    setIsAdmin(true);
  };}*/
  }, [user]);

  /*useEffect(() => {
    setIsloading(false);
    if (user === "admin@email.cz" && !isloading) {
      setIsAdmin(true);
      myref.current.click();
    }
    console.log(user);
    /*if (user === "admin@email.cz"){return () => {
    //if (user != "admin@email.cz") setIsAdmin(false);
    setIsAdmin(true);
  };}
  }, [user]);
  useEffect(() => {
    if (user === "admin@email.cz" && !isloading) myref.current.click();
  }, [isAdmin]);
*/
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        {user && (
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
        )}
      </div>
      <div className="mx-auto order-0">
        <a href="/" ref={myref} className="navbar-brand mx-auto">
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
            {isAdmin && (
              <li className="nav-item active">
                <a href="/administraceUzivatelu" className="nav-link">
                  Administrace uživatelů
                </a>
              </li>
            )}
            {console.log(user)}
            {console.log(user === "admin@email.cz")}
            {isAdmin && (
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

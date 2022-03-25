import React, { useState, useContext, useEffect } from "react";
import AdministraceSlovicek from "../components/administraceSlovicek";
import AdministraceUzivatelu from "../components/administraceUzivatelu";
import UserContext from "../components/userContext";
import UserStatistics from "../components/statistics";
import router from "next/router";
const Zkouska = () => {
  const { user, setUser } = useContext(UserContext);
  const [stat, setStat] = useState(null);
  const [users, setUsers] = useState(null);
  const userTable = async () => {
    let url = "/api/uzivatel";
    const params = {
      method: "signup",
      email: user,
    };
    const response = await fetch(
      url + "?" + new URLSearchParams(params).toString(),
      { method: "GET" }
    );
    const json = await response.json();
    setUsers(json.user);
    console.log(typeof json);
    console.log("profil page");
  };
  const statistikaUzivatele = async () => {
    let url = "/api/statistika";
    const params = {
      method: "vypisUzivateleStatistika",
      ID_uzivatel: users.ID_uzivatel,
    };
    const response = await fetch(
      url + "?" + new URLSearchParams(params).toString(),
      { method: "GET" }
    );
    const json = await response.json();
    setStat(json.statistika);
    console.log(json.statistika);
    console.log("profil page");
  };
  useEffect(() => {
    if (user) {
      userTable();
    } else {
      // router.push("/");
    }
  }, []);

  useEffect(() => {
    console.log("userchage");
    console.log(users);
    if (users) statistikaUzivatele();
  }, [users]);

  return (
    <div>
      {users && (
        <div>
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Profil
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Statistika
              </button>
              {user === "admin@email.cz" && (
                <button
                  class="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Administrace Slovíček
                </button>
              )}
              {user === "admin@email.cz" && (
                <button
                  class="nav-link"
                  id="uzivatele"
                  data-bs-toggle="tab"
                  data-bs-target="#uzivatel"
                  type="button"
                  role="tab"
                  aria-controls="uzivatel"
                  aria-selected="false"
                >
                  Administrace Uživatelů
                </button>
              )}
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              {users && (
                <div className="container">
                  <h1>Profil:</h1>
                  <div className="userProfile">
                    <div className="row">
                      <div className="col col-lg-6 profil text-right">
                        Email:
                      </div>
                      <div className="col col-lg-6 profil text-left">
                        {users.email}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col col-lg-6 profil text-right">
                        Uživatelské jméno:
                      </div>
                      <div className="col col-lg-6 profil text-left">
                        {users.nickname}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col col-lg-6 profil text-right">
                        Jméno:
                      </div>
                      <div className="col col-lg-6 profil text-left">
                        {users.jmeno}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col col-lg-6 profil text-right">
                        Příjmení:
                      </div>
                      <div className="col col-lg-6 profil text-left">
                        {users.prijmeni}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col col-lg-6 profil text-right">
                        Datum Registrace:
                      </div>
                      <div className="col col-lg-6 profil text-left">
                        {new Date(users.datum_registrace).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              {stat && <UserStatistics stat={stat} />}
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <AdministraceSlovicek />
            </div>
            <div
              class="tab-pane fade"
              id="uzivatel"
              role="tabpanel"
              aria-labelledby="uzivatele"
            >
              <AdministraceUzivatelu />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Zkouska;

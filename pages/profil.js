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
      router.push("/");
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
                id="profily"
                data-bs-toggle="tab"
                data-bs-target="#profil"
                type="button"
                role="tab"
                aria-controls="profil"
                aria-selected="true"
              >
                Profil
              </button>
              <button
                class="nav-link"
                id="statistiky"
                data-bs-toggle="tab"
                data-bs-target="#statistika"
                type="button"
                role="tab"
                aria-controls="statistika"
                aria-selected="false"
              >
                Statistika
              </button>
              {user === "admin@email.cz" && (
                <button
                  class="nav-link"
                  id="slovicka"
                  data-bs-toggle="tab"
                  data-bs-target="#slovicko"
                  type="button"
                  role="tab"
                  aria-controls="slovicko"
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
          <div class="tab-content ohraniceni" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="profil"
              role="tabpanel"
              aria-labelledby="profily"
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
              id="statistika"
              role="tabpanel"
              aria-labelledby="statistiky"
            >
              {stat && <UserStatistics stat={stat} />}
            </div>
            <div
              class="tab-pane fade"
              id="slovicko"
              role="tabpanel"
              aria-labelledby="slovicka"
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

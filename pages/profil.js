import React, { useState, useContext, useEffect } from "react";
import UserContext from "../components/userContext";
import bcrypt from "bcryptjs/dist/bcrypt";
import router from "next/router";
import Row from "../components/row";

const Profil = () => {
  const { user, setUser } = useContext(UserContext);
  const [stat, setStat] = useState(null);
  const [users, setUsers] = useState(null);
  /*const [email, setEmail] = useState();
  const [jmeno, setJmeno] = useState();
  const [prijmeni, setPrijmeni] = useState();
  const [uzivatelskejmeno, setUzivatelskejmeno] = useState();
  */

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
  /*useEffect(() => {
    userTable();
  }, []);*/

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
          <h1>Profil:</h1>

          <div>
            <p>Email: {users.email}</p>
            <p>Uživatelské jméno: {users.nickname} </p>
            <p>Jméno: {users.jmeno}</p>
            <p>Příjmení: {users.prijmeni}</p>
            <p>
              Datum Registrace:{" "}
              {new Date(users.datum_registrace).toLocaleDateString()}
            </p>
          </div>
          <div>
            {stat && (
              <table>
                <tr>
                  <th>Počet špatně</th>
                  <th>Počet správně</th>
                  <th>Celkový počet</th>
                  <th>Úspěšnost </th>
                  <th>Celkový čas</th>
                  <th>Datum konce</th>
                </tr>
                {stat != null &&
                  stat.map((u) => <Row statistikaData={u}></Row>)}
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;

import React, { useState, useContext, useEffect } from "react";
import UserContext from "../components/userContext";
import bcrypt from "bcryptjs/dist/bcrypt";
import router from "next/router";

const Profil = () => {
  const { user, setUser } = useContext(UserContext);

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
        </div>
      )}
    </div>
  );
};

export default Profil;

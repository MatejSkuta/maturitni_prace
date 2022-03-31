import React, { useContext, useState, useEffect } from "react";
import UserContext from "./userContext";
import Row from "./row";
import router from "next/router";

const AdministraceSlovicek = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [isupdate, setIsupdate] = useState(null);

  const userTable = async () => {
    let url = "/api/uzivatel";
    const response = await fetch(url, { method: "GET" });
    const json = await response.json();
    setUsers(json.data);
    console.log(typeof json);
    console.log(json);
  };
  /*useEffect(() => {
    userTable();
  }, []);*/
  useEffect(() => {
    if (user == "admin@email.cz") {
      userTable();
    } else {
      //router.push("/");
    }
  }, [isupdate]);
  return (
    <div>
      {users && (
        <div class="table-responsive">
          <h1>Uživatelé:</h1>
          <table class="table">
            <tr>
              <th>E-mail</th>
              <th>Uživatelské jméno</th>
              <th>Jméno</th>
              <th>Přijmení</th>
              <th>Datum registrace</th>
              <th>Detail</th>
              <th></th>
            </tr>
            {console.log(users)}
            {users.map((u) => (
              <Row userData={u} setIsupdate={setIsupdate}></Row>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default AdministraceSlovicek;

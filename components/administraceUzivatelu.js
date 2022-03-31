import React, { useContext, useState, useEffect } from "react";
import UserContext from "./userContext";
import Row from "./row";

const AdministraceSlovicek = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [isupdate, setIsupdate] = useState(null);

  const userTable = async () => {
    let url = "/api/uzivatel";
    const response = await fetch(url, { method: "GET" });
    const json = await response.json();
    setUsers(json.data);
  };
  /*useEffect(() => {
    userTable();
  }, []);*/
  useEffect(() => {
    if (user == "admin@email.cz") {
      userTable();
      setIsupdate(false);
    }
  }, [isupdate]);
  return (
    <div>
      {users && (
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th className="border-top-0">E-mail</th>
              <th className="border-top-0">Uživatelské jméno</th>
              <th className="border-top-0">Jméno</th>
              <th className="border-top-0">Přijmení</th>
              <th className="border-top-0">Datum registrace</th>
              <th className="border-top-0">Detail</th>
              <th className="border-top-0"></th>
            </tr>

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

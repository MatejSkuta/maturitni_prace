import React, { useContext, useState, useEffect } from "react";
import UserContext from "../components/userContext";
import Row from "../components/row";
import router from "next/router";

const AdministraceSlovicek = () => {
  const { user, setUser } = useContext(UserContext);
  const [slovicka, setSlovicka] = useState(null);
  const [isupdate, setIsupdate] = useState(null);
  const [issent, setIssent] = useState(null);
  const [isdelete, setIsdelete] = useState(null);
  const [cesky, setCesky] = useState();
  const [preklad, setPreklad] = useState();
  const [volba, setVolba] = useState(1);

  const pridaniSlovicka = async (e) => {
    const response = await fetch("/api/slovicka", {
      method: "POST",
      body: JSON.stringify({
        user: {
          cesky: cesky,
          preklad: preklad,
          ID_jazyka: 1,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setIssent(true);
  };

  const slovickaTable = async () => {
    let url = "/api/slovicka";
    const params = {
      method: "SelectByLanguage",
      ID_jazyka: volba,
    };
    const response = await fetch(
      url + "?" + new URLSearchParams(params).toString(),
      { method: "GET" }
    );
    const json = await response.json();
    setSlovicka(json.slovicka);
    console.log(json.slovicka);
    console.log("profil page");
  };
  /*useEffect(() => {
    userTable();
  }, []);*/
  useEffect(() => {
    if (user == "admin@email.cz") {
      slovickaTable();
      setIsupdate(false);
    } else {
      router.push("/");
    }
  }, [isupdate]);
  useEffect(() => {
    slovickaTable();
  }, [volba]);
  useEffect(() => {
    slovickaTable();
    setIssent(false);
  }, [issent]);
  useEffect(() => {
    slovickaTable();
    setIssent(false);
  }, [isdelete]);

  return (
    <div>
      {slovicka && (
        <div>
          <select
            id="volba"
            value={volba}
            onChange={(e) => {
              if (e.target.value === "1") setVolba(1);
              else if (e.target.value === "2") setVolba(2);
            }}
          >
            <option value="1">Anglické</option>
            <option value="2">Německé</option>
          </select>
          <br></br>
          <label for="fname">Česky:</label>
          <input
            type="text"
            id="fname"
            value={cesky}
            onChange={(e) => {
              setCesky(e.target.value);
            }}
          />
          <label for="lname">Anglicky:</label>
          <input
            type="text"
            id="lname"
            value={preklad}
            onChange={(e) => {
              setPreklad(e.target.value);
            }}
          />
          <input
            type="submit"
            value="Přidat"
            onClick={() => {
              if (cesky != "" || preklad != "") {
                pridaniSlovicka();
                setCesky("");
                setPreklad("");
              }
            }}
          />
          {console.log(volba)}
          <table>
            <tr>
              <th>ID_slovicka</th>
              <th>Česky</th>
              <th>Překlad</th>
              <th>Jazyk</th>
            </tr>
            {console.log(slovicka)}
            {slovicka.map((u) => (
              <Row
                slovickaData={u}
                setIsupdate={setIsupdate}
                volba={volba}
              ></Row>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
export default AdministraceSlovicek;

import React, { useContext, useState, useEffect } from "react";
import UserContext from "./userContext";
import Row from "./row";

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
          ID_jazyka: volba,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

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
  };

  useEffect(() => {
    if (user == "admin@email.cz") {
      slovickaTable();
      setIsupdate(false);
    }
  }, [isupdate]);
  useEffect(() => {
    slovickaTable();
  }, [volba]);
  useEffect(() => {
    slovickaTable();
    setIssent(false);
  }, [issent]);

  return (
    <div>
      {slovicka && (
        <div className="container">
          <select
            id="volba"
            className="custom-select w-25 odsazeni_prvni"
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
            class="form-control input"
            type="text"
            id="fname"
            value={cesky}
            onChange={(e) => {
              setCesky(e.target.value);
            }}
          />
          <label for="lname">Překlad:</label>
          <input
            class="form-control input"
            type="text"
            id="lname"
            value={preklad}
            onChange={(e) => {
              setPreklad(e.target.value);
            }}
          />
          <br></br>
          <button
            className="btn btn-primary odsazeni_tlacitka"
            onClick={() => {
              if (cesky != "" || preklad != "") {
                pridaniSlovicka();
                setCesky("");
                setPreklad("");
              }
            }}
          >
            přidat
          </button>

          <div class="table-responsive">
            <table class="table">
              <tr>
                <th className="border-top-0">Česky</th>
                <th className="border-top-0">Překlad</th>
                <th className="border-top-0">Jazyk</th>
                <th className="border-top-0"></th>
              </tr>

              {slovicka.map((u) => (
                <Row
                  slovickaData={u}
                  setIsupdate={setIsupdate}
                  volba={volba}
                ></Row>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdministraceSlovicek;

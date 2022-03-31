import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../components/userContext";
import router from "next/router";

const Hadani = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState(null);
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
    setData(json.slovicka);
  };
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
  };
  const statistika = async (e) => {
    const response = await fetch("/api/statistika", {
      method: "POST",
      body: JSON.stringify({
        user: {
          pocet_uspechu: vysledekspravne,
          celkovy_pocet: nastavenypocet,
          datum_zacatku: datum,
          datum_konce: new Date().toISOString(),
          ID_uzivatel: users.ID_uzivatel,
          jazyk: volba,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };
  const ref = useRef();
  const [words, setWords] = useState();
  const [trans, setTrans] = useState([]);
  const [data, setData] = useState([]);
  const [slovo, setSlovo] = useState("");
  const [pocet, setPocet] = useState(0);
  const [stav, setStav] = useState(false);
  const [nastavenypocet, setNastavenypocet] = useState(5);
  const [vysledekspravne, setVysledekspravne] = useState(0);
  const [vysledekspatne, setVysledekspatne] = useState(0);
  const [randomslovo, setRandomslovo] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [datum, setDatum] = useState();
  const [volba, setVolba] = useState(1);

  const kontrola = () => {
    if (isTimeout) return;

    if (slovo == words[randomslovo].word) {
      setVysledekspravne(vysledekspravne + 1);
      if (ref.current) ref.current.style.color = "lightgreen";
    } else {
      setVysledekspatne(vysledekspatne + 1);
      if (ref.current) ref.current.style.color = "red";
    }
    setIsTimeout(true);
    setTimeout(() => {
      setRandomslovo(randomslovo + 1);
      if (ref.current) ref.current.style.color = "black";
      setPocet(pocet - 1);
      setIsTimeout(false);
      if (pocet === 1) {
        setStav(true);
      }
    }, 2000);
  };
  useEffect(() => {
    if (user) {
      slovickaTable();
      userTable();
    } else {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    slovickaTable();
  }, [volba]);

  useEffect(() => {
    if (stav) statistika();
  }, [stav]);
  const generateWords = (nastavenypocet) => {
    const selected = data
      .sort(() => Math.random() - 0.5)
      .slice(0, nastavenypocet);

    setWords(
      selected.map((x) => ({
        id: x.ID_slovicka,
        word: x.cesky,
      }))
    );
    setTrans(selected.map((x) => ({ id: x.ID_slovicka, word: x.preklad })));
    setRandomslovo(0);
  };

  return (
    <div>
      {stav === false && pocet === 0 && (
        <div className="m-3">
          <select
            id="volba"
            className="custom-select w-25"
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
          <label>Nastavte počet pokusů min(5) </label>
          <input
            className="form-control input"
            type="number"
            name="pocet"
            value={nastavenypocet}
            onChange={(e) => {
              if (e.target.value > data.length) {
                setNastavenypocet(data.length);
              } else if (e.target.value < 5) {
                setNastavenypocet(5);
              } else {
                setNastavenypocet(e.target.value);
              }
            }}
          />
          <br></br>
          <button
            className="btn btn-success "
            onClick={() => {
              setVysledekspatne(0);
              setVysledekspravne(0);
              setPocet(nastavenypocet);
              generateWords(nastavenypocet);
              setDatum(new Date().toISOString());
            }}
          >
            Začít hru
          </button>
          <hr></hr>
          <div>
            <h2>Test</h2>
            Tato hra bude zkoušet naše znalosti z předešlých her. Opět bude
            možnost si jí vyzkoušet jak v angličtině tak i v němčině. Uživatel
            si před začátkem hry zvolí jazyk a počet slov ze kterých se chce
            testovat. Minimální počet je 5 slovíček a maximální počet je počet
            všech slovíček z databáze. V této hře se budou generovat cizí
            slovíčka a uživatel bude psát jejich překlad bez jakékoliv nápovědy.
            Pokud slovíčko uhodne , tak se barva slovíčka změní na zelenou.
            Pokud neuhodne ,tak se barva změní na červenou. Slovíčko je obarvené
            po určitou dobu a pak se vygeneruje nové se základní černou barvou.
            Z tohoto testu už uživatel ve svém profilu nalezne statistiky. Tyto
            statistiky bude mít možnost vidět i administrátor.<br></br>
            <img src={"./obrazky/obrazek_test.PNG"} />
          </div>
        </div>
      )}
      {trans[randomslovo] && <p ref={ref}>{trans[randomslovo].word}</p>}
      {pocet != 0 && (
        <div>
          <input
            className="form-control input"
            type="text"
            name="slovo"
            value={slovo}
            onChange={(e) => {
              setSlovo(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                kontrola();
                setSlovo("");
              }
            }}
          />
          <br></br>
          <button
            className="btn btn-primary"
            onClick={() => {
              kontrola();
              setSlovo("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                kontrola();
                setSlovo("");
              }
            }}
          >
            Click
          </button>
        </div>
      )}
      {stav === true && (
        <div>
          <p>Počet správných: {vysledekspravne}</p>
          <p>Počet špatných: {vysledekspatne}</p>
          <input
            className="btn btn-success"
            type="button"
            value="nová hra"
            onClick={() => {
              setStav(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Hadani;

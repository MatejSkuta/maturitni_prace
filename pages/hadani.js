import React, { useState, useEffect, useContext } from "react";
import UserContext from "../components/userContext";
/*const data = [
  {
    id: 1,
    word: "auto",
    trans: "car",
  },
  {
    id: 2,
    word: "tričko",
    trans: "T-shirt",
  },
  {
    id: 3,
    word: "slunce",
    trans: "sun",
  },
  {
    id: 4,
    word: "kůže",
    trans: "skin",
  },

  {
    id: 5,
    word: "kalhoty",
    trans: "trousers",
  },
  {
    id: 6,
    word: "brýle",
    trans: "glasses",
  },
  {
    id: 7,
    word: "hodinky",
    trans: "watch",
  },
  {
    id: 8,
    word: "hlava",
    trans: "head",
  },
];*/

const Hadani = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const slovickaTable = async () => {
    let url = "/api/slovicka";
    const params = {
      method: "SelectByLanguage",
      ID_jazyka: 1,
    };
    const response = await fetch(
      url + "?" + new URLSearchParams(params).toString(),
      { method: "GET" }
    );
    const json = await response.json();
    setData(json.slovicka);
    console.log(json.slovicka);
    console.log("profil page");
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
    console.log(typeof json);
    console.log("profil page");
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
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const [words, setWords] = useState();
  const [trans, setTrans] = useState();
  const [data, setData] = useState([]);
  const [slovo, setSlovo] = useState("");
  const [pocet, setPocet] = useState(0);
  const [stav, setStav] = useState(false);
  const [nastavenypocet, setNastavenypocet] = useState(0);
  const [vysledekspravne, setVysledekspravne] = useState(0);
  const [vysledekspatne, setVysledekspatne] = useState(0);
  const [randomslovo, setRandomslovo] = useState(0);
  const [datum, setDatum] = useState();

  const kontrola = () => {
    //console.log(slovo + " == " + words[randomslovo].word);
    if (slovo == words[randomslovo].word) {
      setVysledekspravne(vysledekspravne + 1);
    } else {
      setVysledekspatne(vysledekspatne + 1);
    }
    setRandomslovo(randomslovo + 1);
    setPocet(pocet - 1);
    if (pocet === 1) {
      setStav(true);
    }
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
    if (stav) statistika();
  }, [stav]);
  const generateWords = (nastavenypocet) => {
    const selected = data
      .sort(() => Math.random() - 0.5)
      .slice(0, nastavenypocet);

    console.log(selected);
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
        <div>
          <label>Nastavte počet pokusů min(5) </label>
          <input
            type="number"
            name="pocet"
            value={nastavenypocet}
            onChange={(e) => {
              console.log(data.length);
              if (e.target.value > data.length) {
                setNastavenypocet(data.length);
                console.log(nastavenypocet);
              } else if (e.target.value < 5) {
                setNastavenypocet(5);
              } else {
                setNastavenypocet(e.target.value);
              }
            }}
          />
          <button
            onClick={() => {
              setVysledekspatne(0);
              setVysledekspravne(0);
              setPocet(nastavenypocet);
              generateWords(nastavenypocet);
              setDatum(new Date().toISOString());
            }}
          >
            Click
          </button>
        </div>
      )}
      {pocet != 0 && <p>{trans[randomslovo].word}</p>}
      {pocet != 0 && (
        <div>
          <input
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
          <button
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

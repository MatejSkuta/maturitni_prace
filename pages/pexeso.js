import React, { useState, useEffect, useContext } from "react";
import Karticka from "../components/karticka";
import UserContext from "../components/userContext";
import router from "next/router";

const Pexeso = () => {
  const { user, setUser } = useContext(UserContext);
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
    setData(json.slovicka.sort(() => Math.random() - 0.5).slice(0, 8));
    console.log(json.slovicka);
    console.log("profil page");
  };
  const [data, setData] = useState([]);
  const [trans, setTrans] = useState();
  const [words, setWords] = useState();
  const [inGame, setInGame] = useState(false);
  const [volba, setVolba] = useState(1);
  const [wordlist, setWordlist] = useState([]);
  const [arrayvisibles, setArrayvisibles] = useState(
    Array.from(Array(16)).map(() => false)
  );
  const resetvisibility = () => {
    let array = [...arrayvisibles];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) array[i] = false;
    }
    setArrayvisibles(array);
  };
  const handleClick = (index) => {
    let counter = 0;
    let firstindex = -1;
    for (let i = 0; i < arrayvisibles.length; i++) {
      if (arrayvisibles[i]) {
        counter++;
        firstindex = i;
      }
    }
    if (counter < 2) {
      let kopie = [...arrayvisibles];
      if (kopie[index] != null) kopie[index] = true;
      if (firstindex == index) {
        counter = 0;
      }
      setArrayvisibles(kopie);
    }
    if (counter == 1) {
      //TODO(porovnávání)
      if (wordlist[index].id == wordlist[firstindex].id) {
        let kopie = [...arrayvisibles];
        kopie[index] = null;
        kopie[firstindex] = null;
        setArrayvisibles(kopie);
      } else setTimeout(() => resetvisibility(), 2000);
    }
  };
  const Restart = () => {
    setArrayvisibles(arrayvisibles.map(() => false));
    slovickaTable();
  };
  useEffect(() => {
    if (user) {
      slovickaTable();
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setWords(data.map((x) => ({ id: x.ID_slovicka, word: x.cesky })));
    setTrans(data.map((x) => ({ id: x.ID_slovicka, word: x.preklad })));
    /*setSlovicka(data.map((x) => x.preklad));
      console.log(slovicka);*/
  }, [data]);
  useEffect(() => {
    if (words) {
      console.log(data);
      console.log(words);
      console.log(trans);
      setWordlist(words.concat(trans).sort(() => 0.5 - Math.random()));
    }
  }, [words]);
  useEffect(() => {
    slovickaTable();
  }, [volba]);
  return (
    <div>
      {!inGame && (
        <div>
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
          <button
            className="btn btn-success"
            onClick={() => {
              setInGame(true);
            }}
          >
            Začít hru
          </button>
          <div>
            <hr></hr>
            <h2>Pexeso</h2>
            Tuto hru je možné si zahrát jak v angličtině tak i v němčině.
            Princip této hry je velmi prostý. Najít dvojice slovíček(české a
            překlad).Ve hře máme 16 kartiček, což znamená 8 dvojic. Jeden tah
            této hry znamená otočit 2 kartičky.Při otočených kartičkách se na
            obrazovce změní tyto dvě kartičky z červené na zelenou. Pokud
            dvojici trefíme, tak obě kartičky zešednou a už s nimi nemůžeme
            nijak pracovat. Pokud slovíčka netrefí, tak tak se po určitém
            časovém intervalu kartičky otočí zpět. Tato hra bude taktéž jako
            oběšenec především pro naučení a procvičování slovíček, které jsou
            ve slovníku.
            <img src={"./obrazky/obrazek_pexeso.PNG"} />
          </div>
        </div>
      )}
      {inGame && (
        <div id="content">
          {Array.from(Array(4)).map((y, i) => {
            return (
              <div>
                {wordlist.slice(i * 4, i * 4 + 4).map((x, j) => (
                  <Karticka
                    visible={
                      arrayvisibles[i * 4 + j] == null
                        ? true
                        : arrayvisibles[i * 4 + j]
                    }
                    Myclass={
                      arrayvisibles[i * 4 + j] == null ? " uhodnuta" : ""
                    }
                    onClick={(e) => handleClick(i * 4 + j)}
                    word={x.word}
                  />
                ))}
              </div>
            );
          })}
          {arrayvisibles.every((x) => x === null) && (
            <button
              className="btn btn-success"
              onClick={() => {
                Restart();
                setInGame(false);
              }}
            >
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Pexeso;

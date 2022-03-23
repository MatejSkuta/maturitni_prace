import SpojovackaSlovo from "../components/spojovacka_slovo.js";
import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../components/userContext";
import router from "next/router";

const Spojovacka = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const ref = useRef();
  const [shuffle, setShuffle] = useState();
  //console.log(shuffle.length);
  const [words, setWords] = useState();
  const [trans, setTrans] = useState();
  console.log(shuffle);
  //console.log(trans);
  const [selected_value, setSelected_value] = useState();
  const [dobre, setDobre] = useState(0);
  const [spatne, setSpatne] = useState(0);
  const [stav, setStav] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [volba, setVolba] = useState(1);
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
    console.log(json.slovicka);
    console.log("profil page");
  };
  const correct = (index, value) => {
    let kopie = [...selected_value];
    kopie[index] = value;
    setSelected_value(kopie);
  };
  useEffect(() => {
    if (data) setShuffle(data.sort(() => 0.5 - Math.random()).slice(0, 4));
  }, [data]);
  useEffect(() => {
    slovickaTable();
  }, [volba]);
  useEffect(() => {
    if (shuffle) {
      setWords(
        shuffle
          .map((x) => ({ id: x.ID_slovicka, word: x.cesky }))
          .sort(() => 0.5 - Math.random())
      );
      setTrans(shuffle.map((x) => ({ id: x.ID_slovicka, word: x.preklad })));
    }
  }, [shuffle]);
  useEffect(() => {
    if (words)
      setSelected_value(Array.from(Array(words.length)).map(() => undefined));
  }, [words]);

  useEffect(() => {
    if (user) {
      slovickaTable();
    } else {
      router.push("/");
    }
  }, []);
  return (
    <div>
      {inGame === false && (
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
            className="btn btn-primary"
            onClick={() => {
              setInGame(true);
            }}
          >
            Start
          </button>
        </div>
      )}
      {inGame && (
        <div>
          {trans &&
            trans.map((y, i) => {
              return (
                <div>
                  {y.word}
                  <SpojovackaSlovo
                    stav={stav}
                    wordlist={words}
                    trans={y.word}
                    word={shuffle[i].cesky}
                    onChange={(value) => correct(i, value)}
                    isCorrect={selected_value[i]}
                  />
                  {console.log(selected_value)}
                </div>
              );
            })}
          <br></br>
          {stav === false && (
            <input
              type="submit"
              value="Odeslat"
              className="btn btn-primary"
              ref={ref}
              onClick={() => {
                let pocet_undefined = 0;
                for (let j = 0; j < selected_value.length; j++) {
                  if (selected_value[j] === undefined) pocet_undefined++;
                }
                if (pocet_undefined === 0) {
                  setStav(true);
                  let kopie_spatne = [];
                  let kopie_dobre = [];
                  console.log(kopie_dobre);
                  console.log(kopie_spatne);
                  for (let i = 0; i < words.length; i++) {
                    if (selected_value[i] === true) {
                      kopie_dobre.push(i);
                      {
                        if (ref.current) ref.current.style.color = "lightgreen";
                      }
                    } else {
                      kopie_spatne.push(i);
                      if (ref.current) ref.current.style.color = "red";
                    }
                  }

                  setDobre(kopie_dobre.length);
                  setSpatne(kopie_spatne.length);
                }
              }}
            />
          )}
          {stav && (
            <div>
              <input
                className="btn btn-success"
                type="submit"
                value="nová hra"
                onClick={() => {
                  setStav(false);
                  setDobre(0);

                  setSpatne(0);
                  setSelected_value(
                    Array.from(Array(words.length)).map(() => undefined)
                  );
                  setShuffle(data.sort(() => 0.5 - Math.random()).slice(0, 4));
                  setWords(
                    shuffle
                      .map((x) => ({ id: x.ID_slovicka, word: x.cesky }))
                      .sort(() => 0.5 - Math.random())
                  );
                  setTrans(
                    shuffle.map((x) => ({ id: x.ID_slovicka, word: x.preklad }))
                  );
                  setInGame(false);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Spojovacka;

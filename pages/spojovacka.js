import SpojovackaSlovo from "../components/spojovacka_slovo.js";
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
const Spojovacka = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
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
  const correct = (index, value) => {
    let kopie = [...selected_value];
    kopie[index] = value;
    setSelected_value(kopie);
  };
  useEffect(() => {
    if (data) setShuffle(data.sort(() => 0.5 - Math.random()).slice(0, 4));
  }, [data]);
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
    }
  }, []);
  return (
    <div>
      {stav === false && (
        <div>
          {trans &&
            trans.map((y, i) => {
              return (
                <div>
                  {y.word}
                  <SpojovackaSlovo
                    wordlist={words}
                    trans={y.word}
                    word={shuffle[i].cesky}
                    onChange={(value) => correct(i, value)}
                  />
                  {console.log(selected_value)}
                </div>
              );
            })}
          <br></br>
          <input
            type="submit"
            value="Odeslat"
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
                  if (selected_value[i] === true) kopie_dobre.push(i);
                  else kopie_spatne.push(i);
                }
                setDobre(kopie_dobre.length);
                setSpatne(kopie_spatne.length);
              }
            }}
          />
        </div>
      )}
      {stav === true && (
        <div>
          <p>počet správných: {dobre}</p>
          <p>počet špatných: {spatne}</p>
          <input
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
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Spojovacka;

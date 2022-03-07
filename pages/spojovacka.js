import React, { useState, useEffect } from "react";
import SpojovackaSlovo from "../components/spojovacka_slovo.js";
const data = [
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
];
const Spojovacka = () => {
  const [shuffle, setShuffle] = useState(
    data.sort(() => 0.5 - Math.random()).slice(4)
  );
  const slovicka = shuffle.map((x) => x.trans);
  const [randomslovo, setRandomslovo] = useState(
    slovicka[Math.floor(Math.random() * slovicka.length)]
  );
  console.log(shuffle.length);
  const [words, setWords] = useState(
    shuffle
      .map((x) => ({ id: x.id, word: x.word }))
      .sort(() => 0.5 - Math.random())
  );
  const trans = shuffle.map((x) => ({ id: x.id, word: x.trans }));
  console.log(words);
  console.log(trans);
  const [selected_value, setSelected_value] = useState(
    Array.from(Array(words.length)).map(() => undefined)
  );
  const [dobre, setDobre] = useState(0);
  const [spatne, setSpatne] = useState(0);
  const [stav, setStav] = useState(false);

  const correct = (index, value) => {
    let kopie = [...selected_value];
    kopie[index] = value;
    setSelected_value(kopie);
  };
  return (
    <div>
      {stav === false && (
        <div>
          {trans.map((y, i) => {
            return (
              <div>
                {y.word}
                <SpojovackaSlovo
                  wordlist={words}
                  trans={y.word}
                  word={shuffle[i].word}
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
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Spojovacka;

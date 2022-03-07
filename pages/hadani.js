import React, { useState, useEffect } from "react";

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
const Hadani = () => {
  const words = data.map((x) => ({ id: x.id, word: x.word }));
  const trans = data.map((x) => ({ id: x.id, word: x.trans }));
  const [wordlist, setWordlist] = useState(words.concat(trans));
  const slovicka = data.map((x) => x.trans);
  const [slovo, setSlovo] = useState("");
  const [pocet, setPocet] = useState(0);
  const [stav, setStav] = useState(false);
  const [nastavenypocet, setNastavenypocet] = useState(0);
  const [vysledekspravne, setVysledekspravne] = useState(0);
  const [vysledekspatne, setVysledekspatne] = useState(0);
  const [randomslovo, setRandomslovo] = useState(
    slovicka[Math.floor(Math.random() * slovicka.length)]
  );

  const getrandomword = () => {
    return slovicka[Math.floor(Math.random() * slovicka.length)];
  };
  const kontrola = () => {
    console.log(wordlist);
    let pole = [];
    let index_1 = "";
    let index_2 = "";
    for (let i = 0; i < wordlist.length; i++) {
      if (slovo == wordlist[i].word) index_1 = i;
      if (index_1 != "" && randomslovo == wordlist[i].word) {
        index_2 = i;
        if (wordlist[index_1].id == wordlist[index_2].id) pole.push(i);
        index_1 = "";
        index_2 = "";
      }
    }

    if (pole.length > 0) {
      setVysledekspravne(vysledekspravne + 1);
      setPocet(pocet - 1);
      pole = [];
      setRandomslovo(getrandomword);
      if (pocet === 1) setStav(true);
    } else {
      setRandomslovo(getrandomword);
      setVysledekspatne(vysledekspatne + 1);
      setPocet(pocet - 1);
      if (pocet === 1) setStav(true);
    }
  };

  return (
    <div>
      {stav === false && pocet === 0 && (
        <form>
          <label>Nastavte počet pokusů </label>
          <input
            type="number"
            name="pocet"
            value={nastavenypocet}
            onChange={(e) => {
              setNastavenypocet(e.target.value);
            }}
          />
          <input
            type="button"
            value="click"
            onClick={(e) => {
              setVysledekspatne(0);
              setVysledekspravne(0);
              setPocet(nastavenypocet);
            }}
          />
        </form>
      )}
      {pocet != 0 && <p>{randomslovo}</p>}
      {pocet != 0 && (
        <form method="post">
          <input
            type="text"
            name="slovo"
            value={slovo}
            onChange={(e) => {
              setSlovo(e.target.value);
            }}
          />
          <input
            type="button"
            value="click"
            onClick={() => {
              kontrola();
              setSlovo("");
            }}
          />
        </form>
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

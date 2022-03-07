import React, { useState, useEffect } from "react";
import Karticka from "../components/karticka";
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
const Pexeso = () => {
  const words = data.map((x) => ({ id: x.id, word: x.word }));
  const trans = data.map((x) => ({ id: x.id, word: x.trans }));
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
  useEffect(() => {
    setWordlist(words.concat(trans).sort(() => 0.5 - Math.random()));
  }, []);
  return (
    <div>
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
                  Myclass={arrayvisibles[i * 4 + j] == null ? " uhodnuta" : ""}
                  onClick={(e) => handleClick(i * 4 + j)}
                  word={x.word}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pexeso;

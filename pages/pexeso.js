import React, { useState, useEffect, useContext } from "react";
import Karticka from "../components/karticka";
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
const Pexeso = () => {
  const { user, setUser } = useContext(UserContext);
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
    setData(json.slovicka.sort(() => Math.random() - 0.5).slice(0, 8));
    console.log(json.slovicka);
    console.log("profil page");
  };
  const [data, setData] = useState([]);
  const [trans, setTrans] = useState();
  const [words, setWords] = useState();
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
        {arrayvisibles.every((x) => x === null) && (
          <button
            onClick={() => {
              Restart();
            }}
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default Pexeso;

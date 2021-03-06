import SpojovackaSlovo from "../components/spojovacka_slovo.js";
import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../components/userContext";
import router from "next/router";

const Spojovacka = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const ref = useRef();
  const [shuffle, setShuffle] = useState();

  const [words, setWords] = useState();
  const [trans, setTrans] = useState();

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
            <option value="1">Anglick??</option>
            <option value="2">N??meck??</option>
          </select>
          <button
            className="btn btn-success ml-1"
            onClick={() => {
              setInGame(true);
            }}
          >
            Za????t hru
          </button>
          <hr></hr>
          <div>
            <h2>Spojov??n?? odpov??daj??c??ch se slov</h2>
            Zde jak u?? je z n??zvu vypov??daj??c??, tak ??kolem bude spojit sob??
            odpov??daj??c?? slov????ka. Tato hra bude tak?? mo??no hr??t bu?? v
            angli??tin?? nebo v n??m??in??. Budou zobrazeny ??ty??i ciz?? slov????ka a pod
            ka??d??m z nich bude na v??b??r z t??ch sam??ch slov????ek akor??t
            p??elo??en??ch do ??e??tiny. Po vypln??n?? ka??d?? dvojice slov????ka ode??leme
            ke kontrole. V p????pad??, ??e slov????ko spoj??me se sv??m ??esk??m p??ekladem
            spr??vn??, tak se zbarv?? zelen??. V p????pad??, ??e slov????ko nespoj??me se
            sv??m ??esk??m p??ekladem spr??vn??, tak se zbarv?? ??erven??. Tato hra bude
            u?? na vy?????? ??rovni, kde to bude takov?? p????prava na test.
            <img src={"./obrazky/obrazek_spojovacka.PNG"} />
          </div>
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
                value="nov?? hra"
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

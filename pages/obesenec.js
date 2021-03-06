import React, { useContext, useState, useEffect } from "react";
import UserContext from "../components/userContext";
import router from "next/router";

const Obesenec = () => {
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
    setData(json.slovicka);
  };

  const [pocet, setPocet] = useState(0);
  //const [slovo, setSlovo] = useState("");
  const [konecne_slovo, setKonecneslovo] = useState("");
  const [data, setData] = useState(null);
  const [spravne, setSpravne] = useState(0);
  const [misto, setMisto] = useState([]);
  const [b, setB] = useState();
  const alpha = Array.from(Array(26)).map((x, i) => i + 65);
  const reset = () => {
    setPocet(0);
    setSpravne(0);
    setKonecneslovo("");
    setB("");
  };
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const [slovicka, setSlovicka] = useState();
  const [words, setWords] = useState();
  const [trans, setTrans] = useState();

  useEffect(() => {
    if (user) {
      slovickaTable();
    } else {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (data) {
      setWords(
        data.map((x) => ({
          id: x.ID_slovicka,
          word: x.cesky,
        }))
      );
      setTrans(data.map((x) => ({ id: x.ID_slovicka, word: x.preklad })));
      setSlovicka(data.map((x) => x.preklad));
    }
  }, [data]);
  return (
    <div>
      {konecne_slovo.length != 0 && (
        <img
          src={"./obrazky/stad_" + pocet + ".png"}
          alt=""
          width="200"
          height="200"
        />
      )}

      <div>
        {konecne_slovo != "" &&
          spravne != konecne_slovo.length - 1 &&
          pocet < 10 &&
          alphabet.map((x) => {
            return (
              <button
                className="btn btn-lg btn-info m-1"
                value={x}
                onClick={(x) => {
                  let pole = [];
                  let mistocopy = [...misto];
                  for (let i = 1; i < konecne_slovo.length; i++) {
                    if (x.target.value == konecne_slovo[i]) {
                      if (mistocopy[i] == "_") {
                        pole.push(i);
                        mistocopy[i] = x.target.value;
                      }
                    }
                  }
                  setSpravne(spravne + pole.length);
                  setMisto(mistocopy);
                  if (pole.length === 0 && pocet < 10) {
                    setPocet(pocet + 1);
                  }
                }}
              >
                {x}
              </button>
            );
          })}
      </div>

      {konecne_slovo.length == 0 && (
        <div>
          <input
            className="btn btn-lg btn-success m-3"
            type="button"
            value="Za????t hru"
            onClick={() => {
              let slovo =
                slovicka[
                  Math.floor(Math.random() * slovicka.length)
                ].toUpperCase();
              setKonecneslovo(slovo);
              setMisto(
                Array.from(Array(slovo.length)).map((x, i) => {
                  if (i == 0) return slovo[0];
                  else return "_";
                })
              );
              //setVysledek("");
            }}
          />
          <hr></hr>
          <h2>Ob????enec</h2>V t??to h??e si zahrajete zn??mou hru ob????enec nebo-li
          ??ibenice.Hra je pouze v angli??tin??. Zde je ??kolem uhodnout slovo d????v
          ne?? se na obrazovku vykresl?? ob????en?? pan????ek.Na obrazovce se vykresl??
          slov????ko, kter?? mus?? u??ivatel uhodnout.Akor??t ??e m??sto p??smen jsou
          pr??zdn?? m??sta,teda krom?? prvn??ho p??smena , kter?? slou???? jako mal??
          n??pov??da V p????pad?? ??e by si n??kdo nev??d??l se slov????kem rady, tak si
          m????e zobrazit n??pov??du, kter?? mu zobraz?? ??esk?? p??eklad slov????ka, kter??
          h??d??. Tato hra je p??edev????m ur??ena k u??en?? nov??ch slov????ek kter?? jsou
          ve slovn??ku
          <img src={"./obrazky/obrazek_obesenec.PNG"} width="700" />
        </div>
      )}
      <div>
        {konecne_slovo.length != 0 &&
          misto.map((x) => <span className="policko">{x}</span>)}
      </div>
      {konecne_slovo != "" &&
        spravne != konecne_slovo.length - 1 &&
        pocet < 10 && (
          <div>
            <button
              className="btn btn-outline-dark"
              value="Hint"
              onClick={() => {
                let a, c;

                for (let i = 0; i < trans.length; i++) {
                  if (konecne_slovo == trans[i].word.toUpperCase()) {
                    a = trans[i].id;
                    for (let j = 0; j < trans.length; j++) {
                      if (a == words[j].id) {
                        c = words[j].word;
                      }
                    }
                  }
                }
                setB(c);
              }}
            >
              Hint
            </button>

            <p>{b}</p>
          </div>
        )}
      {spravne == konecne_slovo.length - 1 && (
        <div>
          <p>Vyhr??l jste!</p>
          <input
            className="btn btn-success"
            type="button"
            value="Nov?? hra"
            onClick={() => reset()}
          />
        </div>
      )}
      {pocet >= 10 && (
        <div>
          <p>Prohr??l jste!</p>
          <input
            className="btn btn-success"
            type="button"
            value="Nov?? hra"
            onClick={() => reset()}
          />
        </div>
      )}
    </div>
  );
};

export default Obesenec;

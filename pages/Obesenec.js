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
    console.log(json.slovicka);
    console.log("profil page");
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
      console.log(slovicka);
    }
  }, [data]);
  return (
    <div>
      <img
        src={"./obrazky/stad_" + pocet + ".png"}
        alt=""
        width="200"
        height="200"
      />

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
        <input
          className="btn btn-primary"
          type="button"
          value="začít hru"
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
            {console.log(b)}
            <p>{b}</p>
          </div>
        )}
      {spravne == konecne_slovo.length - 1 && (
        <div>
          <p>Vyhrál jste!</p>
          <input
            className="btn btn-success"
            type="button"
            value="Nová hra"
            onClick={() => reset()}
          />
        </div>
      )}
      {pocet >= 10 && (
        <div>
          <p>Prohrál jste!</p>
          <input
            className="btn btn-success"
            type="button"
            value="Nová hra"
            onClick={() => reset()}
          />
        </div>
      )}
    </div>
  );
};

export default Obesenec;

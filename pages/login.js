import React, { useState } from "react";
import bcrypt from "bcryptjs/dist/bcrypt";
import router, { useRouter } from "next/router";

const hashPassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, hash, function (err, hashed) {
      if (err) reject(err);
      else resolve(hashed);
    });
  });
};

const Login = ({ hash }) => {
  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [email, setEmail] = useState("");
  const [heslo, setHeslo] = useState("");
  const [uzivatelskejmeno, setUzivatelskejmeno] = useState("");
  const [overenihesla, setOverenihesla] = useState("");
  const [nicknameExist, setNicknameExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [kontolahesel, setKontolahesel] = useState(false);
  const [kontolaformulare, setKontolaformulare] = useState(false);

  const check = async () => {
    let url = "/api/uzivatel";
    const params = {
      method: "check",
      email: email,
      nickname: uzivatelskejmeno,
    };

    const response = await fetch(
      url + "?" + new URLSearchParams(params).toString(),
      { method: "GET" }
    );
    const json = await response.json();

    let check = true;
    if (
      heslo === "" ||
      overenihesla === "" ||
      jmeno === "" ||
      prijmeni === "" ||
      email === "" ||
      uzivatelskejmeno === ""
    ) {
      setKontolaformulare(true);
      check = false;
    }
    if (heslo != overenihesla) {
      setKontolahesel(true);
      check = false;
    } else setKontolahesel(false);

    if (json.emailExist) {
      setEmailExist(true);
      check = false;
    } else setEmailExist(false);
    if (json.nicknameExist) {
      setNicknameExist(true);
      check = false;
    } else setNicknameExist(false);
    return check;
  };

  const handleRegistration = async (e) => {
    if (await check()) {
      const hashed = await hashPassword(heslo, hash);
      const response = await fetch("/api/uzivatel", {
        method: "POST",
        body: JSON.stringify({
          method: "register",
          user: {
            email: email,
            heslo: hashed,
            nickname: uzivatelskejmeno,
            jmeno: jmeno,
            prijmeni: prijmeni,
            datum_registrace: new Date().toISOString(),
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      router.push("/signup");
    }
  };
  return (
    <div>
      <h1>Registrace</h1>
      <form>
        <div className="form-group">
          <input
            type="email"
            className="form-control input"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailExist && <span className="error">Email ji?? existuje</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control input"
            placeholder="u??ivatelsk?? jm??no"
            value={uzivatelskejmeno}
            onChange={(e) => {
              setUzivatelskejmeno(e.target.value);
            }}
          />
          {nicknameExist && (
            <span className="error">U??ivatelsk?? jm??no ji?? existuje</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control input"
            placeholder="jm??no"
            value={jmeno}
            onChange={(e) => {
              setJmeno(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control input"
            placeholder="p????jmen??"
            value={prijmeni}
            onChange={(e) => {
              setPrijmeni(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control input"
            placeholder="heslo"
            value={heslo}
            onChange={(e) => {
              setHeslo(e.target.value);
            }}
          />
          {kontolahesel && (
            <span className="error">Hesla se neshoduj?? !!!</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control input"
            placeholder="ov????en?? hesla"
            value={overenihesla}
            onChange={(e) => {
              setOverenihesla(e.target.value);
            }}
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleRegistration}>
        Registrovat se
      </button>
      <br></br>
      {kontolaformulare && (
        <span className="error">Nen?? vypln??n?? cel?? formul???? !!!</span>
      )}
      <p className="mt-4">
        M??te ji?? ????et? P??ihlaste se zde <a href="signup">p??ihl??sit se</a>
      </p>
    </div>
  );
};

export async function getStaticProps() {
  const hash = process.env.HASH;

  return {
    props: { hash },
  };
}

export default Login;

import React, { useState, useContext } from "react";
import bcrypt from "bcryptjs/dist/bcrypt";
import UserContext from "../components/userContext";
import { set } from "react-hook-form";
import router from "next/router";

const hashPassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, hash, function (err, hashed) {
      if (err) reject(err);
      else resolve(hashed);
    });
  });
};

const Signup = ({ hash }) => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [heslo, setHeslo] = useState();
  const [jmeno, setJmeno] = useState();
  const [prijmeni, setPrijmeni] = useState();
  const [uzivatelskejmeno, setUzivatelskejmeno] = useState();
  const [loginfailed, setLoginfailed] = useState(false);
  const check = async () => {
    let url = "/api/uzivatel";
    const hashed = await hashPassword(heslo, hash);
    const response = await fetch("/api/uzivatel", {
      method: "POST",
      body: JSON.stringify({
        method: "signup",
        user: {
          email: email,
          heslo: hashed,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response.json().then((data) => {
      const u = data.user;

      if (Object.keys(u).length === 0) {
        setLoginfailed(true);
        setJmeno();
        setPrijmeni();
        setUzivatelskejmeno();
      } else {
        setUser(u.email);
        setJmeno(u.jmeno);
        setPrijmeni(u.prijmeni);
        setUzivatelskejmeno(u.nickname);
        setLoginfailed(false);
        router.push("/");
      }
    });
  };

  return (
    <div>
      <h1>Přihlášení:</h1>
      <form>
        <div className="form-group">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="heslo"
            value={heslo}
            onChange={(e) => {
              setHeslo(e.target.value);
            }}
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={check}>
        Přihlásit se
      </button>

      {loginfailed && <p>špatně zadané údaje nebo účet neexistuje</p>}
      <p className="mt-4">
        Nemáte ještě účet? Zaregistrujte se zde{" "}
        <a href="login">zaregistrovat se</a>
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

export default Signup;

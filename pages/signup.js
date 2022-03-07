import React, { useState, useContext } from "react";
import bcrypt from "bcryptjs/dist/bcrypt";
import UserContext from "../components/userContext";

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

  const [email, setEmail] = useState("neco@email.com");
  const [heslo, setHeslo] = useState("123456");
  const [jmeno, setJmeno] = useState();
  const [prijmeni, setPrijmeni] = useState();
  const [uzivatelskejmeno, setUzivatelskejmeno] = useState();
  const [loginfailed, setLoginfailed] = useState(false);
  const check = async () => {
    console.log("volám check");
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
    response.json().then(({ user }) => {
      console.log(user);
      if (Object.keys(user).length === 0) {
        setLoginfailed(true);
        setJmeno();
        setPrijmeni();
        setUzivatelskejmeno();
        console.log(true);
      } else {
        setUser(user.email);
        setJmeno(user.jmeno);
        setPrijmeni(user.prijmeni);
        setUzivatelskejmeno(user.nickname);
        setLoginfailed(false);
      }
    });
  };

  return (
    <div>
      <h1>Přihlášení:</h1>
      <form>
        <div class="form-group">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
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
      <button class="btn btn-primary" onClick={check}>
        Přihlásit se
      </button>
      {loginfailed && <p>špatně zadané údaje</p>}
      {uzivatelskejmeno && <p>uživatelské jméno:{uzivatelskejmeno}</p>}
      {jmeno && <p>Jméno: {jmeno}</p>}
      {prijmeni && <p>Příjmení: {prijmeni}</p>}
    </div>
  );
};

export async function getStaticProps() {
  const hash = process.env.HASH;
  console.log(hash);
  return {
    props: { hash },
  };
}

export default Signup;

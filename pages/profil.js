import React, { useState, useContext, useEffect } from "react";
import UserContext from "../components/userContext";
import bcrypt from "bcryptjs/dist/bcrypt";

const Profil = () => {
  const { user, setUser } = useContext(UserContext);
  const [isloading, setIsloading] = useState(true);
  /*const [email, setEmail] = useState();
  const [jmeno, setJmeno] = useState();
  const [prijmeni, setPrijmeni] = useState();
  const [uzivatelskejmeno, setUzivatelskejmeno] = useState();
  */
  const [datum_registrace, setDatum_registrace] = useState();

  const [stareHeslo, setStareHeslo] = useState();
  const [noveHeslo, setNoveHeslo] = useState();
  const [potvrditHeslo, setPotvrditHeslo] = useState();
  console.log("profil page");
  console.log(user);
  useEffect(() => {
    console.log("userchage");
    setIsloading(false);
  }, [user]);
  return (
    !isloading && (
      <div>
        <h1>Profil:</h1>
        {user && (
          <div>
            <p>Email: {user.email}</p>
            <p>Jméno: {user.jmeno}</p>
            <p>Příjmení: {user.prijmeni}</p>
            <p>Nickname: {user.nickname}</p>
            <p>
              Datum registrace:
              {new Date(user.datum_registrace).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default Profil;

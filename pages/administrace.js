import React, { useContext } from "react";
import UserContext from "../components/userContext";

const Administrace = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <button
        onClick={() => {
          var randomnumber = Math.floor(Math.random() * (100 + 1));
          setUser({ nickname: randomnumber.toString() });
        }}
      >
        {user ? user.nickname : "něco"}
      </button>
    </div>
  );
};

export default Administrace;

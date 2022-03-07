import React, { useState } from "react";

const Karticka = ({ word, onClick, visible, Myclass }) => {
  return visible ? (
    <button
      className={"karticka lic" + Myclass}
      onClick={onClick}
      disabled={Myclass == " uhodnuta"}
    >
      <span className="napis">{word}</span>
    </button>
  ) : (
    <button className="karticka rub" onClick={onClick}>
      <span className="napis">PEXESO</span>
    </button>
  );
};

export default Karticka;

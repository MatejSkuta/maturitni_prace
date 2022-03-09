import React, { useState } from "react";

const SpojovackaSlovo = ({ wordlist, trans, word, onChange }) => {
  console.log(trans);
  console.log(word);
  return (
    <div>
      <select
        name="porovnavacka"
        id={"porovnavacka"}
        onChange={(e) => {
          console.log(word + " == " + e.target.value);
          // console.log(e.target.value);
          if (e.target.value === word) {
            console.log("správně");
            onChange(true);
          } else {
            console.log("spatně");
            onChange(false);
          }
        }}
      >
        <option selected disabled></option>
        {wordlist.map((x) => (
          <option value={x.word}>{x.word}</option>
        ))}
      </select>
    </div>
  );
};

export default SpojovackaSlovo;

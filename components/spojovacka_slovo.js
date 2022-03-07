import React, { useState } from "react";

const SpojovackaSlovo = ({ wordlist, trans, word, onChange }) => {
  return (
    <div>
      <select
        name="porovnavacka"
        id={"porovnavacka"}
        onChange={(e) => {
          if (e.target.value === word) {
            //console.log("správně");
            onChange(true);
          } else {
            // console.log("spatně");
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

import React from "react";

const SpojovackaSlovo = ({
  stav,
  wordlist,
  trans,
  word,
  onChange,
  isCorrect,
}) => {
  let color = null;
  if (isCorrect && stav) color = { color: "lightgreen" };
  else if (isCorrect === false && stav) color = { color: "red" };
  return (
    <div>
      <select
        className="custom-select w-25"
        name="porovnavacka"
        id={"porovnavacka"}
        style={color}
        onChange={(e) => {
          if (e.target.value === word) {
            onChange(true);
          } else {
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

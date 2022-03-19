import React from "react";
import DateTime from "tedious/lib/data-types/datetime";

const renderUser = (Data, deleteUser) => (
  <tr>
    <td>{Data.email}</td>
    <td>{Data.nickname}</td>
    <td>{Data.jmeno}</td>
    <td>{Data.prijmeni}</td>
    <td>{new Date(Data.datum_registrace).toLocaleDateString()}</td>
    {Data.nickname != "admin" && (
      <td>
        <button onClick={deleteUser}>Odstranit</button>
      </td>
    )}
  </tr>
);
const renderSlovicka = (Data, deleteSlovicka) => (
  <tr>
    <td>{Data.ID_slovicka}</td>
    <td>{Data.cesky}</td>
    <td>{Data.preklad}</td>
    {Data.ID_jazyka === 1 ? <td>Anglicky</td> : <td>Německy</td>}
    <td>
      <button onClick={deleteSlovicka}>Odstranit</button>
    </td>
  </tr>
);
const renderStatistika = (Data) => (
  <tr>
    <td>{Data.celkovy_pocet - Data.pocet_uspechu}</td>
    <td>{Data.pocet_uspechu}</td>
    <td>{Data.celkovy_pocet}</td>
    <td>{(Data.pocet_uspechu / Data.celkovy_pocet) * 100}%</td>
    <td>
      {Math.round(
        (new Date(Data.datum_konce).getTime() -
          new Date(Data.datum_zacatku).getTime()) /
          1000
      )}{" "}
      sekund
    </td>
    <td>{new Date(Data.datum_konce).toLocaleString()}</td>
  </tr>
);
const Row = ({ userData, setIsupdate, slovickaData, statistikaData }) => {
  const deleteUser = async () => {
    let url = "/api/uzivatel";
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        email: userData.email,
      }),
    });
    const json = await response.json();
    console.log(json);
    setIsupdate(true);
  };
  const deleteSlovicka = async () => {
    let url = "/api/slovicka";
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ID_slovicka: slovickaData.ID_slovicka,
      }),
    });
    const json = await response.json();
    console.log(json);
    setIsupdate(true);
  };
  let render = null;
  if (userData) render = renderUser(userData, () => deleteUser());
  else if (slovickaData)
    render = renderSlovicka(slovickaData, () => deleteSlovicka());
  else if (statistikaData) render = renderStatistika(statistikaData);
  return render;
};

export default Row;

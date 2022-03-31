import React from "react";
import DateTime from "tedious/lib/data-types/datetime";
import Link from "next/link";

const renderUser = (Data, deleteUser) => (
  <tr>
    <td>{Data.email}</td>
    <td>{Data.nickname}</td>
    <td>{Data.jmeno}</td>
    <td>{Data.prijmeni}</td>
    <td>{new Date(Data.datum_registrace).toLocaleDateString()}</td>
    <td>
      <Link href={"/detail/" + Data.nickname + "/" + Data.ID_uzivatel}>
        <button class="btn btn-success">Detail</button>
      </Link>
    </td>
    {Data.nickname != "admin" ? (
      <td>
        <button class="btn btn-danger" onClick={deleteUser}>
          Odstranit
        </button>
      </td>
    ) : (
      <td></td>
    )}
  </tr>
);
const renderSlovicka = (Data, deleteSlovicka) => (
  <tr>
    <td>{Data.cesky}</td>
    <td>{Data.preklad}</td>
    {Data.ID_jazyka === 1 ? <td>Anglicky</td> : <td>Německy</td>}
    <td>
      <button class="btn btn-sm btn-danger" onClick={deleteSlovicka}>
        Odstranit
      </button>
    </td>
  </tr>
);
const renderStatistika = (Data, volba) => (
  <tr>
    {Data.jazyk === 1 ? <td>Angličtina</td> : <td>Němčina</td>}
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

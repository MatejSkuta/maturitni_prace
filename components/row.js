import React from "react";

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
const Row = ({ userData, setIsupdate, slovickaData }) => {
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
  return userData
    ? renderUser(userData, () => deleteUser())
    : renderSlovicka(slovickaData, () => deleteSlovicka());
};

export default Row;

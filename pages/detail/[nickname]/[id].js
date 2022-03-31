import React from "react";
import UserStatistics from "../../../components/statistics";
import connectionString from "../../api/db";
import knex from "knex";
import router from "next/router";
const UserDetail = ({ stat, nickname }) => {
  return (
    <div>
      <h3>{nickname}</h3>
      {stat && <UserStatistics stat={stat} />}
      <button
        className="btn btn-success ml-1"
        onClick={() => {
          router.back();
        }}
      >
        Zpět na profil
      </button>
    </div>
  );
};

export async function getServerSideProps({ req, query }) {
  const db = knex(connectionString);

  let table = await db("Statistiky")
    .select()
    .where("ID_uzivatel", query.id)
    .orderBy("ID_statistiky", "desc")
    .limit(5);

  const data = table.map((t) => ({
    ID_statistiky: t.ID_statistiky,
    pocet_uspechu: t.pocet_uspechu,
    celkovy_pocet: t.celkovy_pocet,
    datum_zacatku: t.datum_zacatku.toISOString(),
    datum_konce: t.datum_konce.toISOString(),
    ID_uzivatel: t.ID_uzivatel,
  }));

  return {
    props: { stat: data, nickname: query.nickname },
  };
}
export default UserDetail;

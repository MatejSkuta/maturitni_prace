import knex from "knex";
import connectionString from "./db";

async function handler(req, res) {
  const table_name = "Slovicka";

  const select = async () => {
    const db = knex(connectionString);
    let table = await db(table_name).select();
    return table;
  };

  const selectBy = async (key, value) => {
    const db = knex(connectionString);
    let table = await db(table_name).select().where(key, value);
    return table;
  };

  const deleteSlovicko = async (ID_slovicka) => {
    const db = knex(connectionString);
    let table = await db(table_name).where("ID_slovicka", ID_slovicka).del();
    return table;
  };

  const insert = async (obj) => {
    const db = knex(connectionString);
    const table = await db(table_name).insert(obj);
    return table;
  };

  switch (req.method) {
    case "GET": {
      if (req.query.method === "SelectByLanguage") {
        let slovicka = await selectBy("ID_jazyka", req.query.ID_jazyka);
        if (slovicka.length) {
          return res.status(200).json({
            slovicka: slovicka,
          });
        }
        return res.status(200).json({
          slovicka: {},
        });
      }
      return res.status(200).json({ data: await select() });
    }

    case "POST": {
      return res.status(200).json({ status: insert(req.body.user) });
    }
    case "DELETE": {
      const ID_slovicka = JSON.parse(req.body).ID_slovicka;
      deleteSlovicko(ID_slovicka);
      return res.status(200).json({ ID_slovicka: ID_slovicka });
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

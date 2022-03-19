import knex from "knex";
import connectionString from "./db";

async function handler(req, res) {
  const table_name = "Statistiky";

  const select = async () => {
    const db = knex(connectionString);
    let table = await db(table_name).select();
    return table;
  };

  const selectBy = async (key, value) => {
    const db = knex(connectionString);
    let table = await db(table_name)
      .select()
      .where(key, value)
      .orderBy("ID_statistiky", "desc")
      .limit(5);
    return table;
  };

  const insert = async (obj) => {
    const db = knex(connectionString);
    const table = await db(table_name).insert(obj);
    return table;
  };

  switch (req.method) {
    case "GET": {
      if (req.query.method === "vypisUzivateleStatistika") {
        let statistika = await selectBy("ID_uzivatel", req.query.ID_uzivatel);
        if (statistika.length) {
          return res.status(200).json({
            statistika: statistika,
          });
        }
        return res.status(200).json({
          statistika: null,
        });
      }
      return res.status(200).json({ data: await select() });
    }

    case "POST": {
      return res.status(200).json({ status: insert(req.body.user) });
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

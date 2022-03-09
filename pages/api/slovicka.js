import knex from "knex";
import connectionString from "./db";

async function handler(req, res) {
  const table_name = "Slovicka";

  const select = async () => {
    const db = knex(connectionString);
    let table = await db(table_name).select();
    return res.status(200).json({ data: table });
  };

  const insert = async (obj) => {
    const db = knex(connectionString);
    const i = await db(table_name).insert(obj);
    return res.status(200).json({ status: i });
  };

  switch (req.method) {
    case "GET": {
      return select();
    }

    case "POST": {
      return insert();
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

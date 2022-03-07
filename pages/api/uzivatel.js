import knex from "knex";
import connectionString from "./db";

async function handler(req, res) {
  const table_name = "Uzivatel";

  const select = async () => {
    const db = knex(connectionString);
    let table = await db(table_name).select();
    return res.status(200).json({ data: table });
  };

  const selectBy = async (key, value) => {
    const db = knex(connectionString);
    let table = await db(table_name).select().where(key, value);
    return table;
  };

  const insert = async (obj) => {
    const db = knex(connectionString);
    const i = await db(table_name).insert(obj);
    return res.status(200).json({ status: i });
  };

  switch (req.method) {
    case "GET": {
      if (req.query.method === "check") {
        let emailExist = await selectBy("email", req.query.email);
        let nicknameExist = await selectBy("nickname", req.query.nickname);
        return res.status(200).json({
          emailExist: emailExist.length,
          nicknameExist: nicknameExist.length,
        });
      } else if (req.query.method === "signup") {
        let user = await selectBy("email", req.query.email);
        return res.status(200).json({
          user: user.lenght ? user[1] : {},
        });
      }
      return select();
    }

    case "POST": {
      if (req.body.method === "register") {
        return insert(req.body.user);
      } else if (req.body.method === "signup") {
        let user = await selectBy("email", req.body.user.email);
        if (user.length) {
          if (user[0].heslo === req.body.user.heslo)
            return res.status(200).json({
              user: user[0],
            });
        }
        return res.status(200).json({
          user: {},
        });
      }
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

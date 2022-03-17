import knex from "knex";
import connectionString from "./db";
const table_name = "Uzivatel";
const select = async () => {
  const db = knex(connectionString);
  let table = await db(table_name).select();
  console.log(table);
  return table;
};

const deleteUser = async (email) => {
  const db = knex(connectionString);
  let table = await db(table_name).where("email", email).del();
  return table;
};

const selectBy = async (key, value) => {
  const db = knex(connectionString);
  let table = await db(table_name).select().where(key, value);
  return table;
};

const insert = async (obj) => {
  const db = knex(connectionString);
  const i = await db(table_name).insert(obj);
  return i;
};

async function handler(req, res) {
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
        if (user.length) {
          return res.status(200).json({
            user: user[0],
          });
        }
        return res.status(200).json({
          user: {},
        });
      }
      return res.status(200).json({ data: await select() });
    }

    case "POST": {
      if (req.body.method === "register") {
        return res.status(200).json({ status: insert(req.body.user) });
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

    case "DELETE": {
      const email = JSON.parse(req.body).email;
      deleteUser(email);
      return res.status(200).json({ email: email });
    }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

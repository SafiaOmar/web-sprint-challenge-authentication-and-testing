const db = require("../../data/dbConfig");

async function add(user) {
  const [id] = await db("users").insert(user);
  return getById(id);
}

async function getById(id) {
  const rows = await db("users")
    .select("id", "username", "password")
    .where("id", id)
    .first();
  return rows;
}

async function getByUsername(username) {
  const rows = await db("users")
    .select("id", "username", "password")
    .where("username", username)
    .first();
  return rows;
}

async function getAll(id) {
  const rows = await db("users").select("id", "username", "password");
  return rows;
}

module.exports = {
  add,
  getAll,
  getById,
  getByUsername,
};
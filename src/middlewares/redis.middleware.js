const client = require("../db/redis");

const checkCache = async (req, res, next) => {
  const id = (req.params.id ?? "-1").toString();
  const data = await client.get(id);
  if (data) {
    return res.status(200).json(JSON.parse(data));
  }
  next();
};

const deleteCache = async (req, res, next) => {
  const id = (req.params.id ?? "-1").toString();
  await client.del(id);
  next();
};

module.exports = { checkCache, deleteCache };

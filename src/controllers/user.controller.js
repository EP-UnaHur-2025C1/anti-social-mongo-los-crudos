const {userSchema}  = require("../db/models");

const getUsers = async (req, res) => {
  res.status(200).json(await userSchema.find({}));
};

const getUserByNickName = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findOne({nickName: id});
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  try {
    const newUser = await userSchema.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
// VER ESTE METODO _ EN MONGO DUPLICA EL DOCUMENTO
const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findOne({nickName: id});
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  try {
    await userSchema.updateOne(req.body);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const deleteUserByNickName = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findOne({nickName: id});
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  await userSchema.deleteOne({nickName: id});
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUserByNickName,
  createUser,
  updateUser,
  deleteUserByNickName,
};

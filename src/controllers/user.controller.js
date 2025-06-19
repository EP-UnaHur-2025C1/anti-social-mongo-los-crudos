const { User } = require("../db/models");

const getUsers = async (req, res) => {
  res.status(200).json(await User.find({}));
};

const getUserByNickName = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ nickName: id });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ nickName: id });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  try {
    await User.updateOne({ nickName: id }, req.body);
    const updatedUser = await User.findOne({ nickName: id });
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const deleteUserByNickName = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ nickName: id });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  await User.deleteOne({ nickName: id });
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUserByNickName,
  createUser,
  updateUser,
  deleteUserByNickName,
};

const { Post_Images, Post } = require("../db/models");

const getImages = async (req, res) => {
  try {
    const images = await Post_Images.findAll({});
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getImagesByPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({id: id});
    if (!post) {
      return res.status(404).json({ message: "No existe el post" });
    }
    const images = await Post_Images.find({postId: id});
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const createImage = async (req, res) => {
  const { postId, url } = req.body;

  try {
    const post = await Post.findOne({id: postId});
    if (!post) {
      return res.status(404).json({ message: "No existe el post" });
    }
    const newImage = await Post_Images.create({
      postId,
      url,
    });
    res.status(200).json(newImage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "entra en catch" });
  }
};

const deleteImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Post_Images.findOne({id: id});
    if (!image) {
      return res.status(404).json({ message: "No existe la imagen" });
    }
    await image.destroy();
    res.status(200).json({ message: "Imagen eliminada" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { getImages, getImagesByPost, createImage, deleteImageById };

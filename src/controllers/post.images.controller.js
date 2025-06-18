const { postImagesSchema, postSchema } = require("../db/models");

const getImages = async (req, res) => {
  try {
    const images = await postImagesSchema.find({});
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const getImagesByPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postSchema.findOne({_id: id});
    if (!post) {
      return res.status(404).json({ message: "No existe el post" });
    }
    const images = await postImagesSchema.find({postId: id});
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const createImage = async (req, res) => {
  const { postId, url } = req.body;

  try {
    const post = await postSchema.findOne({_id: postId});
    if (!post) {
      return res.status(404).json({ message: "No existe el post" });
    }
    const newImage = await postImagesSchema.create({
      postId,
      url,
    });
    res.status(201).json(newImage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al crear la imagen" });
  }
};

const deleteImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await postImagesSchema.findOne({_id: id});
    if (!image) {
      return res.status(404).json({ message: "No existe la imagen" });
    }
    await postImagesSchema.deleteOne({_id: id});
    res.status(200).json({ message: "Imagen eliminada" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { getImages, getImagesByPost, createImage, deleteImageById };

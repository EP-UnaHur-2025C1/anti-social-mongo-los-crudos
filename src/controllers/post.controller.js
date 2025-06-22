const { Post, Post_Images, Comment } = require("../db/models");
const redisClient = require("../db/redis");
//const { message } = require("../schemas/user.schema");
const getPost = async (req, res) => {
  const posts = await Post.find({}).populate("tags", "nombreEtiqueta");

  const postsWithData = await Promise.all(
    posts.map(async (post) => {
      const comments = await Comment.find({ postIdComment: post._id }).select(
        "id comentario fecha userIdComment"
      );
      const images = await Post_Images.find({ postId: post._id }).select(
        "url userId -_id"
      );
      return {
        ...post.toObject(),
        comments,
        images,
      };
    })
  );
  redisClient.set("posts", JSON.stringify(postsWithData), { EX: 60 });
  res.status(200).json(postsWithData);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { contenido, userId } = req.body;

  try {
    const newPost = await Post.create({
      contenido,
      userId,
      fecha: new Date(),
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  if (!post) {
    return res.status(404).json({ message: "Post no encontrado" });
  }
  try {
    await Post.updateOne({ _id: id }, req.body);
    res.status(200).json(await Post.findOne({ _id: id }));
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  if (!post) {
    return res.status(404).json({ message: "Post no encontrado" });
  }
  await Post.deleteOne({ _id: id });
  res.status(204).send();
};

const createImageByPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post_image = await Post_Images.create({
      ...req.body,
      postId: id,
    });
    res.status(201).json(post_image);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const createCommentByPost = async (req, res) => {
  const { id } = req.params;
  const { comentario, userIdComment } = req.body;

  try {
    const comment = await Comment.create({
      comentario,
      fecha: new Date(),
      postIdComment: id,
      userIdComment,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el comentario", error });
  }
};

const addImage = async function (req, res) {
  const { id } = req.params;
  const { url, userId } = req.body;
  try {
    const newImage = await Post_Images.create({
      url,
      userId: userId,
      postId: id,
    });
    res.status(201).json({
      message: "Imagen añadida correctamente",
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al añadir imagen", error });
  }
};

const deleteImage = async (req, res) => {
  try {
    await Post_Images.deleteOne({ _id: req.params.imageId });
    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen", error });
  }
};

const addTagToPost = async (req, res) => {
  const { id } = req.params;
  const { tagId } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Verificar si el tag ya está en el post
    if (post.tags.includes(tagId)) {
      return res
        .status(400)
        .json({ message: "El tag ya está asociado a este post" });
    }

    // Agregar el tag al array de tags del post
    await Post.findByIdAndUpdate(id, { $push: { tags: tagId } }, { new: true });

    res.status(200).json({ message: "Tag agregado correctamente al post" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al agregar el tag", error });
  }
};

module.exports = {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createImageByPost,
  createCommentByPost,
  addImage,
  deleteImage,
  addTagToPost,
};

import Post from "../models/postModel.js";
import User from "../models/userModels.js";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;

    if (!postedBy || !text) {
      return res.status(400).json({ message: "Please fill the fields" });
    }

    // Find the user by their ID
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if req.user is defined before accessing its _id property
    if (!req.user || user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create a new post
    const newPost = new Post({ postedBy, text });
    await newPost.save();
    res.status(201).json({ message: "post successful", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "post not found" });

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "unauthorized" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export { createPost, getPost, deletePost };

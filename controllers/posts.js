const {User, Post} = require('../models')
const {getNextSequenceValue} = require('../utils/incHelper')

const getAllPosts = async (req, res) => {
	const posts = await Post.find()
	return res.status(200).json(posts)
}

const getPost = async (req, res) => {
	const post = await Post.findById(req.params.postId)
	if (!post) {
		return res.status(400).json({});
	}
	return res.status(200).json(post)
}

const createPost = async (req, res, next) => {
	try {
		const {
			title,
			body,
			userId
		} = req.body
		const data = {
			_id: await getNextSequenceValue("postId"),
			title,
			body,
			userId
		}
		const post = new Post(data);
		await post.save()
		res.status(201).json(post)
	} catch (e) {
		next(e)
	}
}

const updatePost = async (req, res, next) => {
	try {
		const {postId} = req.params;

		const data = {
			title: req.body.title,
			body: req.body.body
		}

		const post = await Post.findByIdAndUpdate(postId, data, {
			new: true
		})
		if (!post) {
			return res.status(400).json({});
		}
		return res.status(200).json(post)
	} catch (e) {
		next(e)
	}
}

const deletePost = async (req, res) => {
	const post = await Post.findById(
		req.params.postId,
	);
	if (post) {
		await post.remove();
	}
	return res.status(200).json(post);
}

module.exports = {
	getAllPosts, getPost, createPost, updatePost, deletePost
}

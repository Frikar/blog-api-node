const {User, Post} = require('../models')
const {getNextSequenceValue} = require('../utils/incHelper')

const getAllUsers = async (req, res) => {
	const users = await User.find()
	return res.status(200).json(users)
}

const getUser = async (req, res) => {
	const user = await User.findById(req.params.userId)
	if (!user) {
		return res.status(400).json({});
	}
	return res.status(200).json(user)
}

const getUserPosts = async (req, res) => {
	const posts = await Post.find({userId: req.params.userId})
	return res.status(200).json(posts)

}

const createUser = async (req, res) => {
	try {
		const {
			name,
			email,
			...body
		} = req.body
		const userDB = await User.findOne({
			name
		});
		if (userDB) {
			return res.status(400).json({
				msg: `El usuario ${userDB.name}, ya existe`
			});
		}
		const data = {
			...body,
			_id: await getNextSequenceValue("userId"),
			name,
			email
		}
		const user = new User(data);
		await user.save()
		res.status(201).json(user)
	} catch (e) {
		throw new Error(e)
	}
}

const updateUser = async (req, res) => {
	try {
		const {userId} = req.params;

		const data = {
			name: req.body.name,
			email: req.body.email
		}

		const user = await User.findByIdAndUpdate(userId, data, {
			new: true
		})
		if (!user) {
			return res.status(400).json({});
		}
		return res.status(200).json(user)
	} catch (e) {
		throw new Error(e)
	}
}

const deleteUser = async (req, res) => {
	const user = await User.findById(
		req.params.userId,
	);
	if (user) {
		await user.remove();
	}
	return res.status(200).json(user);
}

module.exports = {
	getAllUsers, getUser, getUserPosts, createUser, updateUser, deleteUser
}

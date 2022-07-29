const {Router} = require('express');

const {
	getAllUsers,
	getUser,
	getUserPosts,
	createUser,
	updateUser,
	deleteUser
} = require('../controllers/users')

const router = Router()

router.get('/', getAllUsers)

router.get('/:userId', getUser)

router.get('/:userId/posts', getUserPosts)

router.post('/', createUser)

router.patch('/:userId', updateUser)

router.delete('/:userId', deleteUser)

module.exports = router;

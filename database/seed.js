const {Counters, User, Post} = require("../models");
const {getNextSequenceValue} = require("../utils/incHelper");

/**
 * @description      Metodo para añadir data de prueba a la BD
 */
const createUsersWithPost = async () => {
	const counterUser = new Counters({
		_id: "userId",
		sequence_value: 0
	})
	const counterPost = new Counters({
		_id: "postId",
		sequence_value: 0
	})

	await counterUser.save()
	await counterPost.save()

	const user1 = new User({
		_id: await getNextSequenceValue("userId"),
		name: 'Diego Vasquez',
		email: 'diego@test.com'
	});

	await user1.save()

	const user2 = new User({
		_id: await getNextSequenceValue("userId"),
		name: 'Diego Antonio',
		email: 'diego2@test.com'
	});

	await user2.save()

	const post1 = new Post({
		_id: await getNextSequenceValue("postId"),
		title: "Titulo de prueba 1",
		body: "Probando cotenido de pruebas, este es un contenido de pruebas",
		userId: user1._id
	})
	const post2 = new Post({
		_id: await getNextSequenceValue("postId"),
		title: "Titulo de prueba 2",
		body: "Probando cotenido de pruebas, este es un contenido de pruebas, probando probando",
		userId: user1._id
	})
	const post3 = new Post({
		_id: await getNextSequenceValue("postId"),
		title: "Titulo de prueba 3 otro usuarios",
		body: "Probando cotenido de pruebas, este es un contenido de pruebas, probando probando. Usuario 2" ,
		userId: user2._id
	})
	const post4 = new Post({
		_id: await getNextSequenceValue("postId"),
		title: "Titulo de prueba 4 otro usuarios",
		body: "Probando contenido de pruebas, este es un contenido de pruebas, probando probando. Usuario 2" ,
		userId: user2._id
	})

	await post1.save()
	await post2.save()
	await post3.save()
	await post4.save()
}

module.exports = {
	createUsersWithPost
}

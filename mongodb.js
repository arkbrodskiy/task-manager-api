// CRUD operations with MongoDB

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database')
	}

	const db = client.db(databaseName)

	// Create

	// db.collection('users').insertOne({
	// 	name: 'Vika',
	// 	isLearning: true
	// }, (error, result) => {
	// 	if (error) {
	// 		return console.log('Unable to insert user')
	// 	}

	// 	console.log(result.ops)
	// })

	/* db.collection('tasks').insertMany([
		{
			description: 'Get awesome family',
			completed: true
		},
		{
			description: 'Become happy',
			completed: true
		},
		{
			description: 'Become millionaire',
			completed: false
		}
	], ( error, result ) => {
		if (error) {
			return console.log('Unable to insert documents')
		}
		console.log(result.ops)
	}) */

	// Read

	/* db.collection('users').findOne({ name: 'Marusya' }, (error, user) => {
		if (error) {
			return console.log('Unable to fetch user')
		}

		console.log(user)
	}) */

	/* db.collection('users').find({ isLearning: true}).toArray((error, users) => {
		console.log(users)
	}) */

	// Update

	/* const updatePromise = db.collection('users').updateOne({
		_id: ObjectID('5edaf0851c1a2d217c099119')
	}, {
		$set: {
			isLearning: false,
			hasTail: true
		}
	})

	updatePromise.then((result) => {
		console.log(result)
	}).catch((error) => {
		console.log(error)
	}) */

	/* db.collection('users').updateOne({
		name: "Vika"
	}, {
		$set: {
			hasTail: false
		}
	}).then((result) => {
		console.log(result.result)
	}).catch((error) => {
		console.log(error)
	}) */

	/* db.collection('users').updateMany({
		isLearning: true
	}, {
		$set: {
			hasTail: false
		}
	}).then((result) => {
		console.log(result.result)
	}).catch((error) => {
		console.log(error)
	}) */

	// Delete

	/* db.collection('users').deleteMany({
		name: "G"
	}).then((result) => {
		console.log(result.result)
	}).catch((error) => {
		console.log(error)
	}) */

})
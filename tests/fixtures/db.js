const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
	_id: userOneId,
	name: 'Mike',
	email: 'q@q.com',
	password: 'pass543',
	tokens: [{
		token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
	}]
}

const userTwoId = new mongoose.Types.ObjectId()

const userTwo = {
	_id: userTwoId,
	name: 'Jen',
	email: 'g@g.com',
	password: 'pass123',
	tokens: [{
		token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
	}]
}

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'First task - to fast',
	completed: false,
	owner: userOneId
}

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Second task - to pray more',
	completed: true,
	owner: userOneId
}

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Third task - to read the Bible',
	completed: false,
	owner: userTwoId
}

const setupDatabase = async () => {
	await User.deleteMany()
	await Task.deleteMany()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new Task(taskOne).save()
	await new Task(taskTwo).save()
	await new Task(taskThree).save()
}

module.exports = {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase
}
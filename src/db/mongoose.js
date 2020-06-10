const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

/* const user = new User({
	name: '    Vasya   ',
	email: "                      a@c.com  ",
	password: '   sdfrg.kljhassword777tyur     '
})

user.save().then((result) => {
	console.log('User saved: ', user)
}).catch((error) => {
	console.log('Error: ', error)
}) */

/* const task = new Task({
	description: "   Open the bottle    ",
})

task.save().then(() => {
	console.log('Task saved: ', task)
}).catch((error) => {
	console.log('Error: ', error)
}) */
const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
	sgmail.send({
		to: email,
		from: 'arkbrod@gmail.com',
		subject: `Welcome to the Task App, ${name}!`,
		text: `Hi ${name}, We are honored to welcome you on board of our wonderful app!`
	})
}

const sendCancelEmail = (email, name) => {
	sgmail.send({
		to: email,
		from: 'arkbrod@gmail.com',
		subject: `Good riddance, ${name}!`,
		text: `Hi ${name}, We are honored to see you go from our wonderful app!`
	})
}

module.exports = {
	sendWelcomeEmail,
	sendCancelEmail
}
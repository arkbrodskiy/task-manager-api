const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
const router = new express.Router()




router.post('/users', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		sendWelcomeEmail(user.email, user.name)
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		res.status(400).send(error.message)
	}
})

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (error) {
		res.status(400).send()
	}

})

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token
		})
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send()
	}
})

router.post('/users/logout-all', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send()
	}
})

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidSetOfUpdates = updates.every((update) => {
		return allowedUpdates.includes(update)
	})
	if (!isValidSetOfUpdates) {
		returnres.status(400).send('Error: Invalid updates!')
	}
	try {
		const user = req.user
		updates.forEach(( update) => {
			user[update] = req.body[update]
		})
		await user.save()
		res.send(user)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.delete('/users/me', auth, async (req, res) => {
	try {
		sendCancelEmail(req.user.email, req.user.name)
		await req.user.remove()
		res.send(req.user)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload a .jpg, .jpeg or .png document'))
		}
		cb(undefined, true)
	}
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
	req.user.avatar = buffer
	await req.user.save()
	res.send()
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user || !user.avatar) {
			throw new Error
		}
		res.set('Content-type', 'image/png')
		res.send(user.avatar)
	} catch (error) {
		res.status(404).send()
	}
})

router.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined
	await req.user.save()
	res.send()
})

module.exports = router
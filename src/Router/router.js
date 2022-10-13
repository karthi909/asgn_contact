const express = require('express')
const router = express.Router()

const controller = require('../Controller/contactController')
const signin = require('../auth/auth')
const autz = require('../Middleware/authoriz')


router.post('/createContact', controller.createContact)

router.patch('/updateContact/:contactId', autz.autz, controller.updateContact)

router.delete('/deleteContact/:contactId', autz.autz, controller.deleteContact)

router.post('/postBulk', controller.postBulk)

router.get('/getContact', autz.autz, controller.getContact)

router.get('/oneContact/:contactId', autz.autz, controller.getSingleContact)

router.post('/signIn', signin.login)

module.exports = router
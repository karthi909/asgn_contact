const express = require('express')
const router = express.Router()

const controller = require('../Controller/contactController')

router.post('/createContact', controller.createContact)

router.patch('/updateContact/:contactId', controller.updateContact)

router.delete('/deleteContact/:contactId', controller.deleteContact)

router.post('/postBulk', controller.postBulk)

module.exports = router
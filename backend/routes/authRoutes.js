import express from 'express'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)
router.route('/verifyuser').get(authController.verifyUser)

export default router;
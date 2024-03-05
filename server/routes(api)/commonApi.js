import express from 'express'
import { showAllPosts } from '../controllers/commonLogic.js'
const router  = express.Router()

router.get('/all-posts', showAllPosts)

export default router
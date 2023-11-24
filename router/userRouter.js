const express=require('express')
const router=express.Router()
const {Singup, Login}=require('../controllers/userController')
const { AddBlog, AddblogDescription, Getblog, prevesBlog, GetHomepage, GetAllblogs, AddRating, Israted } = require('../controllers/blogController')
const {verfyToken} = require('../middlewere/auth')
const upload=require('../config/multer').createMulter()
router.post('/signup',upload.any(),Singup)
router.post('/login',upload.any(),Login)
router.get('/',GetHomepage)
router.route('/addblog').post(upload.single('image'),AddBlog).patch(upload.single("image"),AddblogDescription)
router.get('/addblogs/:id',verfyToken,Getblog)
router.get('/previesblog',prevesBlog)
router.get('/blogs/:page',GetAllblogs)
router.post('/blog/addrating/:id/:rate',verfyToken,AddRating)
router.get('/blog/israted/:id',verfyToken,Israted)

module.exports=router
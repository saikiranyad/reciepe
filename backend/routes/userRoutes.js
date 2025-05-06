const express = require('express');
const { register, login, logout, getuser,userwithid,userrecipes,deleteuser, savedrecipe,fetchusersavedreciepes,followingandunfollowingusers,onlyfollowingposts,suggestionusers,collabarators,removecollaborators, getuserdata, updateuser } = require('../controller/userController');
const { authmiddleware } = require('../middlewares/authMiddleware');
const multer = require('../middlewares/multer');




const userrouter = express.Router();

userrouter.post('/sign',multer.none(),register);
userrouter.post('/login',multer.none(),login);
userrouter.post('/logout',authmiddleware,logout);
userrouter.get('/getuser',authmiddleware,getuser);
userrouter.get('/profile/:id',authmiddleware,userwithid)
userrouter.put('/updateuser',authmiddleware ,multer.single('avatar'), updateuser);
userrouter.delete('/delete',authmiddleware,deleteuser)
userrouter.get('/recipes',authmiddleware,userrecipes)
userrouter.post('/savedrecipe',authmiddleware,savedrecipe)
userrouter.get('/fetchsaverecieps',authmiddleware,fetchusersavedreciepes)
userrouter.post('/followandunfollow',authmiddleware,followingandunfollowingusers)
userrouter.get('/followingreciepes',authmiddleware,onlyfollowingposts)
userrouter.get('/suggest',authmiddleware,suggestionusers);
userrouter.get('/getuserdata',authmiddleware,getuserdata)




module.exports = userrouter;
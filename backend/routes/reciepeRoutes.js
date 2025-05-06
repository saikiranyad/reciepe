const express = require('express');
const { addrecipe, getallrecipes, getrecipesbyid, updaterecipe, deleterecipe,howmanymemberssavedrecipes,likereciepe,commentonrecipe,commentreply,replytoreply,collabarators,removecollaborators,getuserreciepes } = require('../controller/reciepeController');
const { authmiddleware } = require('../middlewares/authMiddleware');
const multer = require('../middlewares/multer');



const recieperouter = express.Router();


recieperouter.post('/add',authmiddleware,multer.array('images',5),addrecipe);
recieperouter.get('/getreciepes',authmiddleware,getuserreciepes)
recieperouter.get('/getallreciepes',getallrecipes);
recieperouter.get('/:id',authmiddleware,getrecipesbyid);
recieperouter.put('/:id',authmiddleware,multer.array('images',5),updaterecipe);


recieperouter.delete('/:id',authmiddleware,deleterecipe);
recieperouter.get("/howmanysavedrecipes/:id",authmiddleware,howmanymemberssavedrecipes);

recieperouter.put("/:id/like",authmiddleware,likereciepe)
recieperouter.post("/:id/comment",authmiddleware,commentonrecipe)
recieperouter.post('/:id/comment/reply',authmiddleware,commentreply)
recieperouter.post('/:id/comment/reply/counterreply', authmiddleware, replytoreply);
recieperouter.post('/:id/addcollab',authmiddleware,collabarators);
recieperouter.delete('/:id/deletecollab',authmiddleware,removecollaborators)


module.exports = recieperouter;
const express = require("express");
const { getcollection,createname,addreciepetocollection,removecollection, deletcollection } = require("../controller/savedController");
const { authmiddleware } = require("../middlewares/authMiddleware");

const savedrouter = express.Router();

savedrouter.post('/createcollection',authmiddleware,createname);
savedrouter.get('/getcollection',authmiddleware,getcollection);
savedrouter.post('/:id/addtocollection',authmiddleware,addreciepetocollection);
savedrouter.delete('/:id/removereciepe',authmiddleware,removecollection);
savedrouter.delete('/:id',authmiddleware,deletcollection)

module.exports = savedrouter
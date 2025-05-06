const savedCollection = require("../models/savedCollectionmodel");


const createname = async(req,res)=>{
    try{
        const {name} = req.body;
        const userId = req.user.id;
        const newcollection = await savedCollection.create({userId,name,reciepes:[]}) 
        return res.status(201).json({success:true,newcollection})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal server error in create name"})
    }
}

const getcollection = async(req,res)=>{
    try{
        const userId = req.user.id
        console.log(userId)
        const collections = await savedCollection.find({userId}).populate('reciepeData')
        console.log(collections)
        return res.status(201).json({success:true,message:"all_collections",collections})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal server error in get collection"})
    }
}


const addreciepetocollection = async(req,res)=>{
    try{
        const {reciepeId} = req.body
        const collectionId = req.params.id
        const userId = req.user.id
        const savedincollection  = await savedCollection.findByIdAndUpdate(
            {_id:collectionId,user:userId},
            {$addToSet:{reciepeData:reciepeId}},
            {new:true}
        ).populate('reciepeData')
        console.log(savedincollection)
        return res.status(201).json({success:true,savedcollectiondata:savedincollection})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal server error in add reciepe to collection"})
    }
}
const removecollection = async (req, res) => {
    try {
        const { reciepeId } = req.body;
        const collectionId = req.params.id;
        const userId = req.user.id;

        // Check for missing input
        if (!reciepeId || !collectionId) {
            return res.status(400).json({ success: false, message: "Missing recipe ID or collection ID" });
        }

        // Find the collection and validate ownership
        const collection = await savedCollection.findOne({ _id: collectionId, userId });
        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection not found or not owned by user" });
        }

        // Check if recipe is in collection
        if (!collection.reciepeData.includes(reciepeId)) {
            return res.status(400).json({ success: false, message: "Recipe not found in the collection" });
        }

        // Remove the recipe
        const updatecollections = await savedCollection.findByIdAndUpdate(
            collectionId,
            { $pull: { reciepeData: reciepeId } },
            { new: true }
        ).populate('reciepeData');

        return res.status(200).json({ success: true, message: 'Recipe removed from collection', updatecollections });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal server error in remove collection" });
    }
};

const deletcollection = async(req,res)=>{
    try{
        const collectionId = req.params.id;
        const userId = req.user.id
        const collection = await savedCollection.findOne({_id:collectionId,userId})
        if(!collection){
            return res.status(404).json({success:false,message:"collection not found"})
        }
        
        const deletecollectionofuser = await savedCollection.findByIdAndDelete(collectionId);
        return res.status(201).json({success:true,message:"collection deleted",deletecollectionofuser})


    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"internal server error in delete collection"})
    }
}


module.exports = {getcollection,createname,addreciepetocollection,removecollection,deletcollection}
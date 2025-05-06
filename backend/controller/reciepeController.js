const { sendnotification } = require('../helpers/Notificationhelper.js');
const findreplybyid = require('../helpers/replieshelper.js');
const { uploadtocloudinary } = require('../helpers/uploadCloudinary.js');
const Reciepe = require('../models/Reciepemodel');
const User = require('../models/userModel.js');




const addrecipe = async (req, res) => {
    try {
      const { title, description, ingreidients, collabortors, steps } = req.body;
  
      // Handle images
      const image_result = [];
      for (const file of req.files || []) {
        const result = await uploadtocloudinary(file.path);
        image_result.push(result);
      }
  
      // Handle collaborators input
      const collaboratorNames = typeof collabortors === 'string'
        ? collabortors.split(',').map(name => name.trim())
        : Array.isArray(collabortors)
          ? collabortors.map(name => name.trim())
          : [];
  
      const collaboratorIds = [];
      for (const name of collaboratorNames) {
        const user = await User.findOne({ name: name });
        if (user) {
          collaboratorIds.push(user._id);
        } else {
          return res.status(404).json({ success: false, message: `User with name ${name} not found.` });
        }
      }
  
      // Create and save recipe
      const newrecipe = new Reciepe({
        userId: req.user.id,
        owner: req.user.id,
        title,
        description,
        ingreidients,
        images: image_result,
        collabortors: collaboratorIds,
        steps, // Include steps here
      });
  
      await newrecipe.save();
  
      // Update user recipes
      const user = await User.findById(req.user.id);
      user.reciepes.push(newrecipe._id);
      await user.save();
  
      // Notify followers
      for (const followerId of user.followers) {
        await sendnotification(followerId, req.user.id, "newreciepe", newrecipe._id);
      }
  
      // Populate collaborators
      await newrecipe.populate('collabortors', 'name avatar');
  
      return res.status(201).json({
        success: true,
        message: "Recipe added successfully",
        newrecipe,
      });
    } catch (err) {
      console.error("Error in addrecipe:", err);
      return res.status(500).json({ success: false, message: 'Internal server error in add recipe API' });
    }
  };
  

const getuserreciepes = async(req,res)=>{
    try{
        // const userId = req.user.id
        // const recieps = await Reciepe.find({userId:{$in}}).populate('reciepes')
        // console.log(recieps)

        // return res.status(201).json({success:true,recieps})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"internal server error in getuserreciepes"})
    }
}



// const updaterecipe = async (req, res) => {
//     try {
//         const { title, description, ingreidients,collabortors } = req.body;
//         const receipeid = req.params.id
//         const recipe = await Reciepe.findById(receipeid);


//         if (recipe.userId.toString() !== req.user.id) {
//             return res.status(409).json({ success: true, message: "user is not matched please it is unauthorized only authorized owner will allowed to update thid reciepe post" })
//         }
//         if (title) recipe.title = title;
//         if (description) recipe.description = description;
//         if (ingreidients) recipe.ingreidients = ingreidients;
//         if (collabortors) recipe.collabortors = collabortors
//         if (req.files && req.files.length > 0) {
//             const image_result = [];
//             for (const file of req.files) {
//                 const results = await uploadtocloudinary(file.path)
//                 image_result.push(results)
//             }
//             recipe.images = image_result;
//         }
//         await recipe.save()
//         return res.status(201).json({ success: true, message: "recipe updated successfully", recipe })

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false, message: 'internal server error in update reciepe api' })
//     }
// }



const updaterecipe = async (req, res) => {
    try {
      const { title, description, ingreidients, collabortors, steps } = req.body;
      const receipeid = req.params.id;
      const recipe = await Reciepe.findById(receipeid);
  
      if (recipe.userId.toString() !== req.user.id) {
        return res.status(409).json({
          success: true,
          message: "user is not matched please it is unauthorized only authorized owner will allowed to update this reciepe post"
        });
      }
  
      if (title) recipe.title = title;
      if (description) recipe.description = description;
      if (ingreidients) recipe.ingreidients = ingreidients;
      if (collabortors) recipe.collabortors = collabortors;
      if (steps) recipe.steps = Array.isArray(steps) ? steps : [steps];
  
      if (req.files && req.files.length > 0) {
        const image_result = [];
        for (const file of req.files) {
          const results = await uploadtocloudinary(file.path);
          image_result.push(results);
        }
        recipe.images = image_result;
      }
  
      await recipe.save();
      return res.status(201).json({ success: true, message: "recipe updated successfully", recipe });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'internal server error in update reciepe api' });
    }
  };
const deleterecipe = async (req, res) => {
    try {
        const recipeid = req.params.id
        const recipe = await Reciepe.findById(recipeid);
        if (!recipe) {
            return res.status(401).json({ success: false, message: "recipe  is not there please check it" })
        }
        if (recipe.userId.toString() !== req.user.id) {
            return res.status(409).json({ success: false, message: "unathorized user not used to deleted it" })
        }
        const recipedelete = await Reciepe.findByIdAndDelete(recipeid)
        // main and important
        await User.findByIdAndUpdate(req.user.id, { $pull: { reciepes: recipeid } }, { new: true })
        return res.status(201).json({ success: true, message: "recipe deleted successfully", recipedelete })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'internal server error in delete reciepe api' })
    }
}




const getallrecipes = async (req, res) => {
    try {
        const recipes = await Reciepe.find({}).populate('userId','name avatar')
        if (!recipes) {
            return res.status(409).json({ success: false, message: "recipes are not there" })
        }
        return res.status(201).json({ success: true, recipes })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'internal server error in get all recipes api' })
    }
}

const getrecipesbyid = async (req, res) => {
    try {
      const recipeId = req.params.id;
  
      // Fetch the recipe by ID and populate the comments and their replies, including the user details
      const recipe = await Reciepe.findById(recipeId)
      .populate('userId')
        .populate({
          path: 'comments',
          populate: {
            path: 'userId',  // Populate the user details for the comment author
            select: 'name avatar'  // Select only the required fields (name and avatar)
          }
        })
        .populate({
          path: 'comments.replies',  // Populate replies for each comment
          populate: {
            path: 'userId',  // Populate the user details for the reply author
            select: 'name avatar'  // Select only the required fields (name and avatar)
          }
        });
  
      // Check if recipe exists
      if (!recipe) {
        return res.status(404).json({ success: false, message: "Recipe not found" });
      }
  
      // Return the populated recipe
      return res.status(200).json({ success: true, recipe });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error in get recipe by id API' });
    }
  };

  const howmanymemberssavedrecipes = async (req, res) => {
    try {
        const recipeId = req.params.id;
        console.log(recipeId, 126);

        if (!recipeId) {
            return res.status(400).json({ success: false, message: "Recipe ID is required" });
        }

        const users = await User.find({ savedReciepes: recipeId })
            .select("name avatar _id"); // select only necessary fields

        const count = users.length;

        res.status(200).json({
            success: true,
            recipeId,
            savedbyusercount: count,
            users, // Include this array from MongoDB
          });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in howmanymemberssavedrecipes"
        });
    }
};

const likereciepe = async (req, res) => {
    try {
        const userId = req.user.id;
        const receipeid = req.params.id
        const reciepe = await Reciepe.findById(receipeid);
        if(!reciepe){
            return res.status(404).json({success:false,message:"reciepe is not found"})
        }
        const user = await User.findById(userId)
        const likethereciepe = user.likedreciepe.some(id=>id.toString() === receipeid)
        if(likethereciepe){
            reciepe.likes-=1;
            user.likedreciepe?.pull(receipeid)
        }else{
            reciepe.likes+=1;
            user.likedreciepe?.push(receipeid)
        }
        if(reciepe.userId.toString()!==userId){
            await sendnotification(reciepe.userId,userId,"like",reciepe._id)
        }  
        await reciepe.save();
        await user.save();

        return res.status(200).json({
            success: true,
            message: likethereciepe ? "Recipe unliked" : "Recipe liked",
            likes: reciepe.likes
        });
      

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error in like reciepe" })
    }
}
const commentonrecipe = async (req, res) => {
    try {
        const reciepeid = req.params.id
        const {commenttext} = req.body
        console.log(req.body)
        const userId = req.user.id
        const reciepe = await Reciepe.findById(reciepeid);
        if(!reciepe){
            return res.status(404).json({success:false,message:"recipe not exists"})
        }
        const comments = {
            userId,
            text:commenttext,
            createdAt:Date.now()
        }
         reciepe.comments.push(comments)
         console.log(reciepe.comments)
         await reciepe.save();

         if(reciepe.userId.toString()!==userId){
            await sendnotification(reciepe.userId,userId,"comment",reciepe._id)
         }
         return res.status(201).json({success:true,message:"comment added successfully",newcomment:reciepe.comments})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error in commentonreciepe" })
    }
}


const commentreply  = async(req,res)=>{
    try{
        const reciepeId = req.params.id;
        const userId = req.user.id;
        const {commentId,replytext} = req.body;
       

        const reciepe = await Reciepe.findById(reciepeId);
        if(!reciepeId){
            return res.status(404).json({success:false,message:"reciepe not found"})
        }
        const comment = reciepe.comments.id(commentId); //find regular find id to find comment id
        
        if(!comment){
            return res.status(404).json({success:false,message:"comment not found"})
        }
        const reply = {
            userId,
            text:replytext,
            createdAt:Date.now()
        }
        comment.replies.push(reply);
        await reciepe.save();
        if(reciepe.userId.toString()!==userId){
            await sendnotification(comment.userId,userId,"reply",reciepeId)
        }
        return res.status(201).json({success:true,message:"you got reply",comment})
        console.log(comment)
    }
   
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal Server Error in comment reply"})
    }
}

const replytoreply = async(req,res)=>{
    try{
        const reciepeId = req.params.id;
        const userId = req.user.id;

        const {commentId,replyId,replytext} = req.body
        console.log(req.body)
        const reciepe = await Reciepe.findById(reciepeId);
        if(!reciepe){
            return res.status(404).json({success:false,message:"reciepe not found"})
        }
        const comment = reciepe.comments.id(commentId);
        if(!comment){
            return res.status(404).json({success:false,message:"comment not found"})
        }
        const targetreply = findreplybyid(comment.replies,replyId)
        if(!targetreply){
            return res.status(404).json({success:false,message:"reply not found"})
        }

        const newreply = {
            userId,
            text:replytext,
            createdAt:Date.now(),
            replies:[]
        }
        targetreply.replies.push(newreply);
        await reciepe.save();
        return res.status(201).json({success:true,message:"reply added to reply",updatedcomment:comment})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal server error in replytoreply api"})
    }
}


const collabarators = async (req, res) => {
    try {
        const userId = req.user.id;
        const { collaboratorId } = req.body;
        const reciepeId = req.params.id;

        // Prevent adding self as collaborator
        if (userId === collaboratorId) {
            return res.status(400).json({ success: false, message: "You can't collaborate with yourself" });
        }

        const reciepe = await Reciepe.findById(reciepeId);
        if (!reciepe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        // Ensure recipe has owner
        if (!reciepe.owner) {
            return res.status(400).json({ success: false, message: "Recipe has no owner set" });
        }

        // Ensure only owner can add collaborators
        if (reciepe.owner.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Only the owner can add collaborators" });
        }

        // Validate user to add
        const collaborator = await User.findById(collaboratorId);
        if (!collaborator) {
            return res.status(404).json({ success: false, message: "Collaborator user not found" });
        }

        // Check if already a collaborator
        const isCollaborator = reciepe.collabortors.some(id => id.toString() === collaboratorId);
        if (isCollaborator) {
            return res.status(400).json({ success: false, message: "User is already a collaborator" });
        }

        // Add collaborator
        reciepe.collabortors.push(collaboratorId);
        await reciepe.save();

        return res.status(201).json({
            success: true,
            message: "Collaborator added successfully",
            reciepe
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in collaborators"
        });
    }
};


const removecollaborators = async (req, res) => {
    try {
        const userId = req.user.id;
        const { collaboratorId } = req.body;
        const receipeid = req.params.id;

        const reciepe = await Reciepe.findById(receipeid);
        if (!reciepe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        if (reciepe.owner.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Only the owner can remove collaborators" });
        }

        const isCollaborator = reciepe.collabortors.some(id => id.toString() === collaboratorId);
        console.log(isCollaborator)

        if (!isCollaborator) {
            return res.status(400).json({ success: false, message: "Collaborator not found in this recipe" });
        }

        reciepe.collabortors.pull(collaboratorId);
        await reciepe.save();

        return res.status(200).json({ success: true, message: "Collaborator removed successfully", reciepe });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error in remove collaborator" });
    }
};








module.exports = { addrecipe, updaterecipe, deleterecipe, getrecipesbyid, getallrecipes, howmanymemberssavedrecipes, likereciepe, commentonrecipe,commentreply,replytoreply,collabarators,removecollaborators,getuserreciepes }